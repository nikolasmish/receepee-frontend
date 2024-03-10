import imageCompression from "browser-image-compression";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export async function compressImageAndConvertToBase64(
  imageFile: File | null,
): Promise<string> {
  if (!imageFile) return "";

  const options = {
    maxSizeMB: 0.05,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    const imageBase64 = await toBase64(compressedFile);
    return imageBase64;
  } catch (error) {
    console.log(error);
    return "";
  }
}
