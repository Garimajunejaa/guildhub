export function normalizeUserPhotoUrl(photoUrl) {
  if (!photoUrl) return "";
  const backendPrefix = "http://localhost:8080/img/users/";
  let trimmedUrl = photoUrl.trim();

  // Remove backendPrefix if present anywhere in the URL
  if (trimmedUrl.includes(backendPrefix)) {
    trimmedUrl = trimmedUrl.replace(backendPrefix, "");
  }

  // If URL is a full URL (http or https), return as is
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `${backendPrefix}${trimmedUrl}`;
}
