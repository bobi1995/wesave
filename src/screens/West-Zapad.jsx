import React, { useState, useEffect } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import axios from "axios";
import { address } from "../globals/address";
import Table from "./West-Zapad/Table";
import Filter from "../components/Filter";
import moment from "moment";
import Loader from "../components/plainCicularLoader";
import Graphs from "../components/Graphs";

const useStyles = makeStyles({});

const West = () => {
  const [results, setResults] = useState([]);
  const [savingResults, setSavingResults] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

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

    axios
      .get(`${address}/admin/west/savings`)
      .then((response) => {
        setSavingResults(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  const handleCalculate = () => {
    setLoading(true);
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

    console.log(
      `${address}/west/savings/period?startDate=${moment(startDate).format(
        "YYYY-MM-DD HH:mm"
      )}&endDate=${moment(endDate).format("YYYY-MM-DD HH:mm")}`
    );

    axios
      .get(
        `${address}/west/savings/period?startDate=${moment(startDate).format(
          "YYYY-MM-DD HH:mm"
        )}&endDate=${moment(endDate).format("YYYY-MM-DD HH:mm")}`
      )
      .then((response) => {
        setSavingResults(response.data);
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
      {results.length > 0 && !loading ? (
        <Box>
          <Graphs results={savingResults} />
          <Table data={results} />
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default West;
