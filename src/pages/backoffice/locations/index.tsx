import ItemCard from "@/components/ItemCard";
import NewLocation from "@/components/NewLocation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/locationSlice";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Locations = () => {
  const { items: locations, selectedlocation } = useAppSelector(
    (state) => state.location
  );
  const [open, setopen] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Button onClick={() => setopen(true)}>Create New Location</Button>
      <Box sx={{ display: "flex" }}>
        {locations.map((item) => (
          // <Link
          //   href={`/backoffice/locations/${item.id}`}
          //   key={item.id}
          //   style={{ textDecoration: "none" }}
          // >
          <ItemCard
            icon={<PlaceIcon />}
            key={item.id}
            name={item.name}
            isAvailable={true}
            selected={item.id === selectedlocation?.id}
            clickFunction={() => dispatch(setSelectedLocation(item))}
          />
          // </Link>
        ))}
      </Box>

      <NewLocation open={open} setOpen={setopen} />
    </Box>
  );
};

export default Locations;
