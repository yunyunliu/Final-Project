import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import HomeView from './pages/HomeView';
import PageHeader from './pages/components/PageHeader';
import DashboardView from './pages/BoardView';

const App = ({ data }) => {
  return (
    <Router>
      {/* stuff outside Switch will apear in every view */}
      <PageHeader />
      <Switch>
        {/* swappable views go here */}
        {/* <Route path="/login">
          <HomeView />
        </Route> */}
          <Route path="/board">
        <DashboardView />
        </Route>
        <Route path="/">
          <HomeView boards={data}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
