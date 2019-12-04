import React from "react";
import { Container, Box } from "@material-ui/core";
import Destinations from "../../components/destinations";

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Destinations />
      </Box>
    </Container>
  );
}
