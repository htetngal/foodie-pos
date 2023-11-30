import { Box, Chip, Typography } from "@mui/material";
import { Addon, AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import AddonBox from "./AddonBox";

interface Props {
  addonCategories: AddonCategory[];
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonCategoryBox = ({
  addonCategories,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  return (
    <Box
      sx={{
        width: "300px",
      }}
    >
      {addonCategories.map((item) => (
        <Box
          key={item.id}
          sx={{
            borderRadius: 3,
            bgcolor: "info.main",
            mb: 3,
            p: 5,
          }}
        >
          <Box
            sx={{
              borderBottom: "2px solid #4C4C6D ",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Typography>{item.name}</Typography>
            <Chip label={item.isRequired ? "Require" : "Optional"} />
          </Box>
          <AddonBox
            addonCategoryId={item.id}
            selectedAddons={selectedAddons}
            setSelectedAddons={setSelectedAddons}
          ></AddonBox>
        </Box>
      ))}
    </Box>
  );
};

export default AddonCategoryBox;
