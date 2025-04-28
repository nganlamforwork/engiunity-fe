export const stringToBase64 = (str: string) => {
  // Chuyển string thành ArrayBuffer
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str); // Trả về một Uint8Array

  let binary = "";
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary); // Mã hóa thành base64
};
