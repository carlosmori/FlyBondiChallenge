var fs = require("fs").promises;
const util = require("util");
var Luxon = require("luxon");

var FlightTicketService = {
  readFlightTickets: () => {
    try {
      return fs.readFile("dataset.json", "utf8");
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  filterTicketsByOrigin: (flightTickets, origin) => {
    try {
      return flightTickets.filter(ticket => ticket.origin === origin);
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  filterTicketsByOriginDest: (flightTickets, origin, destination) => {
    try {
      return flightTickets.filter(
        ticket => ticket.origin === origin && ticket.destination === destination
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  filterTicketsByDate: (flightTickets, fromDate, toDate) => {
    try {
      const parsedFromDate = Luxon.DateTime.fromISO(fromDate);
      const parsedToDate = Luxon.DateTime.fromISO(toDate);
      return (
        flightTickets
          // Tranform every date into a DateTime Object
          .map(ticket => ({
            ...ticket,
            data: Luxon.DateTime.fromISO(ticket.data)
          }))
          // Remove unnecesary dates
          .filter(
            ticket =>
              ticket.data >= parsedFromDate && ticket.data <= parsedToDate
          )
          .sort((prevTicket, nextTicket) => prevTicket.data - nextTicket.data)
          // Sort and rollback to string format
          .map(ticket => ({
            ...ticket,
            data: ticket.data.toString().slice(0, 10)
          }))
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getPossibleDestinationsByOrigin: flightTickets => {
    try {
      return [...new Set(flightTickets.map(x => x.destination))];
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getCheapestFlightPerDestination: (flightTickets, destination) => {
    try {
      return flightTickets
        .filter(element => element.destination !== destination)
        .reduce(
          (min, p) => (p.price < min ? p.price : min),
          flightTickets[0].price
        );
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};
module.exports = FlightTicketService;
