import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Order } from "@prisma/client";
import { useRouter } from "next/router";
import { formatOrderItem } from "../../../../../utils/general";

const Index = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const allOrders = useAppSelector((state) => state.order.items);
  const orders = allOrders.filter((item) => item.orderSeq === orderSeq);
  const tables = useAppSelector((state) => state.table.items);
  const menus = useAppSelector((state) => state.menu.items);
  const addons = useAppSelector((state) => state.addon.items);

  const formattedOrderItem = formatOrderItem(orders, tables, menus, addons);

  const orderItemIds = orders.map((order) => order.itemId);
  let itemIds: string[] = [];

  orderItemIds.map((item) => {
    const isExist = itemIds.includes(item);
    if (!isExist) {
      itemIds.push(item);
    }
  });

  const orderRows = itemIds.map((itemId) => {
    return orders.find((item) => item.itemId === itemId) as Order;
  });

  const orderTotalPrice = orderRows.map((orderRow) => orderRow.totalPrice);

  const allTotalPrice = orderTotalPrice.reduce((prev, cur) => (prev += cur), 0);

  if (!orders.length) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          borderRadius: 15,
          mx: 3,
          bgcolor: "info.main",
          mb: 3,
          mt: { xs: 3, sm: 0 },
        }}
      >
        <Typography>OrderSeq: {orderSeq}</Typography>
        <Typography>Total Price: {allTotalPrice}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {formattedOrderItem.map((item) => (
          <OrderCard key={item.itemId} orderItem={item} isAdmin={false} />
        ))}
      </Box>
    </Box>
  );
};

export default Index;
