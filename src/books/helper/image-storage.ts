import {diskStorage} from 'multer';
import {v4 as uuidv4} from 'uuid';

import * as fs from 'fs';
import FileType = require('file-type');

import path = require('path');
import { Observable, filter, from } from 'rxjs';

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtensions : validFileExtension[] = ['png' , 'jpg' , 'jpeg'];
const validMimeTypes : validMimeType[] = [
    'image/png' , 
    'image/jpg' ,
    'image/jpeg' 
]

export const saveImageToStorage = {
    storage: diskStorage({
        destination: './images',
        filename: (req,file,cb) =>{
            const fileExtension : string = path.extname(file.originalname);
            const fileName : string = uuidv4() + fileExtension;
            cb(null, fileName)
        }
    }),
    fileFilter: (req,file,cb) =>{
        const allowedMimeTypes : validMimeType[] = validMimeTypes;
        allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false)
    }
}

// export const isFileExtensionSafe = async (fullFilePath: string) : Promise<boolean> => {
//     return await FileType.fromFile(fullFilePath)
// }
export const isFileExtensionSafe = async (fullFilePath: string): Promise<boolean> => {
    try {
      const fileSignature = await getFileSignature(fullFilePath);
      return isFileExtensionSupported(fileSignature);
    } catch (error) {
      console.error('Error checking file extension:', error);
      return false;
    }
  };

  const getFileSignature = async (filePath: string): Promise<Buffer> => {
    const readStream = fs.createReadStream(filePath, { start: 0, end: 261 });
    const chunks: Buffer[] = [];
  
    for await (const chunk of readStream) {
      chunks.push(chunk);
    }
  
    return Buffer.concat(chunks);
  };
  
  const isFileExtensionSupported = (fileSignature: Buffer): boolean => {
    // Define the file signatures for the supported file types
    const fileSignatures: { [key: string]: Buffer } = {
      png: Buffer.from([137, 80, 78, 71]),
      jpg: Buffer.from([255, 216, 255]),
      jpeg: Buffer.from([255, 216, 255]),
    };
  
    // Check if the file signature matches any of the supported types
    for (const fileType in fileSignatures) {
      if (fileSignatures[fileType].equals(fileSignature.slice(0, fileSignatures[fileType].length))) {
        return true;
      }
    }
  
    return false;
  };