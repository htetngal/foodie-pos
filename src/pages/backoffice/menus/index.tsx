import MenuCard from "@/components/MenuCard";
import NewMenuComponent from "@/components/NewMenu";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menus = () => {
  const menus = useAppSelector((state) => state.menu.items);
  const disabledLocationMenus = useAppSelector(
    (state) => state.disabledLocationMenu.items
  );
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={() => setopen(true)}>
          Create New Menu
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 3,
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {menus.map((item) => {
          const isExit = disabledLocationMenus.find(
            (disabledLocationMenu) =>
              disabledLocationMenu.locationId ===
              Number(
                localStorage.getItem("selectedLocationId") &&
                  disabledLocationMenu.menuId === item.id
              )
          );

          const isAvailable = isExit ? false : true;
          return (
            <MenuCard
              href={`/backoffice/menus/${item.id}`}
              key={item.id}
              menu={item}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
      <NewMenuComponent open={open} setOpen={setopen} />
    </Box>
  );
};

export default Menus;
