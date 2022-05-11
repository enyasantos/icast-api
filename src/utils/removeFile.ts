import * as fs from 'fs';
import * as path from 'path';

export function DeleteFile(pathFile: string) {
  const p = path.resolve(__dirname, '..', '..', pathFile);
  fs.unlink(p, (err) => {
    if (err) {
      console.error(err);
      return null;
    } else return { message: 'File removed' };
  });
}
