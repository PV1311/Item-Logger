// src/services/apiItems.js
import supabase from "./supabase";
import { deleteImageByUrl } from "./uploadImage";

// Helper to upload a single image and return the public URL
export async function uploadImageToBucket({ imageName, coverImageFile, id }) {
  const { error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, coverImageFile);

  if (storageError) {
    await supabase.from("images").delete().eq("id", id);

    console.error(storageError);
    throw new Error(
      "Item image could not be uploaded and the item was not created"
    );
  }
}

// Create item in 'items' table with image upload
export async function createItem({
  name,
  type,
  description,
  coverImage,
  imageName,
  coverImageFile,
}) {
  const { data, error } = await supabase
    .from("items")
    .insert([{ name, type, description, coverImage }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Item could not be created");
  }

  const itemId = data.id;

  const res = await uploadImageToBucket({
    imageName,
    coverImageFile,
    id: itemId,
  });

  return { res, itemId };
}

// Add additional item images (optional)
export async function addItemImages(imageUrls, itemId) {
  const imageRecords = imageUrls.map((url) => ({
    item_id: itemId,
    imageUrl: url,
  }));

  const { error } = await supabase.from("item_images").insert(imageRecords);
  if (error) throw new Error("Failed to insert item images");
}

// Fetch all items
export async function getItems() {
  const { data, error } = await supabase.from("items").select("*");
  if (error) throw new Error("Items could not be loaded");
  return data;
}

// Fetch images for a specific item
export async function getItemImages(itemId) {
  const { data, error } = await supabase
    .from("item_images")
    .select("*")
    .eq("item_id", itemId);
  if (error) throw new Error("Images could not be loaded");
  return data;
}

export async function deleteItemAndImages(itemId) {
  console.log("deleteItemAndImages called", itemId);

  // 1. Get the item (for cover image URL)
  const { data: item, error: itemError } = await supabase
    .from("items")
    .select("*")
    .eq("id", itemId)
    .single();

  console.log(item);

  if (itemError) {
    console.error(itemError);
    throw new Error("Could not find item");
  }

  // 2. Get all item_images for this item
  const { data: images, error: imagesError } = await supabase
    .from("item_images")
    .select("*")
    .eq("item_id", itemId);

  console.log(images);

  if (imagesError) {
    console.error("imagesError", imagesError);
    throw new Error("Could not find item images");
  }

  // 3. Delete from items table
  const { error: delItemError } = await supabase
    .from("items")
    .delete()
    .eq("id", itemId);

  if (delItemError) {
    console.error("❌ Failed to delete item from DB:", delItemError);
    throw new Error("Could not delete item");
  }

  // 4. Delete images from storage
  if (item.coverImage) {
    try {
      await deleteImageByUrl(item.coverImage);
    } catch (e) {
      console.error("Error deleting cover image from storage", e);
    }
  }
  for (const img of images) {
    if (img.imageUrl) {
      try {
        await deleteImageByUrl(img.imageUrl);
      } catch (e) {
        console.error("Error deleting gallery image from storage", e);
      }
    }
  }
}
