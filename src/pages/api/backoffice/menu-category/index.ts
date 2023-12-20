import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const { name, locationId } = req.body;
    const isValid = name && locationId;
    if (!isValid) return res.status(400).send("Bad Request");

    const location = await prisma.location.findFirst({
      where: { id: locationId },
    });
    if (!location) return res.status(400).send("Bed Request");

    const menuCategory = await prisma.menuCategory.create({
      data: { name, companyId: location.companyId },
    });

    return res.status(200).json(menuCategory);
  } else if (method === "PUT") {
    const { id, name, isAvailable, locationId } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).send("Bed Request");

    const updatedMenuCategory = await prisma.menuCategory.update({
      data: { name },
      where: { id },
    });

    if (locationId && isAvailable === false) {
      const isExist = await prisma.disabledLocationMenuCategory.findFirst({
        where: { menuCategoryId: updatedMenuCategory.id },
      });
      if (isExist) {
        return res
          .status(200)
          .json({ updatedMenuCategory, disabledLocationMenuCategory: isExist });
      } else {
        const addedDisabledLocationMenuCategory =
          await prisma.disabledLocationMenuCategory.create({
            data: { locationId, menuCategoryId: updatedMenuCategory.id },
          });

        return res.status(200).json({
          updatedMenuCategory,
          disabledLocationMenuCategory: addedDisabledLocationMenuCategory,
        });
      }
    } else if (locationId && isAvailable === true) {
      const isExist = await prisma.disabledLocationMenuCategory.findFirst({
        where: { menuCategoryId: updatedMenuCategory.id },
      });
      if (isExist) {
        await prisma.disabledLocationMenuCategory.delete({
          where: { id: isExist.id },
        });
      }
      return res.status(200).json({
        updatedMenuCategory,
      });
    }
  } else if (method === "DELETE") {
    const id = Number(req.query.id);
    const isValid = await prisma.menuCategory.findFirst({ where: { id } });
    if (!isValid) return res.status(400).send("Bed Request");

    // const deletedMenuCategory = await prisma.menuCategory.update({
    //   data: { isArchived: true },
    //   where: { id },
    // });

    const menuIds = (
      await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: id, isArchived: false },
      })
    ).map((item) => item.menuId); //[1,2]

    const menuIdsPromise = menuIds.map(async (menuId) => {
      const menuData = { menuId, count: 1 };
      const count = await prisma.menuCategoryMenu.count({
        where: { menuId, isArchived: false },
      });
      menuData.count = count;
      return menuData;
    }); //[1,2][2,1]

    const menuIdsToArchived = (await Promise.all(menuIdsPromise))
      .filter((item) => item.count === 1)
      .map((item) => item.menuId);

    console.log(menuIdsToArchived);

    const addonCategoryIds = (
      await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIdsToArchived }, isArchived: false },
      })
    ).map((item) => item.addonCategoryId);

    const addonCategoryPromise = addonCategoryIds.map(
      async (addonCategoryId) => {
        const addonCategoryData = { addonCategoryId, count: 1 };
        const count = await prisma.menuAddonCategory.count({
          where: { addonCategoryId, isArchived: false },
        });
        addonCategoryData.count = count;
        return addonCategoryData;
      }
    );

    const addonCategoryIdToArchive = (await Promise.all(addonCategoryPromise))
      .filter((item) => item.count === 1)
      .map((item) => item.addonCategoryId);

    console.log(addonCategoryIdToArchive);

    for (const menuId of menuIdsToArchived) {
      await prisma.menu.updateMany({
        data: { isArchived: true },
        where: { id: menuId },
      });
      await prisma.menuAddonCategory.updateMany({
        data: { isArchived: true },
        where: { menuId },
      });
    }

    for (const addonCategoryId of addonCategoryIdToArchive) {
      await prisma.addonCategory.updateMany({
        data: { isArchived: true },
        where: { id: addonCategoryId },
      });

      await prisma.addon.updateMany({
        data: { isArchived: false },
        where: { addonCategoryId },
      });
    }

    for (const menuId of menuIds) {
      await prisma.menuCategoryMenu.updateMany({
        data: { isArchived: true },
        where: { menuId },
      });
    }

    await prisma.menuCategory.update({
      data: { isArchived: true },
      where: { id },
    });

    return res.status(200).send("Deleted");
  }

  return res.status(405).send("Method Not Allowed");
}
