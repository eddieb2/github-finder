import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

// SECTION: Components
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = () => {
	const { users, loading } = useContext(GithubContext);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div style={userStyle}>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem',
	marginTop: '2%',
	marginBottom: '2%',
	padding: '1%',
};

export default Users;
