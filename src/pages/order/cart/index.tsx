import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { emptyCart, removeFromCart } from "@/store/slices/cartSlice";
import { createOrderFunction } from "@/store/slices/orderSlice";
import { CartItem } from "@/types/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Addon, Order } from "@prisma/client";
import { useRouter } from "next/router";
import { getCartTotalPrice } from "../../../../utils/general";

const Index = () => {
  const { query, ...router } = useRouter();
  const tableId = Number(query.tableId);
  const cartItems = useAppSelector((state) => state.cart.items);
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);
  const dispatch = useAppDispatch();

  const onSuccess = (orders: Order[]) => {
    router.push({
      pathname: `active-order/${orders[0].orderSeq}`,
      query: { tableId },
    });
    console.log("2");
    dispatch(emptyCart());
  };

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return addons.map((addon) => {
      const addonCategory = addonCategories.find(
        (item) => item.id === addon.addonCategoryId
      );
      return (
        <Box
          key={addon.id}
          sx={{ display: "flex", flexDirection: "column", pl: 6 }}
        >
          <Typography sx={{ fontStyle: "italic" }}>
            {addonCategory?.name}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            key={addon.id}
          >
            <Typography>{addon.name}</Typography>
            <Typography>{addon.price}</Typography>
          </Box>
        </Box>
      );
    });
  };

  const handleDeleteOrder = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleConfirmOrder = () => {
    dispatch(createOrderFunction({ tableId, cartItems, onSuccess }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          bgcolor: "info.main",
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" textAlign={"center"}>
          Review Your Order
        </Typography>
        <Box sx={{ p: 2 }}>
          {cartItems.map((cartItem) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: 2,
              }}
              key={cartItem.id}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ bgcolor: blue[500] }}>{cartItem.quantity}</Avatar>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    ml: 1,
                  }}
                >
                  <Typography>{cartItem.menu.name}</Typography>
                  <Typography>{cartItem.menu.price}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {renderAddons(cartItem.addons)}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <IconButton
                  onClick={() => {
                    router.push({
                      pathname: `menus/${cartItem.menu.id}`,
                      query: { ...query, cartItemId: cartItem.id },
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteOrder(cartItem)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider sx={{ m: 2 }} />
        <Typography textAlign={"right"} variant="h5">
          Total Price: {getCartTotalPrice(cartItems)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
