import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.NX_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NX_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.NX_AWS_REGION,
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'practitionerbucket1',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});
