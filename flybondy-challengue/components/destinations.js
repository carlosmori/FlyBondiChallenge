import React, { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useMediaQuery, Button } from "@material-ui/core";
import { axios } from "../utils/http/axios-singleton";
import { setTicketList } from "../state/ducks/ticket-list/actions";

const useStyles = makeStyles({
  destinationsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  possibleDestinationContainer: {
    position: "relative",
    margin: "5px",
    cursor: "pointer",
    textAlign: "center",
    margin: "0 auto",
    width: "fit-content"
  },
  possibleDestination: {
    color: "white",
    position: "absolute",
    bottom: "40px",
    left: "10px"
  },
  cheapestPriceForDestination: {
    color: "white",
    position: "absolute",
    bottom: "0",
    left: "10px"
  },
  possibleDestinationImage: {
    width: "100%"
  },
  datepickerFormControl: {
    width: "48%",
    margin: "1%"
  },
  formControlsContainer: {
    textAlign: "center"
  },
  searchButton: {
    marginTop: "40px"
  }
});
function Destinations(props) {
  const classes = useStyles();
  const [toggleCalendar, handleToggleCalendar] = useState(false);
  const [toDate, handleToDate] = useState(null);
  const [fromDate, handleFromDate] = useState(null);
  const [destination, handleDestination] = useState("");
  const desktopView = useMediaQuery("(min-width:600px)");

  const searchFlightsTickets = () => {
    const payload = {
      origin: props.origin,
      destination,
      toDate: toDate.toString().slice(0, 10),
      fromDate: fromDate.toString().slice(0, 10)
    };
    axios.post(`/flightTickets`, payload).then(response => {
      props.setTicketList({
        ticketList: response.data
      });
      Router.push("/destinations/ticket-list");
    });
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div>
      <div className={classes.destinationsContainer}>
        {props.destinations.map((destination, index) => {
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
              {!desktopView ? (
                <img
                  src={require(`../assets/mobile/${destination.possibleDest}.png`)}
                ></img>
              ) : (
                <img
                  className={classes.possibleDestinationImage}
                  src={require(`../assets/desktop/${destination.possibleDest}.png`)}
                ></img>
              )}
            </div>
          );
        })}
      </div>
      {toggleCalendar ? (
        <div className={classes.formControlsContainer}>
          <div className={classes.searchFlightFirstRow}>
            <KeyboardDatePicker
              placeholder="Fecha de Salida"
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
              placeholder="Fecha de Llegada"
              clearable
              value={toDate}
              onChange={date => handleToDate(date)}
              minDate={toDate}
              format="dd/MM/yyyy"
              className={classes.datepickerFormControl}
              inputVariant="outlined"
            />
            <Button
              className={classes.searchButton}
              onClick={searchFlightsTickets}
              variant="contained"
              color="primary"
              disabled={!toDate || !fromDate || !destination}
            >
              Buscar Vuelos
            </Button>
          </div>
          <div className={classes.searchFlightThirdRow}></div>
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  origin: state.destinations.origin,
  destinations: state.destinations.possibleDestination
});
export default connect(mapStateToProps, { setTicketList })(Destinations);
