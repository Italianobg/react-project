import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CarModel from './CarModel';

afterEach(cleanup);

describe('Test select model component', () => {
  const models = [
    { name: 'S40', id: 'mocked-option-1' },
    { name: 'S60', id: 'mocked-option-2' },
    { name: 'S80', id: 'mocked-option-3' },
    { name: 'V40', id: 'mocked-option-4' },
    { name: 'V50', id: 'mocked-option-5' },
    { name: 'V70', id: 'mocked-option-6' },
    { name: 'XC40', id: 'mocked-option-7' },
    { name: 'XC60', id: 'mocked-option-8' },
    { name: 'XC70', id: 'mocked-option-9' },
    { name: 'XC90', id: 'mocked-option-10' },
  ];

  it('should render without errors', async () => {
    const { getByText } = render(
      <CarModel models={models} selectedModel={'S40'} />
    );

    const value = getByText('S40');

    expect(value).toBeTruthy();
  });

  it('the select value should be S60', async () => {
    const { queryAllByTestId } = render(
      <CarModel models={models} selectedModel={'S60'} />
    );

    const mySelectComponent = queryAllByTestId('my-select-component');
    expect(mySelectComponent[0].childNodes[1].value).toBe('S60');
    expect(mySelectComponent).toBeDefined();
    expect(mySelectComponent).not.toBeNull();
  });
});
