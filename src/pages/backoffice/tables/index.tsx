import ItemCard from "@/components/ItemCard";
import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import Filter1Icon from "@mui/icons-material/Filter1";
import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const tables = () => {
  const tables = useAppSelector((state) => state.table.items);
  const [open, setOpen] = useState(false);

  const handlePrintQRCode = (assetUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.write(
      `<html><head><title>Print Image</title></head><body style="text-align: center;"><img src="${assetUrl}" onload="window.print();window.close()" /></body></html>`
    );
  };

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Create New Table</Button>
      <Box sx={{ display: "flex" }}>
        {tables.map((item) => (
          <Box key={item.id}>
            <Link
              href={`/backoffice/tables/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <ItemCard
                icon={<Filter1Icon />}
                name={item.name}
                isAvailable={true}
              />
            </Link>

            <Button
              variant="contained"
              onClick={() => handlePrintQRCode(item.assetUrl)}
            >
              Print QR
            </Button>
          </Box>
        ))}
        <NewTable open={open} setOpen={setOpen}></NewTable>
      </Box>
    </Box>
  );
};

export default tables;
