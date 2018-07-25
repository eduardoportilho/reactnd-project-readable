import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePageContainer from "../containers/HomePageContainer";
import CategoryPageContainer from "../containers/CategoryPageContainer";
import PostPageContainer from "../containers/PostPageContainer";
import NewPostPageContainer from "../containers/NewPostPageContainer";
import RouteNotFound from "../components/RouteNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route
          path="/category/:categoryPath"
          component={CategoryPageContainer}
        />
        <Route path="/post/:postId" component={PostPageContainer} />
        <Route path="/new-post" component={NewPostPageContainer} />
        <Route component={RouteNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
