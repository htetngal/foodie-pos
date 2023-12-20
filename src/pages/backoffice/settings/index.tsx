import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCompanyFunction } from "@/store/slices/companySlice";
import { setOpenSnackbar } from "@/store/slices/snackbarSlice";
import { UpdateCompanyOptions } from "@/types/company";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Settings = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const company = useAppSelector((state) => state.company.item);
  const [data, setData] = useState<UpdateCompanyOptions>();

  useEffect(() => {
    if (company) {
      setData({
        id: company.id,
        name: company.name,
        street: company.street,
        city: company.city,
        township: company.township,
      });
    }
  }, [company]);

  if (!company || !data) return null;

  const onSuccess = () => {
    router.push("/");
    dispatch(
      setOpenSnackbar({
        message: "Your Company Information is updated successfully",
        severity: "success",
        autohideDuration: 5000,
      })
    );
  };

  const handleUpdateCompany = () => {
    dispatch(updateCompanyFunction({ ...data, onSuccess }));
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Typography
          sx={{
            color: "primary.main",
            fontSize: { xs: 30, sm: 40 },
            textAlign: "center",
          }}
        >
          Update Company
        </Typography>

        <TextField
          label="Name"
          defaultValue={company.name}
          sx={{ mb: "15px", mt: "15px" }}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
        />
        <TextField
          label="Street"
          defaultValue={company.street}
          sx={{ mb: "15px" }}
          onChange={(evt) => setData({ ...data, street: evt.target.value })}
        />
        <TextField
          label="Township"
          defaultValue={company.township}
          sx={{ mb: "15px" }}
          onChange={(evt) => setData({ ...data, township: evt.target.value })}
        />
        <TextField
          label="City"
          defaultValue={company.city}
          sx={{ mb: "15px" }}
          onChange={(evt) => setData({ ...data, city: evt.target.value })}
        />
      </FormControl>
      <Button
        variant="contained"
        sx={{ mb: "20px" }}
        onClick={handleUpdateCompany}
      >
        Update
      </Button>

      {/* <FormControl fullWidth>
        <InputLabel>Locations</InputLabel>
        <Select value={locationId} label="Locations" onChange={handleChange}>
          {locations.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </Box>
  );
};

export default Settings;
