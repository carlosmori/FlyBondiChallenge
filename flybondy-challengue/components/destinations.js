import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useMediaQuery, Button, LinearProgress } from '@material-ui/core';
import { fetchFlightTickets } from '../state/ducks/flight-tickets/actions';
import theme from '../src/theme';

const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.secondary.light}`
  },
  destinationsContainer: {
    display: 'flex'
  },
  possibleDestinationContainer: {
    position: 'relative',
    margin: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    margin: '10px auto',
    width: 'fit-content',
    overflow: 'hidden',
    borderRadius: '5px',
    transition: 'transform .5s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  possibleDestination: {
    color: 'white',
    position: 'absolute',
    bottom: '40px',
    left: '10px'
  },
  cheapestPriceForDestination: {
    color: 'white',
    position: 'absolute',
    bottom: '0',
    left: '10px'
  },
  possibleDestinationImage: {
    width: '100%'
  },
  datepickerFormControl: {
    width: '48%',
    margin: '1%'
  },
  formControlsContainer: {
    textAlign: 'center'
  },
  searchButton: {
    width: '50%',
    margin: '0 auto'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100px',
    justifyContent: 'center'
  },
  destinationImage: {
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat'
  }
});
const Destinations = ({
  origin,
  fetchFlightTickets,
  fetchingFlightTickets,
  destinations
}) => {
  const classes = useStyles();
  const [toggleCalendar, handleToggleCalendar] = useState(false);
  const [toDate, handleToDate] = useState(null);
  const [fromDate, handleFromDate] = useState(null);
  const [destination, handleDestination] = useState('');
  const desktopView = useMediaQuery('(min-width:600px)');

  const searchFlightsTickets = () => {
    const payload = {
      origin,
      destination,
      toDate: toDate.toString().slice(0, 10),
      fromDate: fromDate.toString().slice(0, 10)
    };
    fetchFlightTickets(payload);
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className={classes.boxContainer}>
      <h1 className={classes.mainTitle}>
        Destinos Increibles, Precios Accesibles
      </h1>
      <div
        className={classes.destinationsContainer}
        style={{ flexDirection: desktopView ? 'row' : 'column' }}
      >
        {destinations.map((destination, index) => {
          return (
            <div
              className={classes.possibleDestinationContainer}
              onClick={() => {
                handleToggleCalendar(true);
                handleDestination(destination.possibleDest);
              }}
              key={index}
            >
              <h1 className={classes.possibleDestination}>
                {destination.possibleDest}
              </h1>
              <h2 className={classes.cheapestPriceForDestination}>
                Desde ${destination.cheapestPrice}
              </h2>
              <div
                style={{
                  backgroundImage: `url('/static/desktop/${destination.possibleDest}.png')`,
                  width: desktopView ? '400px' : '300px',
                  height: desktopView ? '300px' : '100px'
                }}
                className={classes.destinationImage}
              ></div>
            </div>
          );
        })}
      </div>
      {toggleCalendar ? (
        <div className={classes.formControlsContainer}>
          <div className={classes.searchFlightFirstRow}>
            <KeyboardDatePicker
              placeholder="Salida"
              clearable
              value={fromDate}
              onChange={date => {
                handleFromDate(date);
                handleToDate(date);
              }}
              minDate={new Date()}
              format="dd/MM/yyyy"
              className={classes.datepickerFormControl}
              inputVariant="outlined"
            />
            <KeyboardDatePicker
              placeholder="Llegada"
              clearable
              value={toDate}
              onChange={date => handleToDate(date)}
              minDate={toDate}
              format="dd/MM/yyyy"
              className={classes.datepickerFormControl}
              inputVariant="outlined"
            />
            <div className={classes.buttonContainer}>
              {fetchingFlightTickets ? (
                <LinearProgress variant="query" />
              ) : (
                <Button
                  className={classes.searchButton}
                  onClick={searchFlightsTickets}
                  variant="contained"
                  color="primary"
                  disabled={!toDate || !fromDate || !destination}
                >
                  Buscar Vuelos
                </Button>
              )}
            </div>
          </div>
          <div className={classes.searchFlightThirdRow}></div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  origin: state.destinations.origin,
  destinations: state.destinations.possibleDestination,
  fetchingFlightTickets: state.ticketList.loading
});
export default connect(mapStateToProps, { fetchFlightTickets })(Destinations);
