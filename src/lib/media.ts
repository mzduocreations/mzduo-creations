// Helpers for handling image vs video media served from Cloudinary.

export type ResourceType = "image" | "video";


export function videoThumb(url: string): string {
  if (!url.includes("/upload/")) return url;
  return url
    .replace("/upload/", "/upload/so_0,f_jpg,q_auto,w_600/")
    .replace(/\.(mp4|mov|webm|m4v|avi|mkv)$/i, ".jpg");
}

// Best cover URL for a media item: real image as-is, video → still frame.
export function coverUrl(url: string, resourceType?: ResourceType): string {
  return resourceType === "video" ? videoThumb(url) : url;
}
