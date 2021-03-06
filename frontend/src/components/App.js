import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePageContainer from "../containers/HomePageContainer";
import CategoryPageContainer from "../containers/CategoryPageContainer";
import PostPageContainer from "../containers/PostPageContainer";
import NewPostPageContainer from "../containers/NewPostPageContainer";
import EditPostPageContainer from "../containers/EditPostPageContainer";
import RouteNotFound from "../components/RouteNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route path="/edit-post/:postId" component={EditPostPageContainer} />
        <Route path="/new-post" component={NewPostPageContainer} />
        <Route path="/:categoryPath/:postId" component={PostPageContainer} />
        <Route path="/:categoryPath" component={CategoryPageContainer} />
        <Route component={RouteNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
