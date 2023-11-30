import { useAppSelector } from "@/store/hooks";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  cartItemCount: number;
}
const OrderAppHeader = (cartItemCount: Props) => {
  const router = useRouter();
  const isCart = router.pathname === "/order/cart";
  const showCartIcon = !isCart;
  const cartItems = useAppSelector((state) => state.cart.items);
  return (
    <Box sx={{ position: "fixed", width: "100vw", top: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <Image
          src="/orderAppHeader.svg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="header-image"
        />
        <Box
          sx={{
            position: "absolute",
            top: 40,
            color: "secondary.main",
          }}
        >
          <Typography sx={{ fontSize: 50 }}>Ah Wa Sar</Typography>
          <Typography>No.18, HinTaDa Street, SanChaung</Typography>
        </Box>

        {showCartIcon && (
          <Box
            sx={{
              position: "absolute",
              top: 40,
              right: { xs: 30, md: 50, xl: 100 },
              color: "secondary.main",
              display: "flex",
            }}
            onClick={() => {
              router.push({ pathname: "/order/cart", query: router.query });
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{
                fontSize: 50,
              }}
            />
            {cartItems.length ? (
              <Typography>{cartItems.length}</Typography>
            ) : (
              ""
            )}
          </Box>
        )}
        {!showCartIcon && (
          <Box
            sx={{
              position: "absolute",
              top: 40,
              right: { xs: 30, md: 50, xl: 100 },
              color: "secondary.main",
              display: "flex",
            }}
            onClick={() => {
              router.push({ pathname: "/order", query: router.query });
            }}
          >
            <HomeIcon
              sx={{
                fontSize: 50,
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
