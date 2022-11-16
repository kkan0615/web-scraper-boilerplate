type key = 'pdf' | 'csv' | 'xlsx' | 'image' | 'txt'

export const allowedDownloadExt: Record<key, boolean> = {
  pdf: true,
  csv: true,
  xlsx: true,
  image: true,
  txt: true,
}
