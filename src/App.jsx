import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { LoginPage } from './pages/login-page/login-page';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'js-cookie';

import { Header } from './components/header/header';
import { Confirmation } from './pages/confirm-email-page/confirm-email-page';
import { CoursesPage } from './pages/courses-page/courses-page';
import { PageNotFound } from './pages/404-page/404-page';
import { SubscribtionPage } from './pages/subscribtion-page/subscribtion-page';
import { getRequest } from './utils/helpers/request.helpers';
import { setUser } from './store/actions/user.actions';
import { AdminPage } from './pages/admin-page/admin-page';
import { UserProfilePage } from './pages/profile-page/profile-page'
import { RegisterPage } from './pages/register-page/register-page';
import { AddCoursePage } from './pages/add-course-page/add-course-page';
import { Spin } from 'antd';

export const App = () => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUser = async () => {
      const { status, data } = await getRequest('/applicationUsers/get-authorized');
      if(status === 200){
        dispatch(setUser(data));
      }
    }

    if (!!get("token")) {
      fetchUser();
    }
    else {
      dispatch(setUser({})); 
    }
  }, [dispatch]);

  return (
    <Router>
        {
          user ? <div className="App">
            <Header user={user} />
            <Switch>
              <Route path="/" exact component={CoursesPage}/>
              <Route path="/login" component={() => !user.role ? <LoginPage /> : (user.role === "student" ? <Redirect to="/"/> : <Redirect to="/admin" />)}/>
              <Route path="/confirmation/:userId/:token" component={Confirmation} />
              <Route path="/subscribe/:courseId" component={() => !!user.role ? <SubscribtionPage/> : <Redirect to="/login"/>}/>
              <Route path="/admin" component={() => !user.role ? <Redirect to="/login"/> : (user.role === "student" ? <Redirect to="/"/> : <AdminPage/>)}/>
              <Route path="/addCourse" component={() => !user.role ? <Redirect to="/login"/> : (!user.role === "admin" ? <Redirect to="/404"/> : <AddCoursePage/>)} />
              <Route path="/profile" component={() => !user.role ? <Redirect to="/login"/> : (user.role === "admin" ? <Redirect to="/admin"/> : <UserProfilePage/>)} />
              <Route path="/register" component={RegisterPage} />
              <Route path='/404' component={PageNotFound} />
              <Redirect from='*' to='/404' /> 
            </Switch>
          </div> : <div className="App-loading"><Spin tip="Loading..." /></div>
        }
      </Router> 
  );
}