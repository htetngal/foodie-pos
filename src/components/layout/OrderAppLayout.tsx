import { useAppDispatch } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import OrderAppFooter from "./OrderAppFooter";
import OrderAppHeader from "./OrderAppHeader";
interface Props {
  children: ReactNode;
}

const OrderAppLayout = ({ children }: Props) => {
  const { isReady, ...router } = useRouter();
  const { tableId } = router.query;
  const isHome = router.pathname === "/order";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableId) {
      dispatch(fetchData({ tableId: Number(tableId) }));
    }
  }, [tableId]);

  useEffect(() => {
    if (isReady && !tableId) {
      router.push("/");
    }
  }, [isReady]);
  return (
    <Box>
      <OrderAppHeader cartItemCount={0} />
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          top: isHome ? 300 : 300,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%", lg: "55%" },

            m: "0 auto",
          }}
        >
          {children}
        </Box>
      </Box>

      <OrderAppFooter />
    </Box>
  );
};

export default OrderAppLayout;
