import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// SECTION: Context State
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

ReactDOM.render(
	<React.StrictMode>
		<GithubState>
			<AlertState>
				<App />
			</AlertState>
		</GithubState>
	</React.StrictMode>,
	document.getElementById('root')
);
