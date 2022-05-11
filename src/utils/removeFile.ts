import fs from 'fs';

export function DeleteFile(path: string) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return null;
    } else return { message: 'File removed' };
  });
}
