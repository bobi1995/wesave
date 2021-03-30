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

const TableCombined = ({ data }) => {
  return (
    <MaterialTable
      title="Таблица с измерени стойности за периода"
      icons={{
        Filter: React.forwardRef((props, ref) => <SearchIcon ref={ref} />),
        Search: React.forwardRef((props, ref) => <SearchIcon ref={ref} />),
        ResetSearch: React.forwardRef((props, ref) => (
          <RotateLeftIcon ref={ref} />
        )),
        SortArrow: ArrowUpward,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
      }}
      columns={[
        {
          title: "Час на измерването",
          field: "DT",
          render: (rowData) => (
            <Moment format="DD MMM YYYY HH:mm">{rowData.DT}</Moment>
          ),
          cellStyle: {
            backgroundColor: "#039be5",
            color: "#FFF",
            width: "15%",
            textAlign: "center",
          },
          headerStyle: {
            backgroundColor: "#039be5",
          },
        },
        {
          title: "Електромер Изток",
          field: "P1",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Електромер Запад",
          field: "P2",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Налягане Изток",
          field: "P3",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Налягане Запад",
          field: "P4",
          cellStyle: { textAlign: "center" },
        },

        {
          title: "Дебитомер Изток",
          field: "P5",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Дебитомер Запад",
          field: "P6",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Стара Помпа Изток",
          field: "P7",
          render: (rowData) =>
            rowData.P7 === "1" ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon style={{ color: "red" }} />
            ),
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Стара Помпа Запад",
          field: "P8",
          render: (rowData) =>
            rowData.P8 === "1" ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <CancelIcon style={{ color: "red" }} />
            ),
          cellStyle: { textAlign: "center" },
        },
      ]}
      data={data}
      options={{
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
          textAlign: "center",
        },

        pageSize: 10,
        pageSizeOptions: [10, 20, 50],
        filtering: true,
        search: false,
        filtering: false,
      }}
    />
  );
};

export default TableCombined;
