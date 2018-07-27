import React from "react";
import { Link } from "react-router-dom";
import { Card, Label, List } from "semantic-ui-react";

const CategoryList = ({ categories }) => (
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
);

export default CategoryList;
