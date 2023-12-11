import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonFunction,
  updateAddonFunction,
} from "@/store/slices/addonSlice";
import { UpdateAddonOptions } from "@/types/addon";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addonId = Number(router.query.id);
  const addons = useAppSelector((state) => state.addon.items);
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);
  const addon = addons.find((item) => item.id === addonId);

  const [data, setData] = useState<UpdateAddonOptions>();

  useEffect(() => {
    if (addon) {
      setData({
        id: addon.id,
        name: addon.name,
        price: addon.price,
        addonCategoryId: addon.addonCategoryId,
      });
    }
  }, [addon]);

  const onSuccess = () => {
    router.back();
  };
  if (!addon || !data) return null;

  const handleOnChange = (evt: SelectChangeEvent<number>) => {
    const selectedIds = evt.target.value as number;
    setData({ ...data, id: addon.id, addonCategoryId: selectedIds });
  };

  const handleUpdateAddon = () => {
    dispatch(updateAddonFunction({ ...data, onSuccess }));
  };
  const handleDeleteAddon = () => {
    dispatch(deleteAddonFunction({ id: data.id, onSuccess }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Name"
          defaultValue={addon.name}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />
        <TextField
          label="Price"
          defaultValue={addon.price}
          sx={{ m: "15px" }}
          onChange={(evt) =>
            setData({ ...data, price: Number(evt.target.value) })
          }
        />

        <FormControl fullWidth>
          <InputLabel>Addon Category</InputLabel>
          <Select
            value={data.addonCategoryId}
            label="Addon Category"
            onChange={handleOnChange}
            renderValue={(selectedAddonCategoryId) => {
              return (
                addonCategories.find(
                  (item) => item.id === selectedAddonCategoryId
                ) as AddonCategory
              ).name;
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 250,
                },
              },
            }}
          >
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onClick={handleUpdateAddon}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleDeleteAddon}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default AddonDetails;
