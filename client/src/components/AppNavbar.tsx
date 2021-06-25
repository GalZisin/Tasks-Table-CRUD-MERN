import React, { Fragment, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { RootState } from '../store';
import { loadUser } from '../actions/userActions';

const AppNavbar = () => {

  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleToggle = () => setIsOpen(!isOpen);
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <div style={{ marginTop: 8, fontSize: 16, color: 'yellow' }}>{user && isAuthenticated ? `Welcome ${user.name}` : ''}</div>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">TodoList</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {user && isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavbar;