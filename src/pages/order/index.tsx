import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Tab, Tabs } from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const router = useRouter();
  const query = router.query;
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategory>();
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = () => {
    const validMenuIds = menuCategoryMenus
      .filter((item) => item.menuCategoryId === selectedMenuCategory?.id)
      .map((item) => item.menuId);
    const validMenus = menus.filter((item) => validMenuIds.includes(item.id));
    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return (
        <MenuCard key={item.id} menu={item} href={href} isAvailable={true} />
      );
    });
  };

  return (
    <Box sx={{}}>
      <Box sx={{ m: "10px" }}>
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "primary.main" } }}
          value={value}
          onChange={(evt, value) => {
            setValue(value);
          }}
          variant="scrollable"
          sx={{
            ".Mui-selected": {
              color: "primary.main",
              fontWeight: "bold",
            },
          }}
        >
          {menuCategories.map((item) => (
            <Tab
              key={item.id}
              label={item.name}
              onClick={() => setSelectedMenuCategory(item)}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
          mt: 3,
        }}
      >
        {renderMenus()}
      </Box>
    </Box>
  );
};

export default OrderApp;
