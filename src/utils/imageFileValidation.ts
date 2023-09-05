export default function imageFileValidation(filePath: string) {
  // Allowing file type
  const allowedExtensions =
    /(\.jpg|\.jpeg|\.png|\.gif|\.ico|\.webp|\.JPG|\.JPEG|\.PNG|\.GIF)$/i;
  return allowedExtensions.exec(filePath);
}
