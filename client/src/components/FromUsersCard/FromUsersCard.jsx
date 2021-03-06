/** @format */

import React, { useEffect, useState } from 'react';
import './FromUsersCard.css';
import FromUsersModal from '../FromUsersModal/FromUsersModal';
import { getAllUser, getUserFriends } from '../../api/UserRequests';
import User from '../User/User';
import { useSelector } from 'react-redux';
const FromUsersCard = ({ location }) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [persons, setPersons] = useState([]);
	const { user } = useSelector(state => state.authReducer.authData);

	useEffect(() => {
		const fetchFriends = async () => {
			const { data } = await getUserFriends(user._id);
			console.log(data);
			setPersons(persons.concat(data));
		};

		const fetchPersons = async () => {
			const { data } = await getAllUser();
			console.log(data);
			setPersons(persons.concat(data));
		};
		// fetchFriends();
		fetchPersons();
	}, []);

	return (
		<div className='FromUsersCard'>
			<h3>People you may know</h3>

			{persons.map((person, id) => {
				if (person._id !== user._id)
					return <User person={person} key={id} />;
			})}
			{!location ? (
				<span onClick={() => setModalOpened(true)}>Show more</span>
			) : (
				''
			)}

			<FromUsersModal
				modalOpened={modalOpened}
				setModalOpened={setModalOpened}
			/>
		</div>
	);
};

export default FromUsersCard;