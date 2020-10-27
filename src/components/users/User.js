import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

// SECTION: Components
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({ match }) => {
	const {
		user: {
			name,
			avatar_url,
			location,
			bio,
			blog,
			company,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		},
		loading,
		getUser,
		repos,
		getUserRepos,
	} = useContext(GithubContext);

	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// eslint - disable - next - line;
	}, []);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<>
				<Link to='/' className='btn btn-light'>
					Back to Search
				</Link>
				Hireable:{' '}
				{hireable ? (
					<i className='fas fa-check text-success' />
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2 rounded'>
					<div className='all-center'>
						<img
							src={avatar_url}
							className='round-img'
							alt=''
							style={{ width: '150px' }}
						/>
						<h1>{name}</h1>
						<p>Location: {location}</p>
					</div>
					<div className='github-bio'>
						{bio && (
							<>
								<h3>Bio</h3>
								<p>{bio}</p>
							</>
						)}
						<a href={html_url} className='btn btn-dark my-1 rounded'>
							Visit GitHub Profile
						</a>
						<ul>
							<li>
								{login && (
									<>
										<strong>Username: </strong> {login}
									</>
								)}
							</li>
							<li>
								{company && (
									<>
										<strong>Company: </strong> {company}
									</>
								)}
							</li>
							<li>
								{blog && (
									<>
										<strong>Blog: </strong> {blog}
									</>
								)}
							</li>
						</ul>
						<img
							src={`https://github-readme-stats.vercel.app/api?username=${login}&show_icons=true`}
							alt='GitHub Stats'
						/>
					</div>
				</div>
				<div className='card text-center rounded'>
					<div className='badge badge-primary'>Followers: {followers}</div>
					<div className='badge badge-success'>Following: {following}</div>
					<div className='badge badge-light'>Public Repos: {public_repos}</div>
					<div className='badge badge-dark'>Public Gists: {public_gists}</div>
				</div>
				<div className='card rounded' style={{ display: 'flex' }}>
					<div style={{ width: '49%' }}>
						<h1>Repositories:</h1>
						<Repos repos={repos} />
					</div>
				</div>
			</>
		);
	}
};

export default User;
