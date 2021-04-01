function CarType(props) {
  const carTypes = {
    A: 'Choose...',
    C: 'Cars',
    B: 'Bikes',
  };

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
