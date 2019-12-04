import React, { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core/";
import { axios } from "../utils/http/axios-singleton";
import { setPossibleDestinations } from "../state/ducks/destination/actions";

const useStyles = makeStyles({
  originSelectFormControl: {
    width: "48%",
    margin: "1%"
  },
  originLabel: {
    marginTop: "5px"
  },
  passengersFormControl: {
    width: "10%",
    margin: "1%"
  },
  searchButton: {
    width: "100%",
    margin: "5% 0%"
  }
});
function SearchFlight(props) {
  const classes = useStyles();
  const [passengers, handlepassengers] = useState(1);
  const [origin, setOrigin] = React.useState("");

  const searchFlights = () => {
    axios.get(`/flightTickets/${origin}`).then(response => {
      props.setPossibleDestinations({
        possibleDestinations: response.data,
        origin
      });
      Router.push("/destinations");
    });
  };
  const handleChange = event => {
    setOrigin(event.target.value);
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className={classes.searchFlightContainer}>
      <div className={classes.searchFlightSecondRow}>
        <FormControl
          className={classes.originSelectFormControl}
          variant="outlined"
        >
          <InputLabel className={classes.originLabel}>Desde</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={origin}
            onChange={handleChange}
          >
            <MenuItem value={"BRC"}>Bariloche</MenuItem>
            <MenuItem value={"COR"}>Cordoba</MenuItem>
            <MenuItem value={"MDZ"}>Mendoza</MenuItem>
            <MenuItem value={"EPA"}>El Palomar</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.passengersFormControl}
          label="Pasajeros"
          type="number"
          value={passengers}
          onChange={event => handlepassengers(event.target.value)}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <Button
          className={classes.searchButton}
          onClick={searchFlights}
          variant="contained"
          color="primary"
          disabled={!origin}
        >
          Buscar Vuelos
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, { setPossibleDestinations })(
  SearchFlight
);
