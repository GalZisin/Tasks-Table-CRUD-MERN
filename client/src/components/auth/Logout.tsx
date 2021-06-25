import { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../actions/userActions';
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

export const Logout = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const logoutHandler = (): void => {
    dispatch(logout());
    alert.success('Logged out successfully.')
  }
  return (
    <Fragment>
      <NavLink to="/" onClick={logoutHandler} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
