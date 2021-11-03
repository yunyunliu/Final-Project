import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import HomeView from './pages/HomeView';
import PageHeader from './pages/components/PageHeader';
import BoardView from './pages/BoardView';

export default class App extends React.Component {
  // top nav with branding and banner plus routing goes here
  render() {
    return (
      <Router>
        {/* stuff outside Switch will apear in every view */}
        <PageHeader />
        <Switch>
          {/* swappable views go here */}
          <Route path="/login">
          <HomeView />
          </Route>
          <Route path="/boards/">
          <BoardView />
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </Router>
    );
  }
}
