import  { diskStorage } from "multer";

export const storageConfig = () => {
    return diskStorage({
        destination: (req, file, cb) => {
            
            let type = req.params.productId;
            cb(null, `uploads/product/${type}`);
          },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '_' + file.originalname);
        }
    })
}