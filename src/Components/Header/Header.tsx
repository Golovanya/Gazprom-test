import React, { memo } from 'react';
import {
  ChoiceGroup,
  ChoiceGroupPropOnChange,
} from '@consta/uikit/ChoiceGroup';
import { ISymbolsText } from '../../types/types';

interface HeaderProps {
  selectedCurrency: string;
  handleChange: ChoiceGroupPropOnChange<string, false>;
}

const SYMBOLS_MAP: ISymbolsText = {
  'Курс доллара': '$',
  'Курс евро': '€',
  'Курс юаня': '¥',
};

const VALUE_ICONS = ['$', '€', '¥'];

export const Header: React.FC<HeaderProps> = memo(
  ({ selectedCurrency, handleChange }) => {
    const item = SYMBOLS_MAP[selectedCurrency];

    return (
      <header>
        <h1>
          {selectedCurrency}, {item}/₽
        </h1>

        <ChoiceGroup
          size="xs"
          value={item}
          onChange={handleChange}
          items={VALUE_ICONS}
          getItemLabel={(item) => item}
          multiple={false}
          name="ChoiceGroupExample"
        />
      </header>
    );
  }
);
