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
import numeral from "numeral";

const TableZapad = ({ data }) => {
  return (
    <MaterialTable
      style={{ marginTop: "3%" }}
      title={
        <div>
          Данни за периода&nbsp;
          <b>
            <Moment format="DD MMM YYYY HH:mm">
              {data[data.length - 1].DT}
            </Moment>
          </b>
          &nbsp;-&nbsp;
          <b>
            <Moment format="DD MMM YYYY HH:mm">{data[0].DT}</Moment>
          </b>
        </div>
      }
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
          title: "Електромер (kW/h)",
          field: "P2",
          cellStyle: { textAlign: "center" },
          render: (rowData) => numeral(rowData.P2).format("0,00"),
        },
        {
          title: "Налягане (Bar)",
          field: "P4",
          cellStyle: { textAlign: "center" },
        },
        {
          title: "Дебитомер (m3)",
          field: "P6",
          cellStyle: { textAlign: "center" },
          render: (rowData) => numeral(rowData.P6).format("0,00"),
        },
        {
          title: "Стара Помпа",
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

export default TableZapad;
