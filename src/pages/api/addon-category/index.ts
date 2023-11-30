// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = getServerSession(req, res, authOptions);
  if (!session) res.status(401).send("Not Authorized");

  const method = req.method;
  if (method === "POST") {
    const { name, isRequired, menuIds } = req.body;
    const isValid = name && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Request");

    const newAddonCategory = await prisma.addonCategory.create({
      data: { name, isRequired },
    });

    const newMenuAddonCategory = await prisma.$transaction(
      menuIds.map((item: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item, addonCategoryId: newAddonCategory.id },
        })
      )
    );

    return res.status(200).json({ newAddonCategory, newMenuAddonCategory });
  } else if (method === "PUT") {
    const { id, name, isRequired, menuIds } = req.body;
    const isValid = name && menuIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Request");

    const updatedAddonCategory = await prisma.addonCategory.update({
      data: { name, isRequired },
      where: { id },
    });

    await prisma.menuAddonCategory.deleteMany({
      where: { addonCategoryId: updatedAddonCategory.id },
    });

    const updatedMenuAddonCategory = await prisma.$transaction(
      menuIds.map((item: number) =>
        prisma.menuAddonCategory.create({
          data: { menuId: item, addonCategoryId: updatedAddonCategory.id },
        })
      )
    );

    return res
      .status(200)
      .json({ updatedAddonCategory, updatedMenuAddonCategory });
  }

  res.status(200).json({ name: "John Doe" });
}
