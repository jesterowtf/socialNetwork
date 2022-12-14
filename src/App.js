import "./App.scss";
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useLayoutEffect, Suspense, lazy} from "react";
import Preloader from "./UI/Preloader/Preloader";
import {checkAuth} from "./redux/auth-reducer";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import {getInitialized} from "./redux/selectors/app-selectors";
import {getAuthUserId} from "./redux/selectors/login-selectors";
import {initializeApp} from "./redux/app-reducer";

const Profile = lazy(() => import('./components/Profile/Profile'));
const Users = lazy(() => import('./components/Users/Users'));
const Dialogs = lazy(() => import('./components/Dialogs/Dialogs'));
const Feed = lazy(() => import('./components/Feed/Feed'));

export const App = (props) => {
  const initialized = useSelector(getInitialized)
  const authUserId = useSelector(getAuthUserId)

  const dispatch = useDispatch()
  const token = !!localStorage.getItem('token')

  useLayoutEffect(() => {
    if (!token) {
      dispatch(checkAuth())
    }
  }, [dispatch, token])

  useEffect(() => {
    dispatch(initializeApp())
  }, [authUserId, dispatch])

  if (!initialized) {
    return <Preloader/>
  }

  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <div className="content">
        <Suspense fallback={<div><Preloader/></div>}>
          <Routes>
            <Route path="/dialogs/:userId" element={ <Dialogs/>}/>
            <Route path="/dialogs/" element={ <Dialogs/>}/>
            <Route path="/profile/:userId" element={<Profile/>}/>
            <Route path="/feed/" element={<Feed/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/users" element={<Users/>}/>
          </Routes>
        </Suspense>
      </div>
      <Footer/>
    </div>
  );
};
