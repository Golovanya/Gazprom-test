import React, { useState, useEffect, useCallback, memo } from 'react';
import Header from './Header/Header';
import Chart from './Chart/Chart';
import AverageValue from './AverageValue/AverageValue';
import { Card } from '@consta/uikit/Card';
import { ISymbolsText, } from '../types/types';
import { mockData } from '../data/data';

interface CurrencyChartProps {
  data: typeof mockData; 
}                                                    // ТУТ ТОЖЕ ХОТЕЛ СДЕЛАТЬ ИТЕРФЕЙС MainDATA но он ошибку на него кидает


const CurrencyChart: React.FC<CurrencyChartProps> = ({ data }) => {                                           
  const [selectedCurrency, setSelectedCurrency] = useState('Курс доллара');
  const [averageValue, setAverageValue] = useState<number | null>(null);
  const CurrencySymbolsText:ISymbolsText = {
    '$': 'Курс доллара',
    '€': 'Курс евро',
    '¥': 'Курс юаня',
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(CurrencySymbolsText[event.value]);              // ПОЯВЛЯЕТСЯ ОШИБКА ЕСЛИ ПОСТАВИТЬ event.target.value
  };

  // Формирование данных для графика
  const filteredData = data.filter(
    (item) => item.indicator === selectedCurrency
  );
  let minValue = Math.min.apply(
    null,
    filteredData.map((d) => d.value)
  );
  let interval = minValue % 2 === 0 ? 3 : 2;
  const chartOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        fontWeight: 'bold',
      },
    },
    grid: {
      top: 20,
      bottom: 20,
      left: 50,
      right: 20,
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: filteredData.map((item) => item.month),
    },
    yAxis: {
      type: 'value',
      maxInterval: interval,
      minInterval: interval,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          dashOffset: 40,
        },
      },
      axisLabel: {
        formatter: function (value:number) {
          if (value > minValue) {
            return value;
          } else {
            return ' ';
          }
        },
      },
      min: minValue % 2 === 0 ? minValue : minValue - 1,
    },
    series: [
      {
        itemStyle: {
          color: '#F38B00',
        },
        showSymbol: false,
        name: selectedCurrency,
        type: 'line',
        data: filteredData.map((d) => d.value),
      },
    ],
  };

  // Вычисление среднего значения за период
  const calculateAverage = useCallback(() => {
    const total = filteredData.reduce((acc, curr) => acc + curr.value, 0);
    const average = total / filteredData.length;
    setAverageValue(average);
  }, [filteredData]);

  useEffect(() => {
    calculateAverage();
  }, [selectedCurrency, data, calculateAverage]);

  return (
    <Card form="round" border className="app-card">   
      <Header selectedCurrency={selectedCurrency} handleChange={handleChange} />
        <div className="body-chart">
        <Chart chartOption={chartOption} />
        <AverageValue averageValue={averageValue} />
      </div>
    </Card>
  );
};

export const AppCard = memo(CurrencyChart);
