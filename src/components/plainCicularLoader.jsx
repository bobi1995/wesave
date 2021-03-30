import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const plainLoader = () => (
  <div style={{ width: "100%", textAlign: "center" }}>
    <CircularProgress
      size={150}
      style={{ textAlign: "center", marginTop: "15%" }}
    />
    <p style={{ textAlign: "center", marginTop: "3%" }}>
      Зареждане...Моля изчакай
    </p>
  </div>
);

export default plainLoader;
