import { useAppSelector } from "@/store/hooks";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const locations = useAppSelector((state) => state.location.items);
  const [locationId, setLocationId] = useState<number>();

  const handleChange = (event: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocationId", String(event.target.value));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Locations</InputLabel>
        <Select value={locationId} label="Locations" onChange={handleChange}>
          {locations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Settings;
