import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../src/theme';
import {
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  Button
} from '@material-ui/core/';

const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.secondary.light}`
  },
  flightTicket: {
    backgroundColor: `${theme.palette.primary.light}`,
    borderRadius: '5px',
    color: 'white',
    width: '48%',
    display: 'inline-block',
    margin: '1%',
    boxShadow: '5px 5px 15px #969696',
    cursor: 'pointer'
  },
  ticketDate: {
    float: 'right',
    padding: '0px 5px'
  },
  ticketOriginDestination: {
    margin: '5px'
  },
  ticketPrice: {
    fontSize: '2rem',
    margin: 0,
    fontWeight: 'bold',
    paddingLeft: '5%'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '5px'
  },
  filterButton: {
    marginLeft: '10px'
  }
});
const TicketList = ({ ticketList }) => {
  const [filteredTickets, setFilteredTickets] = React.useState([]);
  const [maxTicketPrice, setMaxTicketPrice] = React.useState(0);
  useEffect(() => {
    setFilteredTickets(ticketList);
  }, []);

  const classes = useStyles();
  const selectTicket = () => {
    alert('Work in progress');
  };
  const filterFlightTickets = () => {
    setFilteredTickets(
      maxTicketPrice
        ? ticketList.filter(ticket => ticket.price <= maxTicketPrice)
        : ticketList
    );
  };

  return (
    <div>
      <h1 className={classes.mainTitle}>Lista de Tickets Disponibles</h1>
      <div className={classes.filterContainer}>
        <FormControl variant="outlined">
          <InputLabel htmlFor="standard-adornment-amount">
            Precio Máximo
          </InputLabel>
          <OutlinedInput
            id="standard-adornment-amount"
            value={maxTicketPrice}
            onChange={event => setMaxTicketPrice(event.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={100}
          />
        </FormControl>{' '}
        <Button
          className={classes.filterButton}
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
};

const mapStateToProps = state => ({
  ticketList: state.ticketList.ticketList
});
export default connect(mapStateToProps, {})(TicketList);
