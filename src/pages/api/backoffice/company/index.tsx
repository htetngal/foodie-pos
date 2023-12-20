import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, name, street, township, city } = req.body;
    if (!id) return res.status(400).send("Bad Request");

    await prisma.company.updateMany({
      data: { name, street, township, city },
      where: { id },
    });

    const company = await prisma.company.findFirst({ where: { id } });

    return res.status(200).json({ company });
  }
  return res.status(405).send("Method Not Allowed");
}
