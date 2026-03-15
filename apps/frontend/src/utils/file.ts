export function extractFilename(url?: string | null) {
  // Use URL to extract the pathname and split it
  const parts = url?.split('/');
  return parts?.pop()?.split('?')[0]; // Get the last part and remove query parameters
}
export const extractGsFileName = (gspath: string) => extractFilename(gspath.split('/').pop())?.split('|SPLIT|')[1];
export const extractFileNameFromGCSUrl = (url: string) => {
  try {
    // ตัด query string ออก
    const urlWithoutQuery = url.split('?')[0];

    // ถอดรหัส URL (2 ครั้ง)
    const decodedOnce = decodeURIComponent(urlWithoutQuery);
    const decodedTwice = decodeURIComponent(decodedOnce);

    // ดึงเฉพาะชื่อไฟล์
    return decodedTwice.split('/').pop()?.split('|SPLIT|')[1];
  } catch (error) {
    console.error('Error decoding URL:', error);
    return null;
  }
};

export function convertUrlToGsPath(url: string): string {
  try {
    const urlObj = new URL(url);

    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    if (pathParts.length < 2) {
      throw new Error('Invalid URL path structure');
    }

    const bucket = pathParts[0];
    const filePath = pathParts.slice(1).join('/');

    // const decodedPath = decodeURIComponent(filePath);

    return `gs://${bucket}/${filePath}`;
  } catch (error) {
    console.error('Error converting URL to gsPath:', error);
    throw error;
  }
}
export const isGsPath = (str: string) => str.startsWith('gs://');
