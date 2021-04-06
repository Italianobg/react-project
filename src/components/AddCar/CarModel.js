function CarModel(props) {
  function selectModelHandler(e) {
    props.setModel(e.target.value);
  }

  return (
    <div>
      <label className="model">Model:</label>
      <select
        name="model"
        onChange={selectModelHandler}
        value={props.selectedModel}
      >
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
