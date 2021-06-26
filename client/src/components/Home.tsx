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
      <h1 style={{ paddingBottom: 20 }}>This is a simple CRUD application with JWT authentication managed by cookies</h1>
      <h1>Please login as admin to view and manage the tasks of all users</h1>
      <h1 style={{ paddingBottom: 20, color: '#DC143C' }}>Email: admin@gmail.com, Password: admin</h1>
      <h1>Please register and log in as a user to manage your tasks</h1>
    </div>
  );
};
export default Home;
