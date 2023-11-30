import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BackofficeLayout from "./BackofficeLayout";
import OrderAppLayout from "./OrderAppLayout";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter().pathname;

  if (router.includes("/backoffice")) {
    return (
      <Box sx={{ height: "100%" }}>
        <BackofficeLayout>{children}</BackofficeLayout>
      </Box>
    );
  } else if (router.includes("/order")) {
    return (
      <Box sx={{ height: "100%" }}>
        <OrderAppLayout>{children}</OrderAppLayout>
      </Box>
    );
  }

  return <Box>{children}</Box>;
};

export default Layout;
