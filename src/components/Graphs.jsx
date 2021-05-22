import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { address } from "../globals/address";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles({
  chart: {
    width: "45%",
    margin: "0, auto",
    backgroundColor: "white",
    borderRadius: "25px",
    border: "1px solid lightgray",
  },
  charteSection: {
    width: "100%",
    margin: "0, auto",
    display: "flex",
    justifyContent: "space-around",
  },
});
const Graphs = ({ results }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  let dataKpd = [];
  let dataSaving = [];

  if (results.length > 0) {
    dataKpd = {
      labels: results.map((el) => el.DT),
      datasets: [
        {
          label: "КПД %",
          data: results.map((el) => (1 / el.kpd) * 100),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    dataSaving = {
      labels: results.map((el) => el.DT),
      datasets: [
        {
          label: "Спестяване",
          data: results.map((el) => el.Saving),
          fill: true,
          borderColor: "#228B22",
        },
        {
          label: "Цел",
          data: results.map((el) => el.target),
          borderColor: "#742774",
        },
      ],
    };
  }

  return (
    <Box>
      {results ? (
        <Box className={classes.charteSection}>
          <Box className={classes.chart}>
            <Line data={dataKpd} />
          </Box>
          <Box className={classes.chart}>
            <Line data={dataSaving} />
          </Box>
        </Box>
      ) : (
        "No res"
      )}
    </Box>
  );
};

export default Graphs;
