// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";
import {
  getQrCodeUrl,
  qrCodeImageUpload,
} from "../../../../../utils/fileUpload";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const { name, locationId } = req.body;

    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request");

    const table = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });

    const companyId = (
      await prisma.location.findFirst({
        where: { id: locationId },
      })
    )?.companyId;
    const tableId = table.id;
    await qrCodeImageUpload(tableId);
    const assetUrl = getQrCodeUrl(tableId);
    const newTable = await prisma.table.update({
      data: { assetUrl },
      where: { id: tableId },
    });
    return res.status(200).json({ newTable });
  } else if (method === "PUT") {
    const { id, name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request");

    const updatedTable = await prisma.table.update({
      data: { name, locationId },
      where: { id },
    });

    return res.status(200).json({ updatedTable });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");

    await prisma.table.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("OK");
  }

  return res.status(405).send("Method not allowed");
}
