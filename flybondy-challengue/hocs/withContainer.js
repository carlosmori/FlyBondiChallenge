import React, { Fragment } from 'react';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../src/theme';
const useStyles = makeStyles({
  mainTitle: {
    color: `${theme.palette.primary.light}`
  },
  containerClass: {
    borderBottom: `10px solid ${theme.palette.primary.light}`,
    borderRight: `10px solid ${theme.palette.primary.light}`,
    borderRadius: '50px'
  }
});

const withContainer = Component => props => {
  const classes = useStyles();
  return (
    <Fragment>
      <Container maxWidth="md" className={classes.containerClass}>
        <Box my={4}>
          <Component {...props} />
        </Box>
      </Container>
    </Fragment>
  );
};
export default withContainer;
