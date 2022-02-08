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
      {/* stuff outside Switch will appear in every view */}
      <PageHeader />
      <Switch>
        {/* swappable views go here */}
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
