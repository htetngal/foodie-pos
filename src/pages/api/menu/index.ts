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
    const { name, price, description, assetUrl, menuCategoryIds } = req.body;
    const isValid = name && menuCategoryIds.length > 0;
    if (!isValid) return res.status(400).send("Bad Request");

    const newMenu = await prisma.menu.create({
      data: { name, price, description, assetUrl },
    });

    // const newMenuCategoryMenu: { menuCategoryId: number; menuId: number }[] =
    //   menuCategoryIds.map((item: number) => ({
    //     menuCategoryId: item,
    //     menuId: newMenu.id,
    //   }));

    const menuCategoryMenu = await prisma.$transaction(
      menuCategoryIds.map((item: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item, menuId: newMenu.id },
        })
      )
    );

    return res.status(200).json({ newMenu, menuCategoryMenu });
  } else if (method === "PUT") {
    const {
      id,
      name,
      price,
      description,
      assetUrl,
      locationId,
      isAvailable,
      menuCategoryIds,
    } = req.body;
    const isValid = name && menuCategoryIds.length > 0 && price !== undefined;
    if (!isValid) return res.status(400).send("Bad Request");

    const updatedMenu = await prisma.menu.update({
      data: { name, price, description, assetUrl },
      where: { id },
    });
    await prisma.menuCategoryMenu.deleteMany({
      where: { menuId: id },
    });

    const updatedMenuCategoryMenus = await prisma.$transaction(
      menuCategoryIds.map((item: number) =>
        prisma.menuCategoryMenu.create({
          data: { menuCategoryId: item, menuId: updatedMenu.id },
        })
      )
    );

    if (locationId && isAvailable === false) {
      const isExist = await prisma.disabledLocationMenu.findFirst({
        where: { menuId: id, locationId },
      });
      if (!isExist) {
        await prisma.disabledLocationMenu.create({
          data: { menuId: updatedMenu.id, locationId },
        });
      }
    } else if (locationId && isAvailable === true) {
      const isExist = await prisma.disabledLocationMenu.findFirst({
        where: { menuId: id, locationId },
      });
      if (isExist) {
        await prisma.disabledLocationMenu.delete({
          where: { id: isExist.id },
        });
      }
    }

    const companyId = (
      await prisma.user.findUnique({
        where: { email: String(session.user?.email) },
      })
    )?.companyId;

    const allMenuCategoryIds = (
      await prisma.menuCategory.findMany({
        where: { companyId },
      })
    ).map((item) => item.id);

    const allMenuIds = (
      await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: allMenuCategoryIds } },
      })
    ).map((item) => item.menuId);

    const disabledLocationMenus = await prisma.disabledLocationMenu.findMany({
      where: { menuId: { in: allMenuIds } },
    });

    return res
      .status(200)
      .json({ updatedMenu, updatedMenuCategoryMenus, disabledLocationMenus });
  }

  res.status(200).json({ name: "John Doe" });
}
