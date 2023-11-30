import { Request, Response } from "express";
import { fileUpload } from "../../../../utils/fileUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: Request, res: Response) {
  try {
    fileUpload(req, res, (error) => {
      if (error) {
        return res.status(500).send("Internal Server Error 1");
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      return res.status(200).json({ assetUrl });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error 2");
  }
}
