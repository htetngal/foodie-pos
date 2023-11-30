import { CartItem } from "@/types/cart";

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
