import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
  destImage: process.env.UPLOAD_LOCATION_COVER_EPISODE,
  destAudio: process.env.UPLOAD_LOCATION_EPISODE,
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(mpeg|mp3|wav|flac|jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      // Create folder if doesn't exist
      const fieldname = file.fieldname;
      const uploadPath =
        fieldname === 'episode'
          ? multerConfig.destAudio
          : multerConfig.destImage;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      const filenameSplit = file.originalname.split('.');
      const fileExt = filenameSplit[filenameSplit.length - 1];
      cb(null, `${Date.now()}.${fileExt}`);
    },
  }),
};
