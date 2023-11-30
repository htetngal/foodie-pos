// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getServerSession();
  if (!session) return res.status(401).send("Not Authorized");

  const method = req.method;

  if (method === "POST") {
    const { name, price, isArchived, addonCategoryId } = req.body;
    if (!name && !addonCategoryId) return res.status(400).send("Bad Request");

    const newAddon = await prisma.addon.create({
      data: { name, price, isArchived, addonCategoryId },
    });

    return res.status(200).send(newAddon);
  } else if (method === "PUT") {
    console.log("PUT");
    const { id, name, price, addonCategoryId } = req.body;
    if (!name && !addonCategoryId) return res.status(400).send("Bad Request");

    const updatedAddon = await prisma.addon.update({
      data: { name, price, addonCategoryId },
      where: { id },
    });
    return res.status(200).send(updatedAddon);
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const addon = await prisma.addon.findFirst({ where: { id } });
    if (!addon) return res.status(400).send("Bad Request");

    await prisma.addon.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("OK");
  }
}
