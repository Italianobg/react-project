import useAPIError from '../../../hooks/useAPIError';
import { useEffect, useState } from 'react';
import getGasStations from '../../../services/googleMapsGasStations.js';

function GasStation(props) {
  const { addError } = useAPIError();
  const [focus, setFocus] = useState(false);
  const { position, gasStations } = props;

  useEffect(() => {
    console.log('Render');
    if (!gasStations && position && position['coords'] !== undefined) {
      getGasStations(position.coords.latitude, position.coords.longitude)
        .then((res) => {
          let names = [];
          props.setGasStations(res.results);
          res.results.map((gasStation) => {
            return names.push(gasStation.name);
          });
          props.setSuggestions(names);
        })
        .catch((err) => {
          addError(err.message);
        });
    }
  }, [position, addError, gasStations]);

  function focusHandler(e) {
    setFocus(true);
  }

  function blurHandler(e) {
    setTimeout(function () {
      setFocus(false);
    }, 250);
  }

  return (
    <span>
      <div>
        Gas Station:
        <input
          name="station"
          type="text"
          autoComplete="off"
          onChange={props.setGasStationOnChange}
          onFocus={focusHandler}
          onBlur={blurHandler}
          value={props.gasStation}
        />
      </div>
      {props.suggestions && focus ? (
        <ul>
          {props.suggestions.map((name, index) => {
            if (name.toLowerCase().includes(props.gasStation.toLowerCase())) {
              return (
                <li
                  className="suggestions"
                  name="suggestions"
                  key={index}
                  value={name}
                  onClick={props.setGasStationHandler}
                >
                  {name}
                </li>
              );
            } else {
              return '';
            }
          })}
        </ul>
      ) : (
        ''
      )}
    </span>
  );
}

export default GasStation;
