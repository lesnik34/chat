import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import Chat from './pages/Chat/Chat'
import Home from './pages/Home/Home'
import {connect} from "react-redux";


function App(props) {
  return (
      <Switch>
          <Route exact path='/'>
              { props.isAuth ? <Redirect to='/chat' /> : <Home /> }
          </Route>

          { props.isAuth ? <Route path='/chat' component={Chat} /> : null }

          <Redirect to='/' />
      </Switch>
  )
}

function mapStateToProps(state) {
    return {
        isAuth: state.profile.isAuth
    }
};

export default connect(mapStateToProps)(App);
