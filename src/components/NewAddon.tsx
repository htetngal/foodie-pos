import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonFunction } from "@/store/slices/addonSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { CreateAddonOptions } from "@/types/addon";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const initialState: CreateAddonOptions = {
  name: "",
  price: 0,
  isArchived: false,
  addonCategoryId: undefined,
};
const NewAddon = ({ open, setOpen }: Props) => {
  const [addon, setAddon] = useState(initialState);
  const dispatch = useAppDispatch();
  const addons = useAppSelector((state) => state.addon.items);
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New Addon is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleOnChange = (evt: SelectChangeEvent<number>) => {
    const selectedIds = evt.target.value as number;
    setAddon({ ...addon, addonCategoryId: selectedIds });
  };

  const handleCreateAddon = () => {
    dispatch(createAddonFunction({ ...addon, onSuccess }));
  };

  return (
    <Dialog
      open={open}
      onClose={onSuccess}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "500px", // Set your width here
          },
        },
      }}
    >
      <DialogTitle textAlign={"center"}>Create New Addon</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ width: "100%", my: 2 }}
          onChange={(evt) => setAddon({ ...addon, name: evt.target.value })}
        />

        <TextField
          label="Price"
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          onChange={(evt) =>
            setAddon({ ...addon, price: Number(evt.target.value) })
          }
        />

        <FormControl fullWidth>
          <InputLabel>Addon Category</InputLabel>
          <Select
            value={addon.addonCategoryId}
            label="Addon Category"
            onChange={handleOnChange}
            renderValue={(selectedAddonCategoryId) => {
              return (
                addonCategories.find(
                  (item) => item.id === selectedAddonCategoryId
                ) as AddonCategory
              ).name;
            }}
          >
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mr: 1, mb: 1 }}>
        <Button variant="contained" onClick={() => setOpen(false)}>
          CANCEL
        </Button>
        <Button
          variant="contained"
          disabled={!addon.name || !addon.addonCategoryId}
          onClick={handleCreateAddon}
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddon;
