import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Not Authorized");

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
  res.status(200).send("Hello");
}
