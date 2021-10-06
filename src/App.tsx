import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
//import './App.css';

import Home from './component/Home';
import Test from './component/Test';
import Navbar from './component/Navbar';
/* tasks */
import tasks from './component/tasks/Index';
import taskShow from './component/tasks/Show';
import taskCreate from './component/tasks/Create';
import taskEdit from './component/tasks/Edit';
/* user */
import userCreate from './component/user/Create';
import userLogin from './component/login';
//
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/test' component={Test} />
          {/* tasks */}
          <Route path='/tasks' component={tasks} />
          <Route path='/task_create' component={taskCreate} />
          <Route path='/task_show/:id' component={taskShow} />
          <Route path='/task_edit/:id' component={taskEdit} />
          {/* users */}
          <Route path='/user_create' component={userCreate} />
          <Route path='/login' component={userLogin} />
        </div>
      </Router>
    </div>
  );
}
export default App;
