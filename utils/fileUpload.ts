import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import QRCode from "qrcode";
import { config } from "./config";

const s3Client = new S3Client({
  endpoint: config.spaceEndPoint,
  region: "sgp1",
  credentials: {
    accessKeyId: config.spaceAccessKeyId,
    secretAccessKey: config.spaceSecretAccessKey,
  },
});

export const fileUpload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "msquarefdc",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(null, `foodie-pos/htet-nge-nge-ko/${Date.now()}_${file.originalname}`);
    },
  }),
}).array("files", 1);

const generateLinkForQRCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};

export const getQrCodeUrl = (tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/htet-nge-nge-ko/qrcode/tableId-${tableId}.png`;
};

export const qrCodeImageUpload = async (tableId: number) => {
  try {
    const qrCodeData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });

    const input = {
      Bucket: "msquarefdc",
      Key: `foodie-pos/htet-nge-nge-ko/qrcode/tableId-${tableId}.png`,
      ACL: "public-read",
      Body: Buffer.from(
        qrCodeData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    //@ts-ignore
    const command = new PutObjectCommand(input);
    s3Client.send(command);
  } catch (err) {
    console.error(err);
  }
};
