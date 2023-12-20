// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tableId } = req.query;
  if (req.method === "GET") {
    if (tableId) {
      const table = await prisma.table.findFirst({
        where: { id: Number(tableId) },
      });

      const orders = await prisma.order.findMany({
        where: { tableId: Number(tableId) },
      });

      const location = await prisma.location.findFirst({
        where: { id: table?.locationId },
      });

      const company = await prisma.company.findFirst({
        where: { id: location?.companyId },
      });

      let menuCategories = await prisma.menuCategory.findMany({
        where: { companyId: company?.id, isArchived: false },
      });
      const menuCategoryIds = menuCategories.map((item) => item.id);

      const disabledLocationMenuCategoryIds = (
        await prisma.disabledLocationMenuCategory.findMany({
          where: { menuCategoryId: { in: menuCategoryIds } },
        })
      ).map((item) => item.menuCategoryId);

      menuCategories = menuCategories.filter(
        (item) => !disabledLocationMenuCategoryIds.includes(item.id)
      );

      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
        where: { menuCategoryId: { in: menuCategoryIds }, isArchived: false },
      });
      const menuIds = menuCategoryMenus.map((item) => item.menuId);
      let menus = await prisma.menu.findMany({
        where: { id: { in: menuIds }, isArchived: false },
      });

      const disabledLocationMenuIds = (
        await prisma.disabledLocationMenu.findMany({
          where: { menuId: { in: menuIds } },
        })
      ).map((item) => item.menuId);

      menus = menus.filter(
        (item) => !disabledLocationMenuIds.includes(item.id)
      );

      const menuAddonCategories = await prisma.menuAddonCategory.findMany({
        where: { menuId: { in: menuIds }, isArchived: false },
      });
      const addonCategoryIds = menuAddonCategories.map(
        (item) => item.addonCategoryId
      );
      const addonCategories = await prisma.addonCategory.findMany({
        where: { id: { in: addonCategoryIds }, isArchived: false },
      });

      const addons = await prisma.addon.findMany({
        where: { addonCategoryId: { in: addonCategoryIds }, isArchived: false },
      });

      return res.status(200).json({
        company,
        locations: [location],
        menuCategories,
        menus,
        menuCategoryMenus,
        addonCategories,
        menuAddonCategories,
        addons,
        tables: [table],
        disabledLocationMenuCategories: [],
        disabledLocationMenus: [],
        orders,
      });
    }
  }
}
