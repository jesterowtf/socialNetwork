import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuth
  }
}

const withAuthRedirect = (Component) => {
  const HocComponent = ({...props}) => {
    if (!props.auth) {
      return <Navigate to='/login'/>
    }
  return <Component {...props} />;
  }
  return connect(mapStateToProps)(HocComponent)
};


export default withAuthRedirect;