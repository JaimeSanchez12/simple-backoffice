import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Colors, DrawerWidth } from "../styles/theme";
import AppBar from "./AppBar";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import GroupsIcon from "@mui/icons-material/Groups";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavListItem = ({ selected, icon, text, handleNavbarItemClicked }) => {
  return (
    <ListItemButton
      onClick={() => handleNavbarItemClicked(text)}
      sx={{
        ...(selected && {
          background: Colors.white,
          borderRadius: 2,
          fontWeight: "bold",
          color: Colors.black,
        }),
      }}
    >
      <ListItemIcon sx={{ color: selected && Colors.primary }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default function NavDrawer({ open, setOpen }) {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState("");
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (item) => {
    setOpen(false);
  };

  const handleNavbarItemClicked = (item) => {
    setSelectedItem(item);
    navigate(item);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen}></AppBar>
      <Drawer
        sx={{
          width: DrawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DrawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {open && (
            <Typography
              fontWeight={"bold"}
              color={Colors.black}
              variant="h6"
              noWrap
              component="div"
            >
              Admin Dashboard
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <NavListItem
              text={"Dashboard"}
              icon={<DashboardIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Dashboard")}
            />
          </ListItem>
          <ListItem disablePadding>
            <NavListItem
              text={"Products"}
              icon={<ReceiptIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Products")}
            />
          </ListItem>
          <ListItem disablePadding>
            <NavListItem
              text={"Messages"}
              icon={<MailIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Messages")}
            />
          </ListItem>
          <ListItem disablePadding>
            <NavListItem
              text={"Users"}
              icon={<GroupsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Users")}
            />
          </ListItem>
          <ListItem disablePadding>
            <NavListItem
              text={"Settings"}
              icon={<SettingsIcon />}
              handleNavbarItemClicked={handleNavbarItemClicked}
              selected={selectedItem.includes("Settings")}
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
