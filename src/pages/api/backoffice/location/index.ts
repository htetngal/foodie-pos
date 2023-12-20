// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    let { name, street, township, city, companyId } = req.body;
    const isValid = name && companyId;
    if (!isValid) return res.status(400).send("Bad Request");

    const newLocation = await prisma.location.create({
      data: { name, street, township, city, companyId },
    });

    return res.status(200).json({ newLocation });
  } else if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bad Request");

    const updatedLocation = await prisma.location.update({
      data: { name, street, township, city },
      where: { id },
    });

    return res.status(200).json({ updatedLocation });
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = id;
    if (!isValid) return res.status(400).send("Bad Request");

    await prisma.location.update({ data: { isArchived: true }, where: { id } });
    return res.status(200).send("OK");
  }

  return res.status(405).send("Method Not Allowed");
}
