import React from "react";
import Chart from "react-apexcharts";

export default function LineChart({data,type, width, height}) {
  const {options,series} = data
  return (
    <>
      <Chart
        options={options}
        series={series}
        type={type}
        width={width}
        height={height}
        // style={{width:380}}
      />
    </>
  );
}
