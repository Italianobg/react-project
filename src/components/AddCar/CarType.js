import { useEffect } from 'react';

function CarType(props) {
  const carTypes = {
    C: 'Cars',
    B: 'Bikes',
  };

  useEffect(() => {
    if (props.makes.length === 1 && props.vehicles.length > 1) {
      filterMakesByType(props.selectedType);
    } else {
      if (props.makes < 2) {
        props.setType('C');
      }
    }
  });

  function filterMakesByType(type) {
    let makesSelected = props.vehicles
      .filter((el) => {
        if (el['vehicleTypes'].includes(type)) {
          return el;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    props.setAllMakes(makesSelected);
  }

  function filterMakes(e) {
    props.setType(e.target.value);
    let makesSelected = props.vehicles
      .filter((el) => {
        if (el['vehicleTypes'].includes(e.target.value)) {
          return el;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    props.setAllMakes(makesSelected);
  }

  return (
    <div>
      <label className="type">Type:</label>
      <select name="type" onChange={filterMakes} value={props.selectedType}>
        {Object.keys(carTypes).map((type, index) => {
          return (
            <option key={index} value={props.selectedType}>
              {carTypes[type]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CarType;
