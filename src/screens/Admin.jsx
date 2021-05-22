import React, { useState, useEffect } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { address } from "../globals/address";
import { mainGreen } from "../globals/colors";
import axios from "axios";
import RecordsPanel from "./Admin/RecordsPanel";
import Loader from "../components/plainCicularLoader";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  heading: {
    fontSize: 35,
    color: mainGreen,
  },
});

const Admin = () => {
  const classes = useStyles();
  const [west, setWest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${address}/admin/west`)
      .then((response) => {
        response.data.shift();
        setWest(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className={classes.mainContainer}>
          <Box style={{ width: "45%", textAlign: "center" }}>
            <Typography className={classes.heading}>Запад</Typography>
            {west.map((el) => (
              <RecordsPanel
                key={el.mesec + el.godina}
                data={el}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
          </Box>
          <Box style={{ width: "45%", textAlign: "center" }}>
            <Typography className={classes.heading}>Изток</Typography>
            <Typography
              style={{
                fontSize: 30,
                marginTop: "35%",
              }}
            >
              Не е достъпна
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Admin;
