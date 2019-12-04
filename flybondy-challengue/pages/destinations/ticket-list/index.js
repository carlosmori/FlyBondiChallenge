import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import TicketList from "../../../components/ticket-list";
import { theme } from "../../_app";

const useStyles = makeStyles({
  containerClass: {
    borderLeft: `10px solid ${theme.palette.primary.light}`,
    borderTop: `10px solid ${theme.palette.primary.light}`,
    borderRadius: "50px",
    marginTop: "10px"
  }
});
export default function Index() {
  const classes = useStyles();
  return (
    <Container className={classes.containerClass} maxWidth="md">
      <Box my={4}>
        <TicketList />
      </Box>
    </Container>
  );
}
