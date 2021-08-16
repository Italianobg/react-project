export function validation(carData, e, editSelected, index) {
  let errors = [];
  let previousIndex = +index === 0 ? '' : +index - 1;
  let nextIndex = +index === carData['Fuel Ups'].length - 1 ? '' : +index + 1;

  if (e.target.odometer.value === '') {
    errors.push('Please input Odometer');
  }

  if (+e.target.odometer.value < 0) {
    errors.push('Odometer value can not be negative number');
  }

  if (
    previousIndex &&
    e.target.date.value <= carData['Fuel Ups'][previousIndex].date
  ) {
    errors.push(
      `The date should be greater than previous value - ${carData['Fuel Ups'][previousIndex].date}`
    );
  }

  if (nextIndex && e.target.date.value >= carData['Fuel Ups'][nextIndex].date) {
    errors.push(
      `The date should be less than next value - ${carData['Fuel Ups'][nextIndex].date}`
    );
  }

  if (
    previousIndex &&
    e.target.odometer.value <= carData['Fuel Ups'][previousIndex].odometer
  ) {
    errors.push(
      `The odometer value should be greater than previous value - ${carData['Fuel Ups'][previousIndex].odometer}`
    );
  }
  if (
    nextIndex &&
    e.target.odometer.value >= carData['Fuel Ups'][nextIndex].odometer
  ) {
    errors.push(
      `The odometer value should be greater than next value - ${carData['Fuel Ups'][nextIndex].odometer}`
    );
  }

  if (e.target.selectedFuel.value === 'Select Fuel') {
    errors.push(`You must select fuel type`);
  }
  if (
    (carData.fuel !== undefined &&
      e.target.selectedFuel.value === 'Diesel' &&
      carData.fuel !== 'Diesel') ||
    (carData.fuel !== undefined &&
      carData.fuel === 'Diesel' &&
      e.target.selectedFuel.value !== 'Diesel')
  ) {
    errors.push(
      `Different fuel was used compared with previous fuel ups - ${carData.fuel}`
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
