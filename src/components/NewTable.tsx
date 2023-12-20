import { useAppDispatch } from "@/store/hooks";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { createTableFunction } from "@/store/slices/tableSlice";
import { CreateTableOptions } from "@/types/table";
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

const defaultTable: CreateTableOptions = {
  name: "",
  locationId: 0,
};

const NewTable = ({ open, setOpen }: Props) => {
  const [table, setTable] = useState(defaultTable);
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(false);
    dispatch(
      setOpenSnackbar({
        message: "New Table is created successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleCreateTable = () => {
    const selectedlocationId = Number(
      localStorage.getItem("selectedLocationId")
    );
    dispatch(
      createTableFunction({
        ...table,
        locationId: selectedlocationId,
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
        <DialogTitle>Create New Table</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            autoFocus
            sx={{ width: "100%", mt: "10px" }}
            onChange={(evt) => setTable({ ...table, name: evt.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ mr: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            variant="contained"
            disabled={!table.name}
            onClick={handleCreateTable}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewTable;
