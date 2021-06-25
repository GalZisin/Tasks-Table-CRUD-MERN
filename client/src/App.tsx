import AppNavbar from './components/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/route/ProtectedRoute'
import Home from './components/Home';
import AdminTasks from './components/AdminTasks';
import MyTasks from './components/MyTasks';
import UpdateTask from './components/UpdateTask';

const App = () => {

  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <ProtectedRoute path='/admin/tasks' isAdmin={true} component={AdminTasks} exact />
        <ProtectedRoute path={'/tasks/me'} component={MyTasks} />
        <ProtectedRoute path="/task/:id" component={UpdateTask} />
      </Switch>
    </Router>
  );
};

export default App;
