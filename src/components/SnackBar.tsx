import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetSnackbar } from "@/store/slices/snackbarSlice";
import { Alert, Box, Snackbar } from "@mui/material";

const SnackBar = () => {
  const { open, message, autohideDuration, severity } = useAppSelector(
    (state) => state.snackbar
  );
  const dispatch = useAppDispatch();
  setTimeout(() => dispatch(resetSnackbar()), autohideDuration);
  return (
    <Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackBar;
