import React, { useEffect } from "react";
import { connect } from "react-redux";
import { theme } from "../pages/_app";
import { makeStyles } from "@material-ui/core/styles";
import {
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
  Input
} from "@material-ui/core/";

const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.primary.light}`
  },
  flightTicket: {
    backgroundColor: `${theme.palette.primary.light}`,
    borderRadius: "5px",
    color: "white",
    width: "45%",
    display: "inline-block",
    margin: "5px",
    boxShadow: "5px 5px 15px #969696",
    cursor: "pointer"
  },
  ticketDate: {
    float: "right"
  },
  ticketOriginDestination: {
    margin: "5px"
  },
  ticketPrice: {
    fontSize: "2rem",
    margin: 0
  },
  filterContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "5px"
  },
  maxPriceFormControl: {
    padding: "0px 10px"
  }
});
function TicketList(props) {
  const [filteredTickets, setFilteredTickets] = React.useState([]);
  const [maxTicketPrice, setMaxTicketPrice] = React.useState(0);
  useEffect(() => {
    setFilteredTickets(props.ticketList);
    return () => {};
  }, []);

  const classes = useStyles();
  const selectTicket = () => {
    alert("Work in progress");
  };
  const filterFlightTickets = () => {
    setFilteredTickets(
      maxTicketPrice
        ? props.ticketList.filter(ticket => ticket.price <= maxTicketPrice)
        : props.ticketList
    );
  };

  return (
    <div>
      <h1 className={classes.mainTitle}>Lista de Tickets Disponibles</h1>
      <div className={classes.filterContainer}>
        <FormControl className={classes.maxPriceFormControl}>
          <InputLabel htmlFor="standard-adornment-amount">
            Precio Máximo
          </InputLabel>
          <Input
            id="standard-adornment-amount"
            value={maxTicketPrice}
            onChange={event => setMaxTicketPrice(event.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>{" "}
        <Button
          className={classes.searchButton}
          onClick={filterFlightTickets}
          variant="contained"
          color="primary"
          disabled={maxTicketPrice === 0}
        >
          Filtrar
        </Button>
      </div>
      {filteredTickets.map((ticket, index) => {
        return (
          <div
            className={classes.flightTicket}
            onClick={selectTicket}
            key={index}
          >
            <span className={classes.ticketDate}>{ticket.data}</span>
            <span className={classes.ticketOriginDestination}>
              {ticket.origin}-{ticket.destination}
            </span>
            <p className={classes.ticketPrice}>${ticket.price}</p>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  ticketList: state.ticketList.ticketList
});
export default connect(mapStateToProps, {})(TicketList);
