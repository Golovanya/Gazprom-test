import React from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { ISymbolsText } from '../../types/types';

interface HeaderProps {
  selectedCurrency: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}



const Header: React.FC<HeaderProps> = ({ selectedCurrency, handleChange }) => {
  const CurrencySymbols:ISymbolsText = {
    'Курс доллара': '$',
    'Курс евро': '€',
    'Курс юаня': '¥',
  };
  
  const items = ['$', '€', '¥'];

  return (
    <header>
      <h1>
        {selectedCurrency}, {CurrencySymbols[selectedCurrency]}/₽
      </h1>

      <ChoiceGroup
        name="chose"
        view="primary"              // НЕ ХОТЯТ БЫТЬ СИНИМИ, Хотя все классы устанавливаются
        size="xs"
        value={selectedCurrency}
        onChange={handleChange}      //ПОЧЕМУ ТАК
        items={items}
        getItemLabel={(item) => item}
      />
    </header>
  );
};

export default Header;
