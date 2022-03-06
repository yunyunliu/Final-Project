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
      <PageHeader />
      <Switch>
        <Route path='/boards/:boardId'>
          <BoardView />
        </Route>
        <Route path='/'>
          {/* <HomeView /> */}
          <BoardView />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
