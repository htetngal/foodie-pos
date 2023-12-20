import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategoryFunction,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuCategoryOptions } from "@/types/menuCategory";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuCategoryDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuCategoryId = Number(router.query.id);
  const menuCategories = useAppSelector((state) => state.menuCategory.items);
  const disabledLocationMenuCategories = useAppSelector(
    (state) => state.disabledLocationMenuCategory.items
  );
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );

  const [data, setData] = useState<UpdateMenuCategoryOptions>();

  useEffect(() => {
    if (menuCategory) {
      const isExistInDisabledLocationMenuCategory =
        disabledLocationMenuCategories.find(
          (item) =>
            item.locationId ===
              Number(localStorage.getItem("selectedLocationId")) &&
            item.menuCategoryId === menuCategory.id
        );

      setData({
        id: menuCategory.id,
        name: menuCategory.name,
        locationId: Number(localStorage.getItem("selectedLocationId")),
        isAvailable: isExistInDisabledLocationMenuCategory ? false : true,
      });
    }
  }, [menuCategory, disabledLocationMenuCategories]);

  if (!menuCategory || !data) return null;

  const onSuccess = () => {
    router.push("/backoffice/menu-categories");
    dispatch(
      setOpenSnackbar({
        message: "Menu-category is updated successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleUpdateMenuCategory = () => {
    dispatch(
      updateMenuCategory({
        ...data,
        onSuccess,
      })
    );
  };

  const handleDeleteMenuCategory = () => {
    dispatch(deleteMenuCategoryFunction({ id: data.id, onSuccess }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <TextField
          label="Name"
          defaultValue={menuCategory.name}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />
        <FormControlLabel
          control={
            <Switch
              defaultChecked={data.isAvailable}
              onChange={(evt, value) =>
                setData({ ...data, isAvailable: value })
              }
            />
          }
          label="Availvable"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleUpdateMenuCategory}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleDeleteMenuCategory}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default MenuCategoryDetails;
