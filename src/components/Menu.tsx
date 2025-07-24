import React from "react";
import {
  Drawer,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DrawIcon from "@mui/icons-material/Draw";
import GetAppIcon from "@mui/icons-material/GetApp";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TableViewIcon from "@mui/icons-material/TableView";
import { useDrawStore } from "../stores/drawStore";
import { useOpenMenu } from "stores/menuStore";
import { usePolygonListStore } from "stores/mapStore";
import { downloadGeoJSON } from "helpers/exportFile";
import { useLoadUrlStore, useSearchStore } from "stores/urlStore";
import { MenuListType } from "helpers/models/menuModel";
import { useShowTableStore } from "stores/tableStore";

function Menu() {
  const openMenu = useOpenMenu((state) => state.openMenu);
  const setOpenMenu = useOpenMenu((state) => state.setOpenMenu);
  const drawPolygon = useDrawStore((state) => state.drawPolygon);
  const setDrawPolygon = useDrawStore((state) => state.setDrawPolygon);
  const polygonList = usePolygonListStore((state) => state.polygonList);
  const setShowSearch = useSearchStore((state) => state.setShowSearch);
  const setLoadUrl = useLoadUrlStore((state) => state.setLoadUrl);
  const setShowTable = useShowTableStore((state) => state.setShowTable);

  const menuList: MenuListType[] = [
    {
      icon: <SearchIcon color="primary" />,
      title: "Search Loaction",
      description: "Search coordinates or places",
      onClick: () => {
        setShowSearch(true);
      },
    },
    {
      icon: <DrawIcon color={!drawPolygon ? "primary" : "error"} />,
      title: "Draw Polygon",
      description: "Draw shapes on map",
      onClick: () => {
        setDrawPolygon(!drawPolygon);
      },
    },
    {
      icon: <GetAppIcon color="primary" />,
      title: "Export to GeoJSON",
      description: "Download current data",
      onClick: () => {
        downloadGeoJSON(polygonList);
      },
    },
    {
      icon: <CloudDownloadIcon color="primary" />,
      title: "Load GeoJSON from URL",
      description: "Import external data",
      onClick: () => {
        setLoadUrl(true);
      },
    },
    {
      icon: <TableViewIcon color="primary" />,
      title: "View Data Table",
      description: "Open table in dialog",
      onClick: () => {
        setShowTable(true);
      },
    },
  ];
  return (
    <>
      <AppBar position="absolute" color="inherit" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MenuIcon />
          </IconButton>
          <Box width={32} />
          <Typography variant="h4">DHI Geomap</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="persistent"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ zIndex: 1200 }}
      >
        <Box width={250} height={64}></Box>
        <List>
          {menuList.map((el) => (
            <ListItem key={el.title} disablePadding>
              <ListItemButton onClick={el.onClick}>
                <ListItemIcon color="primary">{el.icon}</ListItemIcon>
                <ListItemText primary={el.title} secondary={el.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Menu;
