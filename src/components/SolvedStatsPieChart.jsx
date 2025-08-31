import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { nivoDarkTheme } from './nivo-theme'; 

const SolvedStatsPieChart = ({ data }) => (
  <div style={{ height: '100%', width: '100%' }}>
    <ResponsivePie
      data={data}
      colors={{ datum: 'data.color' }}
      margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#a3a3a3"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
      theme={nivoDarkTheme}
      enableSlicesLabels={true}
      isInteractive={true}
      legends={[]}
    />
  </div>
);

export default SolvedStatsPieChart;