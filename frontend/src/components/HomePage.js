import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Header,
  Label,
  Icon,
  Menu,
  List
} from "semantic-ui-react";

import PostListContainer from "../containers/PostListContainer";

const HomePage = ({ errorFetchingData, categories, posts }) => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <Icon inverted color="teal" name="book" size="big" />
          <Link to="/">Readable</Link>
        </Menu.Item>

        <Menu.Item position="right">
          <Link to="/new-post">
            <Icon inverted name="add" />
            New post
          </Link>
        </Menu.Item>
      </Container>
    </Menu>

    <Container text style={{ marginTop: "7em" }}>
      {errorFetchingData && <div>Error: {errorFetchingData} </div>}
      <Header as="h1">Welcome to Readable!</Header>

      <Card fluid>
        <Card.Content>
          <Card.Header>Categories</Card.Header>
        </Card.Content>

        <Card.Content>
          <List horizontal>
            {categories.map(category => (
              <List.Item key={category.path}>
                <List.Content>
                  <Link to={`/category/${category.path}`}>
                    <Label color={category.color} tag>
                      {category.name}
                    </Label>
                  </Link>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Card.Content>
      </Card>

      <PostListContainer posts={posts} />
    </Container>
  </div>
);

export default HomePage;
