import AddonCategoryBox from "@/components/AddonCategoryBox";
import QualitySelector from "@/components/QualitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { CartItem } from "@/types/cart";
import { Box, Button } from "@mui/material";
import { Addon } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const orderDetails = () => {
  const { query, isReady, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const menuId = Number(query.id);
  const cartItemId = query.cartItemId;
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === cartItemId);
  const menus = useAppSelector((state) => state.menu.items);
  const selectedMenu = menus.find((item) => item.id === menuId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [disable, setDisable] = useState(true);

  const addonCategoryIds = useAppSelector(
    (state) => state.menuAddonCategory.items
  )
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);

  const addonCategories = useAppSelector(
    (state) => state.addonCatrgory.items
  ).filter((item) => addonCategoryIds.includes(item.id));

  const handleDecrease = () => {
    const newQuantity = quantity === 1 ? 1 : quantity - 1;
    setQuantity(newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (cartItem) {
      const { addons, quantity } = cartItem;
      setSelectedAddons(addons);
      setQuantity(quantity);
    }
  }, [cartItem]);

  useEffect(() => {
    const requiredAddonCategories = addonCategories.filter(
      (addonCategory) => addonCategory.isRequired
    );

    const selectRequiredAddons = selectedAddons.filter((item) => {
      const selectAddCats = addonCategories.find(
        (addonCategory) => addonCategory.id === item.addonCategoryId
      );

      return selectAddCats?.isRequired ? true : false;
    });

    const isValid =
      requiredAddonCategories.length !== selectRequiredAddons.length;

    setDisable(isValid);
  }, [selectedAddons]);

  const handleAddToCart = () => {
    if (!selectedMenu) return;

    const newCartItem: CartItem = {
      id: cartItem?.id ? cartItem.id : nanoid(7),
      menu: selectedMenu,
      addons: selectedAddons,
      quantity,
    };

    dispatch(addToCart(newCartItem));
    const pathname = cartItem ? "/order/cart" : "/order";
    router.push({ pathname, query });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={selectedMenu?.assetUrl || "/defaultmenu.png"}
          alt={""}
          width={150}
          height={150}
          style={{ borderRadius: "50%", marginBottom: 10 }}
        />
        <AddonCategoryBox
          addonCategories={addonCategories}
          selectedAddons={selectedAddons}
          setSelectedAddons={setSelectedAddons}
        ></AddonCategoryBox>
        <QualitySelector
          quantity={quantity}
          increase={handleIncrease}
          decrease={handleDecrease}
        ></QualitySelector>

        <Button
          variant="contained"
          disabled={disable}
          onClick={handleAddToCart}
          sx={{ mb: 10 }}
        >
          {cartItem ? "Update Cart" : "Add to Cart"}
        </Button>
      </Box>
    </Box>
  );
};

export default orderDetails;
