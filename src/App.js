import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// SECTION: Style Sheets
import './App.css';

// SECTION: Components
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import NotFound from './components/pages/NotFound';

// SECTION: Context State
import GithubContext from './context/github/githubContext';

const App = () => {
	const { getInitialUsers } = useContext(GithubContext);

	useEffect(() => {
		getInitialUsers();
	}, []);

	return (
		<Router>
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={alert} />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
						<Route exact path='/user/:login' component={User} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;
