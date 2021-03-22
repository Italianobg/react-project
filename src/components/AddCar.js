import './AddCar.css';

function AddCar(props) {
  return (
    <div className="selectCar">
      <div>
        <label for="img">Select image:</label>
        <input type="file"></input>
      </div>
      <div>
        <label for="make">Type:</label>
        <select name="make">
          <option value="">Choose..</option>
          <option value="">Car</option>
          <option value="">Van</option>
          <option value="">Truck</option>
        </select>
      </div>
      <div>
        <label for="make">Make:</label>
        <select name="make">
          <option value="">Choose..</option>
          <option value="">Volvo</option>
          <option value="">BMW</option>
          <option value="">Mercedes</option>
          <option value="">VW</option>
        </select>
      </div>
      <div>
        <label for="Model">Model:</label>
        <select name="Model">
          <option value="">Choose..</option>
          <option value="">S80</option>
          <option value="">S60</option>
          <option value="">S40</option>
        </select>
      </div>
      <div>
        <button type="submit">Add Car</button>
      </div>
    </div>
  );
}

export default AddCar;
