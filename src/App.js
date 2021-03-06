import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {HashRouter, Routes, Route} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import { Settings } from './components/Settings/Settings';
import { Music } from './components/Music/Music';

const DialogsContainer = React.lazy( () => import("./components/Dialogs/DialogsContainer") );
const ProfileContainer = React.lazy( () => import("./components/Profile/ProfileContainer") );



class App extends React.Component {

   componentDidMount() {
      this.props.initializeApp();
   }

   render() {

      if (!this.props.initialized) {

         return <Preloader />

      }


      return (
         <HashRouter>

            <div className='app-wrapper'>
               <HeaderContainer />
               <Navbar />

               <div className='app-wrapper-content'>

                  <Suspense fallback={<Preloader />}>

                     <Routes>
                        <Route
                           path='/profile/:userId'
                           element={
                              <ProfileContainer />} />
                        <Route
                           path='/profile'
                           element={
                              <ProfileContainer/>
                           } />

                        <Route
                           path='/dialogs/*'
                           element={
                              <DialogsContainer />}
                        />
                        <Route
                           path='/users'
                           element={
                              <UsersContainer />}
                        />
                        <Route
                           path='/settings'
                           element={
                              <Settings />}
                        />
                        <Route
                           path='/music'
                           element={
                              <Music />}
                        />
                        <Route
                           path='/login'
                           element={
                              <LoginPage />}
                        />
                        <Route
                           path='/news'
                           element={
                              <News />}
                        />
                     </Routes>

                  </Suspense>

               </div>

            </div>
         </HashRouter>
      );
   }
}

let mapStateToProps = (state) => ({

   initialized: state.app.initialized

})


export default connect( mapStateToProps, {initializeApp} )( App );


//BrowserRouter - ???????????? ?????? - ???? ???????????????????? ???? ?????? ??????
//path='/dialogs/*'
//- ?????? ???????? ?????????? ???? ???????????? ?????????? ???????? ?????????? ?????????? ????????
//???????? ??????
//http://localhost:3000/dialogs/55
