import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  makeStyles,
  TextField,
} from "@material-ui/core";
import numeral from "numeral";
import { mainGreen } from "../../globals/colors";
import { address } from "../../globals/address";
import axios from "axios";
import { kpdStaraZapad } from "../../globals/constants";

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    marginTop: "5%",
    textAlign: "center",
    borderRadius: 5,
    padding: "1%",
  },

  dataContainer: {
    width: "100%",
    marginTop: "1%",
    textAlign: "center",
    justifyContent: "space-around",
    display: "flex",
  },
  btnStyle: {
    marginTop: "1%",
    backgroundColor: mainGreen,
    color: "white",
  },
});

const months = {
  1: "Януари",
  2: "Февруари",
  3: "Март",
  4: "Април",
  5: "Май",
  6: "Юни",
  7: "Юли",
  8: "Август",
  9: "Септември",
  10: "Октомври",
  11: "Ноември",
  12: "Декември",
};

const RecordsPanel = ({ data }) => {
  const classes = useStyles();
  const [debit, setDebit] = useState(
    parseFloat(data.debit_krai) - parseFloat(data.debit_nachalo)
  );
  const current = new Date().getMonth() + 1 === data.mesec;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSaveBtn = async () => {
    //GET LAST MONTH
    const records = await axios
      .get(
        `${address}/admin/west/count?selectedMonth=${data.mesec}&selectedYear=${data.godina}`
      )
      .then((response) => {
        return response.data[0].zapisa;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(records);
    // UPDATE WITH NEW DEBIT
    const updating = await axios
      .post(`${address}/admin/west/savedebit`, {
        startDate: `${data.godina}-${data.mesec}-01 00:00:00`,
        endDate: `${data.godina}-${data.mesec}-31 23:56:00`,
        step: Math.round(debit / records),
      })
      .then((response) => {
        return console.log("updated");
      })
      .catch((error) => {
        return console.log(error);
      });
    console.log("here2");

    //FETCH DATA
    const fetchData = await axios
      .get(
        `${address}/period?startDate=${data.godina}-${data.mesec}-01 00:00:00&endDate=${data.godina}-${data.mesec}-31 23:56:00`
      )
      .then((response) => {
        setResults(response.data);
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    console.log("here3");

    //CALCULATE KPD
    if (fetchData.length > 0) {
      const newArr = fetchData.map((el, index) => {
        if (el.DT2 === "0" || el.DT4 === "0" || el.DT8 === "0") {
          return {
            date: el.DT,
            kpdValue: 0,
            savings: 0,
          };
        } else {
          if (!fetchData[index - 1]) {
            return {
              date: el.DT,
              kpdValue: 0,
              savings: 0,
            };
          } else {
            const kpd =
              ((fetchData[index].P2 - fetchData[index - 1].P2) * 3600000) /
              (fetchData[index].DT2 - fetchData[index - 1].DT2) /
              (((fetchData[index].P6 - fetchData[index - 1].P6) *
                98100 *
                fetchData[index].P4) /
                (fetchData[index].DT7 - fetchData[index - 1].DT7));

            if (kpd >= 1 && kpd <= 2) {
              //savings in w/h
              const saving =
                ((kpdStaraZapad - kpd) *
                  (fetchData[index].P6 - fetchData[index - 1].P6) *
                  fetchData[index].P4 *
                  98100) /
                (fetchData[index].DT7 - fetchData[index - 1].DT7) /
                ((3600 * 1000) /
                  (fetchData[index].DT2 - fetchData[index - 1].DT2));

              return {
                date: el.DT,
                kpdValue: kpd,
                savings: saving,
              };
            } else
              return {
                date: el.DT,
                kpdValue: 0,
                savings: 0,
              };
          }
        }
      });
      console.log(newArr);
      newArr.map(
        async (el) =>
          await axios
            .post(`${address}/admin/west/savings`, {
              dt: el.date,
              saving: el.savings,
              kpd: el.kpdValue,
            })
            .then((response) => {
              setResults(response.data);
              setLoading(false);
              return response.data;
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            })
      );
    }
  };

  return (
    <Box
      className={classes.mainContainer}
      boxShadow={15}
      style={{ backgroundColor: current ? "#d2f8d2" : "white" }}
    >
      <Typography>
        {months[data.mesec]} - {data.godina}г. {current ? "(Текущ месец)" : ""}
      </Typography>
      <Box className={classes.dataContainer}>
        <TextField
          disabled
          label="Потребление"
          defaultValue={`${numeral(
            data.eketromer_zapad_krai - data.eketromer_zapad_nachalo
          ).format("0,0.00")} kW/h`}
          variant="outlined"
        />
        <TextField
          disabled
          label="Средно налягане"
          defaultValue={`${numeral(
            (parseFloat(data.nalqgane_zapad_nachalo) +
              parseFloat(data.nalqgane_zapad_krai)) /
              2
          ).format("0,0.00")} bar`}
          variant="outlined"
        />
        <TextField
          label="Дебит "
          defaultValue={current ? "---" : numeral(debit).format("0,0")}
          variant="outlined"
          disabled={current}
          onChange={(text) => setDebit(text.target.value)}
        />
      </Box>
      <Button
        className={classes.btnStyle}
        variant="contained"
        disabled={current}
        onClick={handleSaveBtn}
      >
        Запиши
      </Button>
    </Box>
  );
};

export default RecordsPanel;
