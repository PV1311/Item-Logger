import supabase, { supabaseUrl } from "./supabase";

// Upload single image and return public URL
export async function uploadImage(file) {
  const fileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) throw new Error("Image upload failed");
  return `${supabaseUrl}/storage/v1/object/public/images/${fileName}`;
}

// Optional: delete image by URL
export async function deleteImageByUrl(url) {
  const fileName = url.split("/").pop();
  const { error } = await supabase.storage.from("images").remove([fileName]);
  if (error) throw new Error("Failed to delete old image");
}
