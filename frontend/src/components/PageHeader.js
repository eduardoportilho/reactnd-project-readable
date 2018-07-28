import React from "react";
import { Link } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";

const PageHeader = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header>
        <Link to="/">
          <Icon inverted color="teal" name="book" size="big" />
          Readable
        </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link to="/new-post">
          <Icon inverted name="add" />
          New post
        </Link>
      </Menu.Item>
    </Container>
  </Menu>
);

export default PageHeader;
