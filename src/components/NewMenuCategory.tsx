import { useAppDispatch } from "@/store/hooks";
import { CreateMenuCategory } from "@/store/slices/menuCategorySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New Menu Category is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };
  const handleCreateNewMenuCategory = () => {
    const SelectedlocationId = localStorage.getItem("selectedLocationId");
    dispatch(
      CreateMenuCategory({
        name,
        locationId: Number(SelectedlocationId),
        onSuccess,
      })
    );
  };

  return (
    <Box>
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
        <DialogTitle>Create New Menu-Category</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) => setName(evt.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ mr: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            disabled={!name}
            onClick={handleCreateNewMenuCategory}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewMenuCategory;
