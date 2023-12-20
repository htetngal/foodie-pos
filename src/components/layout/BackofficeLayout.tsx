import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

const BackofficeLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { init } = useAppSelector((state) => state.app);
  useEffect(() => {
    if (session && !init) dispatch(fetchData({}));
    if (!session) router.push("/backoffice");
  }, [session]);

  return (
    <Box>
      <Topbar />
      <Box sx={{ display: "flex", position: "relative", zIndex: 5, flex: 1 }}>
        <Box sx={{ display: { xs: "none", sm: "inherit" } }}>
          <Sidebar />
        </Box>

        <Box sx={{ p: 3, width: "100%", height: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
