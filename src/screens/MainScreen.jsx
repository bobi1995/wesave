import React, { useState } from "react";
import { AppBar, Tab, Box, makeStyles } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import BuildIcon from "@material-ui/icons/Build";
import { mainGreen } from "../globals/colors";
//SCREENS
import Together from "./Together";
import West from "./West-Zapad";
import Admin from "./Admin";

const useStyles = makeStyles((theme) => ({}));

const MainScreen = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList
            style={{ backgroundColor: mainGreen }}
            variant="scrollable"
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Общо " value="1" icon={<SyncAltIcon />} />
            <Tab label="Помпа Запад" value="3" icon={<ArrowBackIcon />} />
            <Tab label="Помпа Изток" value="2" icon={<ArrowForwardIcon />} />
            <Tab label="Администратор" value="4" icon={<BuildIcon />} />
          </TabList>
        </AppBar>

        <Box>
          <TabPanel value="1">
            <Together />
          </TabPanel>
          <TabPanel value="2">
            <Box>2</Box>
          </TabPanel>
          <TabPanel value="3">
            <West />
          </TabPanel>
          <TabPanel value="4">
            <Admin />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default MainScreen;
