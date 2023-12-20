// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

  return res.status(405).send("Method Not Allowed");
}
