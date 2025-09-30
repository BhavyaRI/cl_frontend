import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { nivoDarkTheme } from "./nivo-theme"; 

const CustomTooltip = ({ id, value, indexValue }) => (
  <div
    style={{
      padding: "8px 12px",
      background: "#262626",
      border: "1px solid #404040",
      borderRadius: "3px",
      color: "#ffffff",
    }}
  >
    <strong>Rating:</strong> {indexValue}
    <br />
    <strong>Problems Solved:</strong> {value}
  </div>
);

function BarChartGraph({ problemGraph }) {
  const data = Object.entries(problemGraph).map(([rating, count]) => ({
    rating,
    count,
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["count"]}
        indexBy="rating"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        theme={nivoDarkTheme} 
        colors={{ scheme: "nivo" }}
        colorBy="indexValue"
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        tooltip={CustomTooltip}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Problem Rating",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Problems Solved",
          legendPosition: "middle",
          legendOffset: -50,
        }}
      />
    </div>
  );
}

export default BarChartGraph;