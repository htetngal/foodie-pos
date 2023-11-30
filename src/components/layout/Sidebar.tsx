import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const sidebarItems = [
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menu-categories",
  },
  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addon-categories",
  },
  {
    id: 5,
    label: "Addons",
    icon: <EggIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <Box>
      {session && (
        <Box sx={{ bgcolor: "primary.main", height: "100vh", width: 200 }}>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {sidebarItems.slice(0, 7).map((item) => (
              <Link
                href={item.route}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <ListItem sx={{ color: "secondary.main" }}>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </Link>
            ))}

            <Divider />
            {sidebarItems.slice(-1).map((item) => (
              <Link
                href={item.route}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <ListItem sx={{ color: "secondary.main" }}>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
