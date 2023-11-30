import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteLocationFunction,
  updateLocationFunction,
} from "@/store/slices/locationSlice";
import { UpdateLocationOptions } from "@/types/location";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const locationDetails = () => {
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
        address: currentLocation.address,
      });
    }
  }, [currentLocation]);

  if (!currentLocation || !data) return null;

  const onSuccess = () => {
    router.back();
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
          label="Address"
          defaultValue={currentLocation.address}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, address: evt.target.value })}
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

export default locationDetails;
