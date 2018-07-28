import React from "react";
import { Container, Message } from "semantic-ui-react";
import PageHeader from "./PageHeader";

const RouteNotFound = () => (
  <div>
    <PageHeader />
    <Container text style={{ marginTop: "7em" }}>
      <Message
        icon="meh outline"
        header="404 - Not found"
        content="Are you sure the address is right?"
      />
    </Container>
  </div>
);

export default RouteNotFound;
