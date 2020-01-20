import React, { Component } from 'react';
import './App.css';
import Form from './components/Form/Form';
import UsersList from './components/UsersList/UsersList';
import Home from './components/Home/Home';
import Help from './components/Help/Help';
import About from './components/About/About';
import Drawer from './components/Drawer/Drawer';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserSuccess } from './redux/actionCreators';


class App extends Component {

  render() {
    return (
      <Drawer>
        <Switch> 
          <Route exact path='/' render={props => <Form {...props} addUser={this.props.addUserSuccess} />}/>
          <Route path='/users' render={props => <UsersList {...props} />}/>
          <Route path='/home' render={props => <Home {...props} users={this.props.users} />}/>
          <Route path='/help' render={props => <Help {...props} />}/>
          <Route path='/about' render={props => <About {...props} />}/>
        </Switch>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserSuccess: (user) => dispatch(addUserSuccess(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
