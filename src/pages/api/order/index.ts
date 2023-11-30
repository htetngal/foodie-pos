import { CartItem } from "@/types/cart";
import { ORDERSTATUS } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/db";
import { getCartTotalPrice } from "../../../../utils/general";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const { tableId, cartItems } = req.body;
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
      const hasAddons = cartItem.addons.length;
      if (hasAddons) {
        for (const addon of cartItem.addons) {
          await prisma.order.create({
            data: {
              orderSeq,
              itemId: cartItem.id,
              menuId: cartItem.menu.id,
              addonId: addon.id,
              quantity: cartItem.quantity,
              status: ORDERSTATUS.PENDING,
              totalPrice: getCartTotalPrice(cartItems),
              tableId,
            },
          });
        }
      }
    }
    const orders = await prisma.order.findMany({ where: { orderSeq } });
    return res.status(200).json({ orders });
  }

  res.status(405).send("Method not allowed");
}
