import React from "react";
import { Box, Typography, TextField, makeStyles } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const Filter = (props) => {
  const handleStartDate = (e) => {
    props.setStartDate(e._d);
  };
  const handleEndDate = (e) => {
    props.setEndDate(e._d);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DateTimePicker
        style={{ marginRight: "2%" }}
        value={props.startDate}
        onChange={handleStartDate}
        placeholder="Ден/Месец/Година/Час"
        format="DD-MM-YYYY HH:mm"
      />

      <DateTimePicker
        value={props.endDate}
        onChange={handleEndDate}
        placeholder="Ден/Месец/Година/Час"
        format="DD-MM-YYYY HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
};

export default Filter;
