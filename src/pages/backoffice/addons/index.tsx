import ItemCard from "@/components/ItemCard";
import NewAddon from "@/components/NewAddon";
import { useAppSelector } from "@/store/hooks";
import IsoIcon from "@mui/icons-material/Iso";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Addons = () => {
  const addons = useAppSelector((state) => state.addon.items);
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setopen(true)}>
        Create New Addon
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addons.map((item) => (
          <Link
            href={`/backoffice/addons/${item.id}`}
            style={{ textDecoration: "none" }}
            key={item.id}
          >
            <ItemCard icon={<IsoIcon />} name={item.name} isAvailable />
          </Link>
        ))}
      </Box>
      <NewAddon open={open} setOpen={setopen}></NewAddon>
    </Box>
  );
};

export default Addons;
