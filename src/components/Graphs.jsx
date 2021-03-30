import React from "react";
import { Box, Typography, TextField, makeStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const Graphs = (props) => {
  props.data.map((el) => console.log(el));

  const data = {
    labels: props.data.map((el) => el.DT),
    datasets: [
      {
        label: "First dataset",
        data: props.data.map((el) => el.P1),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: props.data.map((el) => el.P2),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <Box
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
      }}
    >
      <Box style={{ width: "45%" }}>
        <Line data={data} />
      </Box>
      <Box style={{ width: "45%" }}>
        <Line data={data} />
      </Box>
    </Box>
  );
};

export default Graphs;
