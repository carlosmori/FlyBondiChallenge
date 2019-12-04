import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box } from "@material-ui/core";
import { theme } from "../pages/_app";
import flyBondyLogo from "../assets/flybondi-logo.svg";
import SearchFlight from "../components/search-flight";

const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.primary.light}`
  },
  containerClass: {
    borderBottom: `10px solid ${theme.palette.primary.light}`,
    borderRight: `10px solid ${theme.palette.primary.light}`,
    borderRadius: "50px"
  }
});
export default function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.containerClass}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <div className={classes.mainTitle}>Tu aerolinea Lowcost</div>
        </Typography>
        <img src={flyBondyLogo}></img>
        <SearchFlight />
      </Box>
    </Container>
  );
}
