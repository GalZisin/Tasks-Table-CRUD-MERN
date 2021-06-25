import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useHistory } from 'react-router-dom'

const Home = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {

    if (isAuthenticated && user.role === 'admin') {
      history.push('/admin/tasks')
    } else if (isAuthenticated && user.role === 'user') {
      history.push('/tasks/me')
    }
  }, [dispatch, user, history, isAuthenticated]);

  return (
    <div style={{ textAlign: 'center', color: 'black' }}>
      <h1 style={{ paddingBottom: 20 }}>welcome!</h1>
      <h1 style={{ paddingBottom: 20 }}>This is a simple CRUD application</h1>
      <h1>Please login as admin to view all user tasks</h1>
      <h1 style={{ paddingBottom: 20 }}>Email: admin@gmail.com, Password: admin</h1>
      <h1>Please register as user to view only users tasks</h1>
    </div>
  );
};
export default Home;
