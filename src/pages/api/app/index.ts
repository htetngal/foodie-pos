// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../utils/db";
import { getQrCodeUrl, qrCodeImageUpload } from "../../../../utils/fileUpload";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { companyId, tableId } = req.query;
  if (req.method === "GET") {
    if (companyId && tableId) {
      const locations = await prisma.location.findMany({
        where: { companyId: Number(companyId) },
      });
      const locationIds = locations.map((location) => location.id);

      let menuCategories = await prisma.menuCategory.findMany({
        where: { companyId: Number(companyId), isArchived: false },
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
        locations,
        menuCategories,
        menus,
        menuCategoryMenus,
        addonCategories,
        menuAddonCategories,
        addons,
        tables: [],
        disabledLocationMenuCategories: [],
        disabledLocationMenus: [],
      });
    } else {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).send("Not Authorized");

      const user = session.user;
      const name = user?.name as string;
      const email = user?.email as string;

      const dbUser = await prisma.user.findUnique({ where: { email } });

      if (!dbUser) {
        const companyName = "Ah Wa Sar";
        const companyAddress = "No 2, HinTaDa Street, SanChaung";
        const newCompany = await prisma.company.create({
          data: { name: companyName, address: companyAddress },
        });

        const newUser = await prisma.user.create({
          data: { name, email, companyId: newCompany.id },
        });

        const menuCategoryName = "Hot Dish";
        const menuCategory = await prisma.menuCategory.create({
          data: { name: menuCategoryName, companyId: newCompany.id },
        });

        const menuName = "Default Menu";
        const menuPrice = 10000;
        const menu = await prisma.menu.create({
          data: { name: menuName, price: menuPrice },
        });

        const menuCategoryMenu = await prisma.menuCategoryMenu.create({
          data: { menuCategoryId: menuCategory.id, menuId: menu.id },
        });

        const addonCategoryName = "Default AddonCategory";
        const addonCategory = await prisma.addonCategory.create({
          data: { name: addonCategoryName },
        });

        const menuAddonCategory = await prisma.menuAddonCategory.create({
          data: { menuId: menu.id, addonCategoryId: addonCategory.id },
        });

        const addonOneName = "Default Addon 1";
        const addonTwoName = "Default Addon 2";
        const addonThreeName = "Default Addon 3";
        const addonArray = [
          { name: addonOneName, addonCategoryId: addonCategory.id },
          { name: addonTwoName, addonCategoryId: addonCategory.id },
          { name: addonThreeName, addonCategoryId: addonCategory.id },
        ];
        const addons = await prisma.$transaction(
          addonArray.map((addon) => prisma.addon.create({ data: addon }))
        );

        const locationName = "Branch 1";
        const locationAddress = "SanChaung";
        const location = await prisma.location.create({
          data: {
            name: locationName,
            address: locationAddress,
            companyId: newCompany.id,
          },
        });

        const tableName = "Default Table";
        const table = await prisma.table.create({
          data: { name: tableName, locationId: location.id, assetUrl: "" },
        });

        await qrCodeImageUpload(newCompany.id, table.id);
        const assetUrl = getQrCodeUrl(newCompany.id, table.id);

        const tables = await prisma.table.update({
          data: { assetUrl },
          where: { id: table.id },
        });

        return res.status(200).json({
          menuCategories: [menuCategory],
          menus: [menu],
          menuCategoryMenus: [menuCategoryMenu],
          addonCategories: [addonCategory],
          menuAddonCategories: [menuAddonCategory],
          addons,
          locations: [location],
          tables: [table],
          disabledLocationMenuCategories: [],
          disabledLocationMenus: [],
        });
      } else {
        const companyId = dbUser.companyId;

        const locations = await prisma.location.findMany({
          where: { companyId, isArchived: false },
        });
        const locationIds = locations.map((location) => location.id);

        const menuCategories = await prisma.menuCategory.findMany({
          where: { companyId, isArchived: false },
        });
        const menuCategoryIds = menuCategories.map((item) => item.id);

        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({
          where: { menuCategoryId: { in: menuCategoryIds }, isArchived: false },
        });
        const menuIds = menuCategoryMenus.map((item) => item.menuId);
        const menus = await prisma.menu.findMany({
          where: { id: { in: menuIds }, isArchived: false },
        });

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
          where: {
            addonCategoryId: { in: addonCategoryIds },
            isArchived: false,
          },
        });

        const tables = await prisma.table.findMany({
          where: { locationId: { in: locationIds }, isArchived: false },
        });

        const disabledLocationMenuCategories =
          await prisma.disabledLocationMenuCategory.findMany({
            where: { menuCategoryId: { in: menuCategoryIds } },
          });

        const disabledLocationMenus =
          await prisma.disabledLocationMenu.findMany({
            where: { menuId: { in: menuIds } },
          });

        return res.status(200).json({
          locations,
          menuCategories,
          menus,
          menuCategoryMenus,
          addonCategories,
          menuAddonCategories,
          addons,
          tables,
          disabledLocationMenuCategories,
          disabledLocationMenus,
        });
      }
    }
  }
}
