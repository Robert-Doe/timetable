import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Batches from "./pages/batch/Batches";
import ViewBatch from "./pages/batch/ViewBatch";
import UpdateBatch from "./pages/batch/UpdateBatch";
import Lecturers from "./pages/lecturer/Lecturers";
import ViewLecturer from "./pages/lecturer/ViewLecturer";
import UpdateLecturer from "./pages/lecturer/UpdateLecturer";
import ViewDepartment from "./pages/department/ViewDepartment";
import Departments from "./pages/department/Departments";
import ViewCourse from "./pages/course/ViewCourse";
import UpdateCourse from "./pages/course/UpdateCourse";
import Courses from "./pages/course/Courses";
import ViewHall from "./pages/hall/ViewHall";
import UpdateHall from "./pages/hall/UpdateHall";
import Halls from "./pages/hall/Halls";
import ViewPair from "./pages/pairing/ViewPair";
import UpdatePair from "./pages/pairing/UpdatePair";
import Pairings from "./pages/pairing/Pairings";
import ViewSession from "./pages/session/ViewSession";
import UpdateSession from "./pages/session/UpdateSession";
import Sessions from "./pages/session/Sessions";



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/batches' component={Batches} />
          <Route path='/batches/v/:id' component={ViewBatch} />
          <Route path='/batches/u/:id' component={UpdateBatch} />
          <Route path='/lecturers' component={Lecturers} />
          <Route path='/lecturers/v/:id' component={ViewLecturer} />
          <Route path='/lecturers/u/:id' component={UpdateLecturer} />
          <Route path='/departments/u/:id' component={UpdateLecturer} />
          <Route path='/departments/v/:id' component={ViewDepartment} />
          <Route path='/departments' component={Departments} />
          <Route path='/courses/v/:id' component={ViewCourse} />
          <Route path='/courses/u/:id' component={UpdateCourse} />
          <Route path='/courses' component={Courses} />
          <Route path='/halls/v/:id' component={ViewHall} />
          <Route path='/halls/u/:id' component={UpdateHall} />
          <Route path='/halls' component={Halls} />
          <Route path='/pairings/v/:id' component={ViewPair}/>
          <Route path='/pairings/u/:id' component={UpdatePair}/>
          <Route path='/pairings' component={Pairings}/>
          <Route path='/sessions/v/:id' component={ViewSession}/>
          <Route path='/sessions/u/:id' component={UpdateSession}/>
          <Route path='/sessions' component={Sessions}/>
        </Switch>
      </Router>

      <button className={'btn btn-danger'}>Chase me</button>
    </>
  );
}

export default App;
