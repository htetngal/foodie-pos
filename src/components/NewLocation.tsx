import { useAppDispatch } from "@/store/hooks";
import { createLocationFunction } from "@/store/slices/locationSlice";
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
  address: "",
  companyId: 0,
};

const NewLocation = ({ open, setOpen }: Props) => {
  const [location, setLocation] = useState(defaultLocation);
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
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
            label="Address"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) =>
              setLocation({ ...location, address: evt.target.value })
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
