import OrderCard from "@/components/OrderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrderFunction } from "@/store/slices/orderSlice";
import { OrderItem } from "@/types/order";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import PendingIcon from "@mui/icons-material/Pending";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";
import { useEffect, useState } from "react";
import { formatOrderItem } from "../../../../utils/general";

const Orders = () => {
  const dispatch = useAppDispatch();
  const allOrders = useAppSelector((state) => state.order.items);
  const tables = useAppSelector((state) => state.table.items);
  const menus = useAppSelector((state) => state.menu.items);
  const addons = useAppSelector((state) => state.addon.items);
  const { selectedlocation } = useAppSelector((state) => state.location);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [value, setValue] = useState<ORDERSTATUS>(ORDERSTATUS.PENDING);

  const handleOrderStatus = (itemId: string, orderStatus: ORDERSTATUS) => {
    dispatch(updateOrderFunction({ itemId, orderStatus }));
  };
  useEffect(() => {
    if (allOrders.length) {
      const selectedLocationtableIds = tables
        .filter((table) => table.locationId === selectedlocation?.id)
        .map((item) => item.id);
      const selectedLocationOrders = allOrders.filter((order) =>
        selectedLocationtableIds.includes(order.tableId)
      );
      const formattedOrder = formatOrderItem(
        selectedLocationOrders,
        tables,
        menus,
        addons
      );
      const filteredOrderItems = formattedOrder.filter(
        (item) => item.status === value
      );
      setOrderItems(filteredOrderItems);
    }
  }, [allOrders, value]);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={(evt, newValue) => {
            setValue(newValue);
          }}
        >
          <ToggleButton value={ORDERSTATUS.PENDING}>
            <PendingIcon />
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COOKING}>
            <MicrowaveIcon />
          </ToggleButton>
          <ToggleButton value={ORDERSTATUS.COMPLETE}>
            <TaskAltIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {orderItems.map((orderItem) => {
          return (
            <OrderCard
              orderItem={orderItem}
              isAdmin={true}
              key={orderItem.itemId}
              handleOrderStatus={handleOrderStatus}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Orders;
