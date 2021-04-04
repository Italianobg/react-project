import { useEffect, useRef } from 'react';

function CarType(props) {
  const carTypes = {
    C: 'Cars',
    B: 'Bikes',
  };
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      if (props.selectedType !== '') {
        filterMakesByType(props.selectedType);
      }
    } else {
      didMount.current = true;
      props.setType('C');
    }
  }, [props.vehicles, props.selectedType]);

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
            <option key={index} value={type}>
              {carTypes[type]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CarType;
