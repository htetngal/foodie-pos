import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatOrderItem } from "../../../utils/general";

const OrderAppFooter = () => {
  const orders = useAppSelector((state) => state.order.items);
  const tables = useAppSelector((state) => state.table.items);
  const menus = useAppSelector((state) => state.menu.items);
  const addons = useAppSelector((state) => state.addon.items);
  const router = useRouter();
  const isTrue =
    orders.length > 0 &&
    !router.pathname.includes("/active-order") &&
    orders.some(
      (order) =>
        order.status === ORDERSTATUS.PENDING ||
        order.status === ORDERSTATUS.COOKING
    );

  const formattedOrderItem = formatOrderItem(orders, tables, menus, addons);
  const activeOrder = formattedOrderItem.filter(
    (item) => item.status !== ORDERSTATUS.COMPLETE
  );
  if (!isTrue) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "primary.main",
        position: "fixed",
        bottom: 0,
        zIndex: 10,
        p: 1.5,
      }}
    >
      <Typography sx={{ color: "info.main", fontSize: { xs: 15, sm: 18 } }}>
        You have {activeOrder.length} active order.Click{" "}
        <Link
          href={{
            pathname: `/order/active-order/${orders[0].orderSeq}`,
            query: router.query,
          }}
        >
          here
        </Link>
        to view.
      </Typography>
    </Box>
  );
};

export default OrderAppFooter;
