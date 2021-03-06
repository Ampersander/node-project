/** @format */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';
const User = ({ person }) => {
	const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user } = useSelector(state => state.authReducer.authData);
	const dispatch = useDispatch();

	const [following, setFollowing] = useState(
		person.followers.includes(user._id)
	);
	const handleFollow = () => {
		console.log(person._id);
		following
			? dispatch(unfollowUser(person._id, user))
			: dispatch(followUser(person._id, user));
		setFollowing(prev => !prev);

	



	};
	return (
		<div className='fromUser'>
			<div>
				<img
					src={'/images/defaultProfile.png'}
					alt='profile'
					className='fromUserImage'
				/>
				<div className='name'>
					<span>{person.firstname}</span>
					<span>@{person.username}</span>
				</div>
			</div>
			<button
				className={
					following
						? 'button fc-button UnfollowButton'
						: 'button fc-button'
				}
				onClick={handleFollow}
			>
				{following ? "Cancel" : "Add  friend"}
			</button>
			
		</div>
	);
};

export default User;