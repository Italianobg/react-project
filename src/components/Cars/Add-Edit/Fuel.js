function Fuel(props) {
  return (
    <span>
      <div>
        Fuel:
        <select
          name="selectedFuel"
          onChange={props.selectFuel}
          value={props.inputsData.fuel}
        >
          {props.fuels.map((fuel, index) => {
            return (
              <option key={index} value={fuel.name}>
                {fuel.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        Fuel Type:
        <select
          name="type"
          onClick={props.selectType}
          onChange={props.selectType}
          value={props.inputsData.type}
        >
          {props.selectedFuel.types
            ? props.selectedFuel.types.map((type, index) => {
                return (
                  <option key={index} defaultValue={type}>
                    {type}
                  </option>
                );
              })
            : ''}
        </select>
      </div>
    </span>
  );
}

export default Fuel;
