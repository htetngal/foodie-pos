// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
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

  if (method === "POST") {
    let { name, street, township, city, companyId } = req.body;
    const user = session.user;
    const email = user?.email as string;
    companyId = (await prisma.user.findFirst({ where: { email } }))?.companyId;
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

  res.status(200).json({ name: "John Doe" });
}
