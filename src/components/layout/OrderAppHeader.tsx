import { useAppSelector } from "@/store/hooks";
import HomeIcon from "@mui/icons-material/Home";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import CartIcon from "./CartIcon";

interface Props {
  cartItemCount: number;
}
const OrderAppHeader = (cartItemCount: Props) => {
  const router = useRouter();
  const isCart =
    router.pathname === "/order/cart" ||
    router.pathname.includes("/order/active-order");
  const showCartIcon = !isCart;
  const cartItems = useAppSelector((state) => state.cart.items);
  const company = useAppSelector((state) => state.company.item);

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        top: 0,
        p: { xs: 5, sm: 0 },
        backgroundColor: "primary.main",
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <Image
          src="/orderAppHeader.svg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="header-image"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", sm: "center" },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 40,
            textAlign: "center",
            color: "secondary.main",
          }}
        >
          <Typography sx={{ fontSize: { xs: 25, sm: 50 } }}>
            {company?.name}
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              display: { xs: "none", sm: "inherit" },
            }}
          >
            {company?.township}
          </Typography>
        </Box>

        {showCartIcon && (
          <Box
            sx={{
              position: "absolute",
              top: 30,
              right: { xs: 30, sm: 50 },
              display: "flex",
            }}
            onClick={() => {
              router.push({ pathname: "/order/cart", query: router.query });
            }}
          >
            <CartIcon cartItems={cartItems} />
          </Box>
        )}
        {!showCartIcon && (
          <Box
            sx={{
              position: "absolute",
              top: 30,
              right: { xs: 30, sm: 50 },
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
