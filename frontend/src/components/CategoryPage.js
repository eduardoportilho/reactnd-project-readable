import React from "react";
import { Container, Header } from "semantic-ui-react";
import PageHeader from "./PageHeader";
import RouteNotFound from "./RouteNotFound";
import PostListContainer from "../containers/PostListContainer";

const CategoryPage = ({
  categoryPath,
  errorFetchingData,
  categories,
  postsFromCategory
}) => {
  const pageCategory =
    categories && categories.find(c => c.path === categoryPath);

  if (!pageCategory) {
    return <RouteNotFound />;
  }
  return (
    <div>
      <PageHeader />
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h1">Category: {pageCategory.name}</Header>

        {errorFetchingData && <div>Error: {errorFetchingData} </div>}

        <PostListContainer posts={postsFromCategory} />
      </Container>
    </div>
  );
};

export default CategoryPage;
