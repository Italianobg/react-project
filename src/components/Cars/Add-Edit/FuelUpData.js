function FuelUpData(props) {
  return (
    <span>
      <div>
        Liters:
        <input
          type="number"
          name="liters"
          onChange={props.litersHandler}
          step="0.001"
          value={props.inputsData.liters}
        />
      </div>
      <div>
        Total Price:
        <input
          type="number"
          name="total"
          onChange={props.totalPriceHandler}
          step="0.001"
          value={props.inputsData.total}
        />
      </div>
      <div>
        Price/L:
        <input
          type="number"
          name="pricePerL"
          value={props.inputsData.price}
          disabled
        />
      </div>
      <div className="full-tank">
        Full Tank:
        <input
          name="fullTank"
          type="checkbox"
          id="fullTank"
          onChange={props.toggleFullTankCheckBox}
          checked={props.inputsData.full}
        />
      </div>
    </span>
  );
}

export default FuelUpData;
