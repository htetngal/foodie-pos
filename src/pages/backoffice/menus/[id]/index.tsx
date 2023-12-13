import MultiSelect from "@/components/MultiSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuFunction } from "@/store/slices/menuSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateMenuOptions } from "@/types/menu";
import {
  Box,
  Button,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { config } from "../../../../../utils/config";

const MenuDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const menuId = Number(router.query.id);
  const menuCategory = useAppSelector((state) => state.menuCategory.items);
  const menus = useAppSelector((state) => state.menu.items);
  const menuCategoryMenus = useAppSelector(
    (state) => state.menuCategoryMenu.items
  );
  const disabledLocationMenus = useAppSelector(
    (state) => state.disabledLocationMenu.items
  );

  const menu = menus.find((item) => item.id === menuId);

  const currentMenuCategoryMenus = menuCategoryMenus.filter(
    (item) => item.menuId === menuId
  );

  const menuCategoryIds = currentMenuCategoryMenus.map(
    (item) => item.menuCategoryId
  );

  const [data, setData] = useState<UpdateMenuOptions>();

  useEffect(() => {
    if (menu) {
      const isExist = disabledLocationMenus.find(
        (disabledLocationMenu) =>
          disabledLocationMenu.locationId ===
            Number(localStorage.getItem("selectedLocationId")) &&
          disabledLocationMenu.menuId === menu.id
      );

      setData({
        ...menu,
        menuCategoryIds,
        isAvailable: isExist ? false : true,
        locationId: Number(localStorage.getItem("selectedLocationId")),
      });
    }
  }, [menu, disabledLocationMenus]);

  const onSuccess = () => {
    router.back();
    dispatch(
      setOpenSnackbar({
        message: "Menu is updated successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  if (!menu || !data) return null;

  const handleOnChangeImage = async (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;

    if (files) {
      const file = files[0];
      const formData = new FormData();
      formData.append("files", file);

      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });

      const { assetUrl } = await response.json();
      dispatch(updateMenuFunction({ ...data, assetUrl }));
    }
  };

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setData({ ...data, id: menu.id, menuCategoryIds: selectedIds });
  };

  const handleUpdateMenu = () => {
    dispatch(updateMenuFunction({ ...data, onSuccess }));
  };
  const handleDeleteMenu = () => {};

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={data.assetUrl || "/defaultmenu.png"}
            alt={"Menu Image"}
            width={200}
            height={150}
            style={{ borderRadius: 8 }}
          />
          <Button variant="outlined" sx={{ m: 2 }} component="label">
            Upload New Photo
            <input type="file" hidden onChange={handleOnChangeImage} />
          </Button>
        </Box>
        <TextField
          label="Name"
          defaultValue={menu.name}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />
        <TextField
          label="Price"
          defaultValue={menu.price}
          sx={{ m: "15px" }}
          onChange={(evt) =>
            setData({ ...data, price: Number(evt.target.value) })
          }
        />
        <TextField
          label="Description"
          defaultValue={menu.description}
          sx={{ m: "20px" }}
          onChange={(evt) =>
            setData({ ...data, description: evt.target.value })
          }
        />
        <MultiSelect
          testIds={data.menuCategoryIds}
          handleOnChange={handleOnChange}
          categoryName={menuCategory}
          label="Menu-Category"
        ></MultiSelect>
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
          onClick={handleUpdateMenu}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleDeleteMenu}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default MenuDetails;
