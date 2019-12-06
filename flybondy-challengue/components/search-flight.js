import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  MenuItem,
  FormControl,
  Select,
  LinearProgress,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Typography
} from '@material-ui/core/';

import { fetchPossibleDestination } from '../state/ducks/destination/actions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import theme from '../src/theme';

const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.primary.light}`
  },
  originSelectFormControl: {
    width: '48%',
    margin: '1%'
  },
  passengersFormControl: {
    width: '20%',
    margin: '1%'
  },
  searchButton: {
    width: '100%',
    margin: '5% 0%'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    justifyContent: 'center'
  },
  searchButton: {
    width: '50%',
    margin: '0 auto'
  }
});
const SearchFlight = ({ fetchPossibleDestination, fetchingDestinations }) => {
  const classes = useStyles();
  const [passengers, setPassengers] = useState(1);
  const [origin, setOrigin] = useState('');

  return (
    <div className={classes.searchFlightContainer}>
      <Typography variant="h4" component="h1" gutterBottom>
        <div className={classes.mainTitle}>Tu aerolinea Lowcost</div>
      </Typography>
      <img src={'/static/flybondi-logo.svg'}></img>
      <div className={classes.searchFlightSecondRow}>
        <FormControl
          className={classes.originSelectFormControl}
          variant="outlined"
        >
          <InputLabel className={classes.originLabel}>Origen</InputLabel>
          {/* Hardcode destination values, @todo fix, not scalable */}
          <Select
            id="demo-simple-select"
            value={origin}
            onChange={event => setOrigin(event.target.value)}
            labelWidth={50}
          >
            <MenuItem value={'BRC'}>Bariloche</MenuItem>
            <MenuItem value={'COR'}>Cordoba</MenuItem>
            <MenuItem value={'MDZ'}>Mendoza</MenuItem>
            <MenuItem value={'EPA'}>El Palomar</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className={classes.passengersFormControl}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Pasajeros
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={passengers}
            onChange={event => setPassengers(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPassengers(passengers + 1)}
                  edge="end"
                >
                  {<PersonAddIcon />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <div className={classes.buttonContainer}>
          {fetchingDestinations ? (
            <LinearProgress variant="query" />
          ) : (
            <Button
              className={classes.searchButton}
              onClick={() => fetchPossibleDestination({ origin })}
              variant="contained"
              color="primary"
              disabled={!origin}
            >
              Buscar Vuelos
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fetchingDestinations: state.destinations.loading
});
export default connect(mapStateToProps, { fetchPossibleDestination })(
  SearchFlight
);
