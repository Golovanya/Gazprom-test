import React from 'react';
interface AverageValueProps {
  averageValue: number | null;
}

const AverageValue: React.FC<AverageValueProps> = ({ averageValue }) => {
  return (
    <div>
      {averageValue !== null && (
        <div>
          <p className='average-title'>Среднее за период</p>
          <p className='average-value'>{averageValue.toFixed(1).replace('.', ',')} <span className='average-item'>₽</span></p>
        </div>
      )}
    </div>
  );
};

export default AverageValue;