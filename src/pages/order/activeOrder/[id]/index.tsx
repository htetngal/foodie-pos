import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const orderSeq = router.query.id;
  const orderItems = useAppSelector((state) => state.order.items);
  const menus = useAppSelector((state) => state.menu.items);
  const addons = useAppSelector((state) => state.addon.items);
  const addonCategories = useAppSelector((state) => state.addonCatrgory);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
          borderRadius: 15,
          mx: 3,
          bgcolor: "info.main",
          mb: 3,
        }}
      >
        <Typography>OrderSeq: {orderSeq}</Typography>
        <Typography>Total Price: {orderSeq}</Typography>
      </Box>

      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          sx={{
            display: "flex",
            bgcolor: "primary.main",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Typography sx={{ color: "info.main" }}>Menu</Typography>
          <Typography sx={{ color: "info.main" }}>Table</Typography>
        </CardHeader>

        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            // key={addon.id}
          >
            <Typography>Hi</Typography>
            <Typography>2000</Typography>
          </Box>
          <Divider sx={{ m: 2 }} />
          <Typography textAlign={"right"} variant="h5">
            Total Price: 1200
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default index;
