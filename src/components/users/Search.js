import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const { users, clearUsers, searchUsers } = useContext(GithubContext);
	const { setAlert } = useContext(AlertContext);

	const [text, setText] = useState('');

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			setAlert('Please enter something', 'light');
		} else {
			searchUsers(text);
			setText('');
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='text'
					placeholder='Search Users...'
					value={text}
					onChange={onChange}
					className='rounded btn'
				/>
				<input type='submit' value='Search' className='btn btn-dark btn-block rounded' />
			</form>
			{users.length > 0 && (
				<button className='btn btn-danger btn-block rounded' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
