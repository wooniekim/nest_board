import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export default (): MulterOptions => {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../upload`);
      },
      filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}_${file.originalname}`);
      },
    }),
  };
};
