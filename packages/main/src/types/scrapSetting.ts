export type FileNameKey = 'xlsx' | 'csv' | 'images' | 'pdf' | 'pdf-with-template' | 'txt' | 'videos'

export interface ScrapSetting {
  fileNames: Record<FileNameKey, string>
}
