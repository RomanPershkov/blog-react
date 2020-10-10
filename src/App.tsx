import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import 'antd/dist/antd.css';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Post from './components/Post';
import Edit from './components/Edit';
import Create from './components/create';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navbar />
        <div className={'container'}>
          <Switch>
            <Route path={"/"} exact={true} component={Home} />
            <Route path={"/post/:postId"} component={Post} />
            <Route path={"/edit/:postId"} component={Edit} />
            <Route path={"/create"} component={Create} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
