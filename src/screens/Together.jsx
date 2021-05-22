import React, { useState, useEffect } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { address } from "../globals/address";
import Table from "../components/TableCombined";
import Filter from "../components/Filter";
import moment from "moment";
import Loader from "../components/plainCicularLoader";

const useStyles = makeStyles({});
const Together = () => {
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flow, setFlow] = useState(38, 19);
  console.log();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${address}/`)
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleCalculate = () => {
    setLoading(true);
    console.log(`${address}/period?startDate=${startDate}&endDate=${endDate}`);
    axios
      .get(
        `${address}/period?startDate=${moment(startDate).format(
          "YYYY-MM-DD HH:mm"
        )}&endDate=${moment(endDate).format("YYYY-MM-DD HH:mm")}`
      )
      .then((response) => {
        console.log(response.data);

        setResults(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Box>
      <Box
        style={{
          justifyContent: "center",
          display: "flex",
          marginBottom: "3%",
        }}
      >
        <Filter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Button onClick={handleCalculate}>Изчисли</Button>
      </Box>
      {results.length > 0 ? (
        <Box>
          {/* <Graphs data={results} /> */}
          {/* <SavedEnergy data={results} flow={flow} /> */}
          <Table data={results} />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Together;
