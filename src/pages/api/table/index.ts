// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";
import { getQrCodeUrl, qrCodeImageUpload } from "../../../../utils/fileUpload";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Not Authorized");

  const method = req.method;

  if (method === "POST") {
    const { name, locationId } = req.body;
    const user = session.user;
    const email = user?.email as string;
    const dbUser = await prisma.user.findFirst({ where: { email } });
    const isValid = name && locationId && dbUser;
    if (!isValid) return res.status(400).send("Bad Request");

    const table = await prisma.table.create({
      data: { name, locationId, assetUrl: "" },
    });

    const companyId = dbUser.companyId;
    const tableId = table.id;
    await qrCodeImageUpload(companyId, tableId);
    const assetUrl = getQrCodeUrl(companyId, tableId);
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

  res.status(200).json({ name: "John Doe" });
}
