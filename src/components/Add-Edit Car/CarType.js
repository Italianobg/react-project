import { useEffect, useState } from 'react';

function CarType(props) {
  const carTypes = {
    C: 'Cars',
    B: 'Bikes',
  };
  const [type, setType] = useState(props.selectedType);

  useEffect(() => {
    if (type === undefined) {
      setType('C');
      props.setChangedTypeHandler('C');
    }

    filterMakesByType(type);
  }, [type, props.vehicles]);

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
    setType(e.target.value);
    props.setChangedTypeHandler(e.target.value);
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
      <label className="type"> Type: </label>
      <select name="type" onChange={filterMakes} value={type}>
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
