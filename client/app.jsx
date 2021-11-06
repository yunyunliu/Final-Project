import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import HomeView from './pages/HomeView';
import PageHeader from './pages/components/PageHeader';
import BoardView from './pages/BoardView';

const App = () => {
  return (
    <Router>
      {/* stuff outside Switch will apear in every view */}
      <PageHeader />
      <Switch>
        {/* swappable views go here */}
        <Route path="/api/users/1/boards/:boardId">
          <BoardView />
        </Route>
        <Route path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
