import { useAppDispatch } from "@/store/hooks";
import { createLocationFunction } from "@/store/slices/locationSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { CreateLocationOptions } from "@/types/location";
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

const defaultLocation: CreateLocationOptions = {
  name: "",
  street: "",
  township: "",
  city: "",
  companyId: 0,
};

const NewLocation = ({ open, setOpen }: Props) => {
  const [location, setLocation] = useState(defaultLocation);
  const dispatch = useAppDispatch();

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

  const handleCreateLocation = () => {
    dispatch(
      createLocationFunction({
        ...location,
        onSuccess,
      })
    );
  };

  return (
    <Box>
      <Dialog open={open} onClose={onSuccess}>
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
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, street: evt.target.value })
            }
          />
          <TextField
            label="Township"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, township: evt.target.value })
            }
          />
          <TextField
            label="City"
            variant="outlined"
            autoFocus
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
