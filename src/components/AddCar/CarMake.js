import { useEffect } from 'react';

function CarMake(props) {
  useEffect(() => {
    if (props.selectedMake !== '') {
      if (
        props.makes !== undefined &&
        props.makes.length > 1 &&
        props.selectedMake !== undefined &&
        props.models.length < 2
      ) {
        filterModelByMake(props.selectedMake);
        console.log('Filter Models');
      }
    }
  }, [props.makes, props.selectedMake, props.selectedType]);

  function filterModelByMake(make) {
    let modelsSelected = props.makes
      .find((el) => el.name === make)
      .models.filter((model) => {
        if (model.vehicleType === props.selectedType) {
          return model;
        }
        return '';
      })
      .sort((a, b) => a['name'].localeCompare(b['name']));
    props.setAllModels(modelsSelected);
  }

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
