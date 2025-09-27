import multer from 'multer'

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        const error : any = new Error('Invalid file type')
        cb(error, false);
      }
    }
  });