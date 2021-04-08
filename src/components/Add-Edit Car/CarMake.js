import { useEffect, useState } from 'react';

function CarMake(props) {
  const [make, setMake] = useState(props.selectedMake);
  useEffect(() => {
    setMake(props.selectedMake);
  }, [props.selectedMake]);

  useEffect(() => {
    if (make && props.makes) {
      filterModelByMake(make);
    }
  }, [make, props.makes]);

  function filterModelByMake(make) {
    if (props.makes.find((el) => el.name === make)) {
      let modelsSelected = props.makes
        .find((el) => el.name === make)
        .models.filter((model) => {
          if (model.vehicleType === props.changedType) {
            return model;
          }
          return '';
        })
        .sort((a, b) => a['name'].localeCompare(b['name']));

      props.setAllModels(modelsSelected);
    }
  }

  function filterModels(e) {
    setMake(e.target.value);

    let modelsSelected = props.makes
      .find((el) => el.name === e.target.value)
      .models.filter((model) => {
        if (model.vehicleType === props.changedType) {
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
      <select name="make" onChange={filterModels} value={make}>
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
