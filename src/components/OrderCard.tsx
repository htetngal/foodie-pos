import { useAppSelector } from "@/store/hooks";
import { OrderItem } from "@/types/order";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ORDERSTATUS } from "@prisma/client";

interface Props {
  orderItem: OrderItem;
  isAdmin: boolean;
  handleOrderStatus?: (itemId: string, orderStatus: ORDERSTATUS) => void;
}

const OrderCard = ({ orderItem, isAdmin, handleOrderStatus }: Props) => {
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);

  return (
    <Box>
      <Box>
        <Card sx={{ width: 300, height: 300, boxShadow: 5, m: 2 }}>
          <CardHeader
            sx={{
              bgcolor: "primary.main",
              height: "20%",
            }}
            title={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "info.main",
                }}
              >
                <Typography>{orderItem.menu.name}</Typography>
                <Typography>{orderItem.table.name}</Typography>
              </Box>
            }
          />

          <CardContent sx={{ height: "80%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "80%",
                overflowY: "scroll",
              }}
            >
              <Box>
                {orderItem.orderAddons.map((orderAddon) => {
                  return (
                    <Box key={orderAddon.addonCategoryId}>
                      <Typography sx={{ fontStyle: "italic" }}>
                        {
                          addonCategories.find(
                            (addonCategory) =>
                              addonCategory.id === orderAddon.addonCategoryId
                          )?.name
                        }
                      </Typography>
                      {orderAddon.addons.map((addon) => {
                        return (
                          <Box sx={{ pl: 2 }} key={addon.id}>
                            <Typography>{addon.name}</Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Divider sx={{ m: 1 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                alignItems: "center",
              }}
            >
              <Typography>Status</Typography>
              {isAdmin && handleOrderStatus ? (
                <Select
                  value={orderItem.status}
                  sx={{ height: 30 }}
                  onChange={(evt) =>
                    handleOrderStatus(
                      orderItem.itemId,
                      evt.target.value as ORDERSTATUS
                    )
                  }
                >
                  <MenuItem value={ORDERSTATUS.PENDING}>
                    {ORDERSTATUS.PENDING}
                  </MenuItem>
                  <MenuItem value={ORDERSTATUS.COOKING}>
                    {ORDERSTATUS.COOKING}
                  </MenuItem>
                  <MenuItem value={ORDERSTATUS.COMPLETE}>
                    {ORDERSTATUS.COMPLETE}
                  </MenuItem>
                </Select>
              ) : (
                <Typography>{orderItem.status}</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default OrderCard;
