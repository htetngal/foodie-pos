import { CartItem } from "@/types/cart";
import { OrderAddon, OrderItem } from "@/types/order";
import { Addon, Menu, Order, Table } from "@prisma/client";

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, cur) => {
    const menuPrice = cur.menu.price;
    const quantity = cur.quantity;
    const totalAddonPrice = cur.addons.reduce((prev, curr) => {
      return (prev += curr.price);
    }, 0);
    return (prev += (menuPrice + totalAddonPrice) * quantity);
  }, 0);

  return totalPrice;
};

export const formatOrderItem = (
  orders: Order[],
  tables: Table[],
  menus: Menu[],
  addons: Addon[]
) => {
  /* 
  orderItem format
  orderItems = [
    {
      itemId: asdasdsad,
      menu: {},
      table: {},
      status: PENDING,
      orderAddons: [
        {
          addonCategoryId: 1,
          addons: [
            {},{}
          ]
        }
      ]
    }
  ]
  */

  //orders = [{...,itemId:a1,...},{...,itemId:a2,...},{...,itemId:a2,...}]

  const orderItemIds: string[] = [];

  orders.map((item) => {
    const isExist = orderItemIds.includes(item.itemId);
    if (!isExist) {
      orderItemIds.push(item.itemId);
    }
  }); /* orderItemIds = [a1,a2]*/

  const orderItem: OrderItem[] = orderItemIds.map((orderItemId) => {
    const currentOrders = orders.filter(
      (order) => order.itemId === orderItemId
    );

    const currentOrderAddonIds = currentOrders.map(
      (currentOrder) => currentOrder.addonId
    );

    const orderAddons: OrderAddon[] = [];

    if (currentOrderAddonIds.length) {
      currentOrderAddonIds.map((currentOrderAddonId) => {
        const addon = addons.find(
          (item) => item.id === currentOrderAddonId
        ) as Addon;
        if (!addon) return;
        const isExist = orderAddons.find(
          (orderAddon) => orderAddon.addonCategoryId === addon.addonCategoryId
        );
        if (!isExist) {
          orderAddons.push({
            addonCategoryId: addon.addonCategoryId,
            addons: [addon].sort((a, b) => a.name.localeCompare(b.name)),
          });
        } else {
          orderAddons.map((orderAddon) => {
            const sameParent =
              orderAddon.addonCategoryId === addon.addonCategoryId;

            if (sameParent) {
              orderAddon.addons.push(addon);
            }
          });
        }
      });
    }

    return {
      itemId: orderItemId,
      menu: menus.find((menu) => menu.id === currentOrders[0].menuId) as Menu,
      table: tables.find(
        (item) => item.id === currentOrders[0].tableId
      ) as Table,
      status: currentOrders[0].status,
      orderAddons,
    };
  });

  return orderItem.sort((a, b) => a.itemId.localeCompare(b.itemId));
};
