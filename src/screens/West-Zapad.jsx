import React, { useState, useEffect } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { address } from "../globals/address";
import Table from "./West-Zapad/Table";
import Filter from "../components/Filter";
import moment from "moment";
import Loader from "../components/plainCicularLoader";
import SavedEnergy from "../components/SavedEnergy";

const useStyles = makeStyles({});

const West = () => {
  const [results, setResults] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flow, setFlow] = useState(38, 19);

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
      <Box>
        <Filter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Button onClick={handleCalculate}>Изчисли</Button>
      </Box>
      {results.length > 0 && !loading ? (
        <Box>
          {/* <Graphs data={results} /> */}
          <SavedEnergy data={results} flow={flow} />
          <Table data={results} />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default West;
