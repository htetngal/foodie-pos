import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createLocationFunction } from "@/store/slices/locationSlice";
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

const defaultLocation = {
  name: "",
  street: "",
  township: "",
  city: "",
};

const NewLocation = ({ open, setOpen }: Props) => {
  const [location, setLocation] = useState(defaultLocation);
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.company.item?.id);

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New Location is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const onError = () => {
    dispatch(
      setOpenSnackbar({
        message: "Something Wrong",
        severity: "error",
        autohideDuration: 5000,
      })
    );
  };

  if (!companyId) return null;

  const handleCreateLocation = () => {
    dispatch(
      createLocationFunction({
        ...location,
        onSuccess,
        companyId,
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
        <DialogTitle>Create New Location</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, name: evt.target.value })
            }
          />
          <TextField
            label="Street"
            variant="outlined"
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, street: evt.target.value })
            }
          />
          <TextField
            label="Township"
            variant="outlined"
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, township: evt.target.value })
            }
          />
          <TextField
            label="City"
            variant="outlined"
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, city: evt.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ mr: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            disabled={!location.name}
            onClick={handleCreateLocation}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewLocation;
