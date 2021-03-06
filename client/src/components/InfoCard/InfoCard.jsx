/** @format */

import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequests.js';
import { logout } from '../../actions/AuthActions';
import Select from 'react-select';
import { programmingLanguageOptions } from '../../docs/data';

const InfoCard = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [modalOpened, setModalOpened] = useState(false);
	const profileUserId = params.id;
	const [profileUser, setProfileUser] = useState({});
	const { user } = useSelector(state => state.authReducer.authData);

	const handleLogOut = () => {
		dispatch(logout());
	};

	useEffect(() => {
		const fetchProfileUser = async () => {
			if (profileUserId === user._id) {
				setProfileUser(user);
			} else {
				console.log('fetching');
				const profileUser = await UserApi.getUser(profileUserId);
				setProfileUser(profileUser);
				console.log(profileUser);
			}
		};
		fetchProfileUser();
	}, [user]);

	return (
		<div className='InfoCard'>
			<div className='infoHead'>
				<h4>Profile Info</h4>
				{user._id === profileUserId ? (
					<div>
						<UilPen
							width='2rem'
							height='1.2rem'
							onClick={() => setModalOpened(true)}
						/>
						<ProfileModal
							modalOpened={modalOpened}
							setModalOpened={setModalOpened}
							data={user}
						/>
					</div>
				) : (
					''
				)}
			</div>

			<div className='info'>
				{/* */}
				<span>
					<b>First Name: </b>
				</span>
				<span>{profileUser.firstname}</span>
			</div>
			<div className='info'>
				<span>
					<b>Last Name: </b>
				</span>
				<span>{profileUser.lastname}</span>
			</div>
			<div className='info'>
				<span>
					<b>Username </b>
				</span>
				<span>{profileUser.username}</span>
			</div>

			<div className='info'>
				<span>
					<b>Languages </b>
				</span>
				<span><Select
					isMulti 
					name="languages"
					value={(profileUser.languages || []).map(language => ({ label: language }))}
					options={programmingLanguageOptions}
					closeMenuOnSelect={false}
					className="basic-multi-select"
					classNamePrefix="select"
					isDisabled={true}
				/></span>
			</div>

			<button className='button logout-button' onClick={handleLogOut}>
				Log Out
			</button>
		</div>
	);
};

export default InfoCard;