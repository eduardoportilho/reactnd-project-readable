import React from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

import PageHeader from "./PageHeader";
import CategoryList from "./CategoryList";
import PostListContainer from "../containers/PostListContainer";

const HomePage = ({ errorFetchingData, categories, posts }) => (
  <div>
    <PageHeader />
    <Container text style={{ marginTop: "7em" }}>
      <Header as="h1">Welcome to Readable!</Header>

      {errorFetchingData && <div>Error: {errorFetchingData} </div>}

      <CategoryList categories={categories} />
      <PostListContainer posts={posts} />
    </Container>
  </div>
);

export default HomePage;
