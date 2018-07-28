import React from "react";
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

      <PostListContainer posts={posts} />

      <CategoryList categories={categories} />
    </Container>
  </div>
);

export default HomePage;
