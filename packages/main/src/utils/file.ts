import fs from 'fs/promises'

/**
 * Check the file name is existed
 * @param path - full file path
 * @return {boolean} - if it's exist, return true. If it's not exist, return false.
 */
export const fileNameCheck = async (path: string) => {
  try {
    await fs.access(path)
    return true
  } catch (e) {
    return false
  }
}
