import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { nivoDarkTheme } from "./nivo-theme"; 

const formatDateDDMMYYYY = (value) => {
  let d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const CustomTooltip = ({ point }) => {
  const rawX = point?.data?.x ?? point?.data?.xFormatted;
  const dateStr = formatDateDDMMYYYY(rawX);
  const rating = point?.data?.y ?? point?.data?.yFormatted;

  return (
    <div
      style={{
        padding: "6px 8px",
        background: "#262626",
        border: "1px solid #404040",
        borderRadius: 4,
        fontSize: 12,
        color: "#fff",
      }}
    >
      <div><strong>Date:</strong> {dateStr}</div>
      <div><strong>Rating:</strong> {rating}</div>
    </div>
  );
};

function RatingGraph({ data }) {
  if (!data || data.length === 0) {
    return <div style={{ height: '100%', width: "100%" }}>Loading data...</div>;
  }

  const chartData = [
    {
      id: "Rating",
      data: data.map((item) => ({
        x: new Date(item.ratingUpdateTimeSeconds * 1000),
        y: item.newRating,
      })),
    },
  ];

  const getAxisConfig = () => {
    const dates = data.map((d) => d.ratingUpdateTimeSeconds * 1000);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const diffYears = (maxDate - minDate) / (1000 * 60 * 60 * 24 * 365);

    if (diffYears > 10) return { format: "%Y", tickValues: "every 2 years" };
    if (diffYears > 5) return { format: "%Y", tickValues: "every 1 year" };
    if (diffYears > 1) return { format: "%b %Y", tickValues: "every 6 months" };
    return { format: "%b %Y", tickValues: "every 2 months" };
  };

  const { format, tickValues } = getAxisConfig();

  return (
    <div style={{ height: '100%', width: "100%" }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 50, bottom: 70, left: 70 }}
        theme={nivoDarkTheme} 
        xScale={{ type: "time", format: "native", precision: "day" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        curve="monotoneX"
        tooltip={({ point }) => <CustomTooltip point={point} />}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "Date",
          legendOffset: 60,
          legendPosition: "middle",
          format: format,
          tickValues: tickValues,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Rating",
          legendOffset: -60,
          legendPosition: "middle",
        }}
        lineWidth={2}
        colors={["#6366f1"]} 
        pointSize={6}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
      />
    </div>
  );
}

export default RatingGraph;