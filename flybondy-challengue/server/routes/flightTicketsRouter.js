var express = require("express");
var router = express.Router();
var _ = require("lodash");
var FlightTicketService = require("../services/flightTicketService");

router.post("/", async (req, res, next) => {
  try {
    if (req && req.body) {
      const { origin, destination, fromDate, toDate } = req.body;
      let flightTickets = JSON.parse(
        await FlightTicketService.readFlightTickets()
      );
      flightTickets = FlightTicketService.filterTicketsByOriginDest(
        flightTickets,
        origin,
        destination
      );
      flightTickets = FlightTicketService.filterTicketsByDate(
        flightTickets,
        fromDate,
        toDate
      );
      res.send(flightTickets);
    } else {
      res.send("Error, missing fields");
    }
  } catch (err) {
    next(err);
  }
});
router.get("/:origin", async (req, res, next) => {
  try {
    if (req.params && req.params.origin) {
      const origin = req.params.origin;
      let response = [];
      let flightTickets = JSON.parse(
        await FlightTicketService.readFlightTickets()
      );
      flightTickets = FlightTicketService.filterTicketsByOrigin(
        flightTickets,
        origin
      );
      const possibleDestinations = FlightTicketService.getPossibleDestinationsByOrigin(
        flightTickets
      );
      possibleDestinations.forEach(possibleDest => {
        const cheapestPrice = FlightTicketService.getCheapestFlightPerDestination(
          flightTickets,
          possibleDest
        );
        response.push({ possibleDest, cheapestPrice });
      });
      res.send(response);
    } else {
      res.send("Please provide a Destination Code");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
