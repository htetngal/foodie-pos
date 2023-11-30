import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteTableFunction,
  updateTableFunction,
} from "@/store/slices/tableSlice";
import { UpdateTableOptions } from "@/types/table";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const tableDetails = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tableId = Number(router.query.id);
  const tables = useAppSelector((state) => state.table.items);

  const currentTable = tables.find((item) => item.id === tableId);

  const [data, setData] = useState<UpdateTableOptions>();

  useEffect(() => {
    if (currentTable) {
      setData({
        id: currentTable.id,
        name: currentTable.name,
        locationId: currentTable.locationId,
      });
    }
  }, [currentTable]);

  if (!currentTable || !data) return null;

  const onSuccess = () => {
    router.back();
  };

  const handleUpdateTable = () => {
    dispatch(updateTableFunction({ ...data, onSuccess }));
  };
  const handleDeleteTable = () => {
    dispatch(deleteTableFunction({ ...data, onSuccess }));
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
          defaultValue={currentTable.name}
          sx={{ m: "15px" }}
          onChange={(evt) => setData({ ...data, name: evt.target.value })}
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
          onClick={handleUpdateTable}
        >
          Update
        </Button>
        <Button
          variant="contained"
          sx={{ m: "20px" }}
          onClick={handleDeleteTable}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default tableDetails;
