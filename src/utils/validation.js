export function validation(carData, e, editSelected, index) {
  let errors = [];
  let previousIndex = carData.fuelUps || +index === 0 ? '' : +index - 1;
  let nextIndex =
    carData.fuelUps && +index === carData.fuelUps.length - 1 ? '' : +index + 1;

  let fuels = carData.fuelUps
    ? [...new Set(carData.fuelUps.map((fuelUp) => fuelUp.fuel))]
    : '';

  if (e.target.odometer.value === '') {
    errors.push('Please input Odometer');
  }

  if (+e.target.odometer.value < 0) {
    errors.push('Odometer value can not be negative number');
  }
  if (previousIndex && nextIndex) {
    if (
      e.target.date.value < carData.fuelUps[previousIndex].date ||
      e.target.date.value > carData.fuelUps[nextIndex].date
    ) {
      errors.push(
        `The date should be between ${carData.fuelUps[previousIndex].date} and ${carData.fuelUps[nextIndex].date}`
      );
    }

    if (
      e.target.odometer.value <= carData.fuelUps[previousIndex].odometer ||
      e.target.odometer.value >= carData.fuelUps[nextIndex].odometer
    ) {
      errors.push(
        `The odometer should be between ${carData.fuelUps[previousIndex].odometer} and ${carData.fuelUps[nextIndex].odometer}`
      );
    }
  } else {
    if (
      previousIndex &&
      e.target.date.value < carData.fuelUps[previousIndex].date
    ) {
      errors.push(
        `The date should be greater than previous value - ${carData.fuelUps[previousIndex].date}`
      );
    }

    if (nextIndex && e.target.date.value > carData.fuelUps[nextIndex].date) {
      errors.push(
        `The date should be less than next value - ${carData.fuelUps[nextIndex].date}`
      );
    }

    if (
      previousIndex &&
      e.target.odometer.value <= carData.fuelUps[previousIndex].odometer
    ) {
      errors.push(
        `The odometer value should be greater than previous value - ${carData.fuelUps[previousIndex].odometer}`
      );
    }
    if (
      nextIndex &&
      e.target.odometer.value >= carData.fuelUps[nextIndex].odometer
    ) {
      errors.push(
        `The odometer value should be less than next value - ${carData.fuelUps[nextIndex].odometer}`
      );
    }
  }

  if (e.target.selectedFuel.value === 'Select Fuel') {
    errors.push(`You must select fuel type`);
  }

  console.log(fuels);
  console.log(e.target.selectedFuel.value);

  if (
    (fuels !== undefined &&
      fuels !== '' &&
      e.target.selectedFuel.value === 'Diesel' &&
      !fuels.includes('Diesel')) ||
    (fuels !== undefined &&
      fuels.includes('Diesel') &&
      e.target.selectedFuel.value !== 'Diesel')
  ) {
    errors.push(
      `Different fuel was used compared with previous fuel ups - ${
        fuels.lenght > 0 ? fuels.join(', ') : fuels
      }`
    );
  }

  if (e.target.liters.value === '') {
    errors.push('Please input Liters');
  }
  if (+e.target.liters.value <= 0) {
    errors.push('Liters must be positive value');
  }
  if (e.target.total.value === '') {
    errors.push('Please input Total Price');
  }
  if (+e.target.total.value <= 0) {
    errors.push('Total price must be positive value');
  }

  return errors;
}
