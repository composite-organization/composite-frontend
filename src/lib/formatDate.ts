export function formatUploadedAt(uploadedAt: string): string {
  return uploadedAt.replace('T', ' ').replace('Z', '');
}
