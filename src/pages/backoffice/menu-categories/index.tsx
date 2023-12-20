import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "@/components/NewMenuCategory";
import { useAppSelector } from "@/store/hooks";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const MenuCategories = () => {
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const disabledLocationMenuCategories = useAppSelector(
    (state) => state.disabledLocationMenuCategory.items
  );
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => setopen(true)}>
          Create New Menu-Category
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {menuCategories.map((item) => {
          const isExist = disabledLocationMenuCategories.find(
            (disabledLocationMenuCategory) =>
              disabledLocationMenuCategory.locationId ===
                Number(localStorage.getItem("selectedLocationId")) &&
              disabledLocationMenuCategory.menuCategoryId === item.id
          );

          const isAvailable = isExist ? false : true;

          return (
            <Link
              href={`/backoffice/menu-categories/${item.id}`}
              style={{ textDecoration: "none" }}
              key={item.id}
            >
              <ItemCard
                icon={<FastfoodIcon />}
                name={item.name}
                isAvailable={isAvailable}
              ></ItemCard>
            </Link>
          );
        })}
        <NewMenuCategory open={open} setOpen={setopen}></NewMenuCategory>
      </Box>
    </Box>
  );
};

export default MenuCategories;
