import ItemCard from "@/components/ItemCard";
import NewAddonCategory from "@/components/NewAddonCategory";
import { useAppSelector } from "@/store/hooks";
import IsoIcon from "@mui/icons-material/Iso";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const AddonCategories = () => {
  const addonCategories = useAppSelector((state) => state.addonCatrgory.items);
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => setopen(true)}>
          Create New Addon Category
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {addonCategories.map((item) => (
          <Link
            href={`/backoffice/addon-categories/${item.id}`}
            style={{ textDecoration: "none" }}
            key={item.id}
          >
            <ItemCard icon={<IsoIcon />} name={item.name} isAvailable />
          </Link>
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setopen} />
    </Box>
  );
};

export default AddonCategories;
