import React from "react";
import MaterialTable from "material-table";
import {
  ArrowUpward,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
} from "@material-ui/icons";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import SearchIcon from "@material-ui/icons/Search";
import Moment from "react-moment";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Box } from "@material-ui/core";
import numeral from "numeral";
const SavedEnergy = ({ data, flow }) => {
  // let kpd = 0;
  // if (data[0].DT2 !== "0" && data[0].DT4 !== "0" && data[0].DT8 !== "0") {
  //   kpd =
  //     (data[data.length - 1].P2 - data[0].P2) /
  //     ((data[data.length - 1].DT2 - data[0].DT2) * 3.6) /
  //     (((data[data.length - 1].P6 - data[0].P6) /
  //       ((data[data.length - 1].DT7 - data[0].DT7) / 1000)) *
  //       data[data.length - 1].P4 *
  //       10 *
  //       9.81);

  //   console.log(kpd);
  //   console.log(numeral(parseFloat(kpd)).format("0,00"));
  // }

  const newArr = data.map((el, index) => {
    if (el.DT2 === "0" || el.DT4 === "0" || el.DT8 === "0") {
      return {
        date: el.DT,
        save: 0,
      };
    } else {
      if (!data[index - 1]) {
        return {
          date: el.DT,
          save: 0,
        };
      } else {
        const kpd =
          (data[index].P2 - data[index - 1].P2) /
          ((data[index].DT2 - data[index - 1].DT2) * 3.6) /
          (((data[index].P6 - data[index - 1].P6) /
            ((data[index].DT7 - data[index - 1].DT7) / 1000)) *
            data[index].P4 *
            10 *
            9.81);

        //kpd value
        const parts = kpd.toString().split(".");

        if (parts[0] >= 1 && parts[0] <= 2) {
          return {
            date: el.DT,
            save: kpd,
          };
        } else
          return {
            date: el.DT,
            save: 0,
          };
      }
    }
  });
  console.log(newArr);
  return <Box></Box>;
};

export default SavedEnergy;
