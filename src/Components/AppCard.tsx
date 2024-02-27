import React, { useState, useEffect, useCallback, memo } from 'react';
import { Header } from './Header/Header';
import Chart from './Chart/Chart';
import { AverageValue } from './AverageValue/AverageValue';
import { Card } from '@consta/uikit/Card';
import { IData, ISymbolsText } from '../types/types';
import { ChoiceGroupPropOnChange } from '@consta/uikit/ChoiceGroup';

interface CurrencyChartProps {
  data: IData[];
}

const SYMBOLS_TEXT_MAP: ISymbolsText = {
  $: 'Курс доллара',
  '€': 'Курс евро',
  '¥': 'Курс юаня',
};

const CurrencyChart: React.FC<CurrencyChartProps> = ({ data }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('Курс доллара');
  const [averageValue, setAverageValue] = useState<number>();

  const handleChange: ChoiceGroupPropOnChange<string, false> = useCallback(
    (event) => {
      setSelectedCurrency(SYMBOLS_TEXT_MAP[event.value]);
    },
    []
  );

  // Формирование данных для графика

  // Фильтрация данных по индикатору
  const filteredData = data.filter(
    (item) => item.indicator === selectedCurrency
  );

  // Определение минимального значения
  const minValue = Math.min.apply(
    null,
    filteredData.map((d) => d.value)
  );

  // Определение интервала в зависимости от минимального значения
  const interval = minValue % 2 === 0 ? 3 : 2;

  // Стилизация графика
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
      right: 0,
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
        formatter: function (value: number) {
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
