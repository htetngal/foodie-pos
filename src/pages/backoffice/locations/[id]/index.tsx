import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteLocationFunction,
  updateLocationFunction,
} from "@/store/slices/locationSlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateLocationOptions } from "@/types/location";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const locationId = Number(router.query.id);
  const locations = useAppSelector((state) => state.location.items);

  const currentLocation = locations.find((item) => item.id === locationId);

  const [data, setData] = useState<UpdateLocationOptions>();

  useEffect(() => {
    if (currentLocation) {
      setData({
        id: currentLocation.id,
        name: currentLocation.name,
        street: currentLocation.street,
        township: currentLocation.township,
        city: currentLocation.city,
      });
    }
  }, [currentLocation]);

  if (!currentLocation || !data) return null;

  const onSuccess = () => {
    router.back();
    dispatch(
      setOpenSnackbar({
        message: "Location is updated successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleUpdateLocation = () => {
    dispatch(updateLocationFunction({ ...data, onSuccess }));
  };
  const handleDeleteLocation = () => {
    dispatch(deleteLocationFunction({ ...data, onSuccess }));
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
          defaultValue={currentLocation.name}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />

        <TextField
          label="Street"
          defaultValue={currentLocation.street}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, street: evt.target.value })}
        />

        <TextField
          label="City"
          defaultValue={currentLocation.city}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, city: evt.target.value })}
        />
        <TextField
          label="Township"
          defaultValue={currentLocation.township}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, township: evt.target.value })}
        />
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
          onClick={handleUpdateLocation}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleDeleteLocation}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default LocationDetails;
