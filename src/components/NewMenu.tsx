import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewMenu } from "@/store/slices/menuSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { CreateNewMenuOptions } from "@/types/menu";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { config } from "../../utils/config";
import FileDropZone from "./FileDropZone";
import MultiSelect from "./MultiSelect";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultNewMenu = {
  name: "",
  price: 0,
  description: "",
  menuCategoryIds: [],
};

const NewMenuComponent = ({ open, setOpen }: Props) => {
  const [menu, setMenu] = useState<CreateNewMenuOptions>(defaultNewMenu);
  const [menuImg, setMenuImg] = useState<File>();
  const dispatch = useAppDispatch();
  const menus = useAppSelector((item) => item.menu.items);
  const menuCategory = useAppSelector((item) => item.menuCategory.items);

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New Menu is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleOnChange = (evt: SelectChangeEvent<number[]>) => {
    const selectedIds = evt.target.value as number[];
    setMenu({ ...menu, menuCategoryIds: selectedIds });
  };

  const onFileSelected = (files: File[]) => {
    setMenuImg(files[0]);
  };

  const handleCreateNewMenu = async () => {
    const newMenuPayload = { ...menu };
    if (menuImg) {
      const formData = new FormData();
      formData.append("files", menuImg);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });

      const { assetUrl } = await response.json();
      newMenuPayload.assetUrl = assetUrl;
    }
    dispatch(createNewMenu({ ...newMenuPayload, onSuccess }));
  };

  return (
    <Box>
      <Dialog open={open} onClose={onSuccess}>
        <DialogTitle textAlign={"center"}>Create New Menu</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mb: 2 }}
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, price: Number(evt.target.value) })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mb: 2 }}
            onChange={(evt) =>
              setMenu({ ...menu, description: evt.target.value })
            }
          />
          <MultiSelect
            testIds={menu.menuCategoryIds}
            handleOnChange={handleOnChange}
            categoryName={menuCategory}
            label="Menu"
          />
          <Box>
            <FileDropZone onFileSelected={onFileSelected} />
            {menuImg && (
              <Chip
                label={menuImg.name}
                onDelete={() => setMenuImg(undefined)}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ mr: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            disabled={!menu.name || !menu.menuCategoryIds}
            onClick={handleCreateNewMenu}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewMenuComponent;
