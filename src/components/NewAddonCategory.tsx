import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewAddonCategory } from "@/store/slices/addonCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { CreateAddonCategoryOptions } from "@/types/addonCategory";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import MultiSelect from "./MultiSelect";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultAddonCategory = {
  name: "",
  isRequired: true,
  menuIds: [],
};

const NewAddonCategory = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const menus = useAppSelector((state) => state.menu.items);
  const [addonCategory, setaddonCategory] =
    useState<CreateAddonCategoryOptions>(defaultAddonCategory);

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New AddonCategory is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setaddonCategory({ ...addonCategory, menuIds: selectedIds });
  };
  const handleCreateNewAddonCategory = () => {
    dispatch(createNewAddonCategory({ ...addonCategory, onSuccess }));
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Addon Category</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <TextField
            label="Name"
            autoFocus
            variant="outlined"
            sx={{ mb: 2, width: "100%", mt: 2 }}
            onChange={(evt) => {
              setaddonCategory({ ...addonCategory, name: evt.target.value });
            }}
          />

          <MultiSelect
            testIds={addonCategory.menuIds}
            handleOnChange={handleOnChange}
            categoryName={menus}
            label="Menu"
          />

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={addonCategory.isRequired}
                onChange={(evt, value) =>
                  setaddonCategory({
                    ...addonCategory,
                    isRequired: value,
                  })
                }
              />
            }
            label="Required"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            disabled={!addonCategory.name || !addonCategory.menuIds}
            onClick={handleCreateNewAddonCategory}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewAddonCategory;
