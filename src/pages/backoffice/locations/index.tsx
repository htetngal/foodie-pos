import ItemCard from "@/components/ItemCard";
import NewLocation from "@/components/NewLocation";
import { useAppSelector } from "@/store/hooks";
import PlaceIcon from "@mui/icons-material/Place";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Locations = () => {
  const locations = useAppSelector((state) => state.location.items);
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Button onClick={() => setopen(true)}>Create New Location</Button>
      <Box sx={{ display: "flex" }}>
        {locations.map((item) => (
          <Link
            href={`/backoffice/locations/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <ItemCard
              icon={<PlaceIcon></PlaceIcon>}
              name={item.name}
              isAvailable={true}
            />
          </Link>
        ))}
      </Box>

      <NewLocation open={open} setOpen={setopen} />
    </Box>
  );
};

export default Locations;
