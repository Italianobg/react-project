import { useEffect, useState } from 'react';

function CarModel(props) {
  const [model, setModel] = useState();

  useEffect(() => {
    setModel(props.selectedModel);
  }, [props.selectedModel]);

  function selectModelHandler(e) {
    setModel(e.target.value);
  }

  return (
    <div>
      <label className="model">Model:</label>
      <select name="model" onChange={selectModelHandler} value={model}>
        {props.models.map((model, index) => {
          return (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CarModel;
