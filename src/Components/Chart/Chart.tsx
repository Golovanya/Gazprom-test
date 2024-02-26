import React from 'react';
import { ReactECharts } from '../../Echarts/ReactECharts'

interface ChartProps {
  chartOption: any
}

const Chart: React.FC<ChartProps> = ({ chartOption }) => {
  return (
    <div style={{ width: '940px', height: '285px',  }}>
      <ReactECharts
        option={chartOption}
        theme="light"
        loading={false}
       
      />
    </div>
  );
};

export default Chart;