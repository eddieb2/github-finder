import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// SECTION: Style Sheets
import './App.css';

// SECTION: Components
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends React.Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};

	//NOTE: Gets the users from GitHub API
	async componentDidMount() {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
		);

		this.setState({ users: res.data, loading: false });
	}

	// NOTE:  Search for GitHub users
	searchUsers = async (text) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// NOTE: Clear Users from start
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	// NOTE: Sets the alert message
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 5000);
	};

	// NOTE: Get a single GitHub user
	getUser = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
		);

		this.setState({ user: res.data, loading: false });
	};

	// NOTE: Get user's repo
	getUserRepos = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
		);

		this.setState({ repos: res.data, loading: false });
	};

	render() {
		const { users, user, repos, loading, alert } = this.state;

		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users loading={loading} users={users} />
									</>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
