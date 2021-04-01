function CarMake(props) {
  function filterModels(e) {
    props.setMake(e.target.value);

    let modelsSelected = props.makes
      .find((el) => el.name === e.target.value)
      .models.filter((model) => {
        if (model.vehicleType === props.selectedType) {
          return model;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    props.setAllModels(modelsSelected);
  }

  return (
    <div>
      <label className="make">Make:</label>
      <select name="make" onChange={filterModels} value={props.selectedMake}>
        {props.makes.map((make, index) => {
          return (
            <option key={make.id} value={make.name}>
              {make.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CarMake;
