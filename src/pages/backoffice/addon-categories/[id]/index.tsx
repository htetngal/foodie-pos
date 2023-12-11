import MultiSelect from "@/components/MultiSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddonCategoryFunction } from "@/store/slices/addonCategorySlice";
import { UpdateAddonCategory } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addonCategoryId = Number(router.query.id);
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);
  const menus = useAppSelector((state) => state.menu.items);
  const menuAddonCategories = useAppSelector(
    (state) => state.menuAddonCategory.items
  );
  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );

  const currentMenuAddonCategories = menuAddonCategories.filter(
    (item) => item.addonCategoryId === addonCategoryId
  );

  const menuIds = currentMenuAddonCategories.map((item) => item.menuId);

  const [data, setData] = useState<UpdateAddonCategory>();

  useEffect(() => {
    if (addonCategory) {
      setData({
        id: addonCategory.id,
        name: addonCategory.name,
        isRequired: addonCategory.isRequired,
        menuIds,
      });
    }
  }, [addonCategory]);

  if (!addonCategory || !data) return null;

  const onSuccess = () => {
    router.push("/backoffice/addon-categories");
  };

  const handleUpdateAddonCategory = () => {
    dispatch(updateAddonCategoryFunction({ ...data, onSuccess }));
  };

  const handleDeleteMenuCategory = () => {};

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setData({ ...data, menuIds: selectedIds });
  };
  return (
    <Box>
      <TextField
        fullWidth
        label="Name"
        defaultValue={data.name}
        sx={{ mb: "15px" }}
        onChange={(evt) => setData({ ...data, name: evt.target.value })}
      />

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={addonCategory.isRequired}
            onChange={(evt, value) => setData({ ...data, isRequired: value })}
          />
        }
        label="Required"
        sx={{ mb: 4 }}
      />

      <MultiSelect
        testIds={data.menuIds}
        handleOnChange={handleOnChange}
        categoryName={menus}
        label="Menu"
      />
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
          onClick={handleUpdateAddonCategory}
        >
          Update
        </Button>
        <Button variant="contained" sx={{ m: "20px" }}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default AddonCategoryDetails;
