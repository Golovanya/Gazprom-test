import React from 'react';
interface AverageValueProps {
  averageValue?: number;
}

export const AverageValue: React.FC<AverageValueProps> = ({ averageValue }) => {
  return (
    <div>
      {averageValue ? (
        <div>
          <p className="average-title">Среднее за период</p>
          <p className="average-value">
            {averageValue.toFixed(1).replace('.', ',')}{' '}
            <span className="average-item">₽</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};
