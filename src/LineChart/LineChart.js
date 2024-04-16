import React from "react";
import Chart from "react-apexcharts";

export default function LineChart({data,type}) {
  const {options,series} = data
  return (
    <>
      <Chart
        options={options}
        series={series}
        type={type}
        style={{width:380}}
      />
    </>
  );
}
