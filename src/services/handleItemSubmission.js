import { supabaseUrl } from "./supabase";
import { createItem, addItemImages } from "./apiItems";
import { uploadImage } from "./uploadImage";

export async function handleItemSubmission(data) {
  console.log(data);
  // 1. Handle cover image upload
  const coverImageFile = data.coverImage;
  console.log(coverImageFile);
  console.log(data.itemImages);

  const imageName = `${Math.random()}-${coverImageFile.name}`.replaceAll(
    "/",
    ""
  );

  console.log(imageName);

  const imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  console.log(imagePath);

  // 2. Create item in `items` table
  const { itemId: newItemId } = await createItem({
    name: data.name,
    type: data.type,
    description: data.description,
    coverImage: imagePath,
    imageName: imageName,
    coverImageFile: coverImageFile,
  });

  // 3. Upload and store item images
  const galleryImages = data.itemImages;
  if (galleryImages && galleryImages.length > 0) {
    const imageUrls = await Promise.all(
      [...galleryImages].map((file) => uploadImage(file))
    );
    console.log(imageUrls);
    await addItemImages(imageUrls, newItemId);
  }

  return newItemId;
}
