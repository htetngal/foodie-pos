import { CartItem } from "@/types/cart";
import { ORDERSTATUS } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { tableId, cartItems } = req.body;
    console.log(cartItems);

    const isValid = tableId && cartItems;
    if (!isValid) res.status(401).send("Bad Request");
    const existOrder = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [ORDERSTATUS.PENDING, ORDERSTATUS.COOKING] },
      },
    });

    const orderSeq = existOrder ? existOrder.orderSeq : nanoid(7);

    for (const item of cartItems) {
      const cartItem = item as CartItem;
      const cartItemMenuPrice = cartItem.menu.price * cartItem.quantity;

      const hasAddons = cartItem.addons.length;

      if (hasAddons) {
        const addonPrices = cartItem.addons.map((item) => item.price);
        const allAddonPrice = addonPrices.reduce(
          (prev, curr) => (prev += curr),
          0
        );
        const allPrice =
          cartItem.quantity * (cartItem.menu.price + allAddonPrice);

        for (const addon of cartItem.addons) {
          await prisma.order.create({
            data: {
              orderSeq,
              itemId: cartItem.id,
              menuId: cartItem.menu.id,
              addonId: addon.id,
              quantity: cartItem.quantity,
              status: ORDERSTATUS.PENDING,
              totalPrice: allPrice,
              tableId,
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            orderSeq,
            itemId: cartItem.id,
            menuId: cartItem.menu.id,
            quantity: cartItem.quantity,
            status: ORDERSTATUS.PENDING,
            totalPrice: cartItemMenuPrice,
            tableId,
          },
        });
      }
    }
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return res.status(200).json({ orders });
  } else if (method === "PUT") {
    const { orderStatus } = req.body;
    const itemId = String(req.query.itemId);
    const valid = itemId && orderStatus;
    if (!valid) return res.status(400).send("Bad Request");

    const isExist = await prisma.order.findFirst({ where: { itemId } });
    if (!isExist) return res.status(400).send("Bad Request");

    await prisma.order.updateMany({
      data: { status: orderStatus },
      where: { itemId },
    });

    const locationId = (
      await prisma.table.findFirst({
        where: { id: isExist.tableId },
      })
    )?.locationId;

    const allTableIds = (
      await prisma.table.findMany({ where: { locationId } })
    ).map((item) => item.id);

    const orders = await prisma.order.findMany({
      where: { tableId: { in: allTableIds }, isArchived: false },
      orderBy: { id: "asc" },
    });
    return res.status(200).json({ orders });
  }

  return res.status(405).send("Method not allowed");
}
