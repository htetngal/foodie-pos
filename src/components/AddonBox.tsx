import { useAppSelector } from "@/store/hooks";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Addon } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  addonCategoryId: number;
  selectedAddons: Addon[];
  setSelectedAddons: Dispatch<SetStateAction<Addon[]>>;
}

const AddonBox = ({
  addonCategoryId,
  selectedAddons,
  setSelectedAddons,
}: Props) => {
  const addonCategory = useAppSelector(
    (state) => state.addonCatrgory.items
  ).find((item) => item.id === addonCategoryId);
  const addons = useAppSelector((state) => state.addon.items).filter(
    (item) => item.addonCategoryId === addonCategoryId
  );

  if (!addonCategory) return null;
  return (
    <Box>
      {addons.map((addon) => (
        <Box
          key={addon.id}
          sx={{
            display: "flex",
            alignitems: "center",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          <FormControlLabel
            control={
              addonCategory.isRequired ? (
                <Radio
                  checked={
                    selectedAddons.find((item) => item.id === addon.id)
                      ? true
                      : false
                  }
                  onChange={() => {
                    const addonIds = addons.map((item) => item.id);
                    const others = selectedAddons.filter(
                      (selectedAddon) => !addonIds.includes(selectedAddon.id)
                    );
                    setSelectedAddons([...others, addon]);
                  }}
                />
              ) : (
                <Checkbox
                  checked={
                    selectedAddons.find((item) => item.id === addon.id)
                      ? true
                      : false
                  }
                  onChange={(evt, value) => {
                    if (value) {
                      setSelectedAddons([...selectedAddons, addon]);
                    } else {
                      const finalSelectedAddons = selectedAddons.filter(
                        (selectedAddon) => selectedAddon.id != addon.id
                      );

                      setSelectedAddons(finalSelectedAddons);
                    }
                  }}
                />
              )
            }
            label={addon.name}
          />

          <Typography>{addon.price}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default AddonBox;
