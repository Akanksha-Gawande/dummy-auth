import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      history.push('/login');
      return;
    }

    fetch(`https://dummyjson.com/users/${userData.id}`)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('userDetails', JSON.stringify(data));
        setUser(data);
      });
  }, [history]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className='profile-container'>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      {/* Add more user details as needed */}
    </div>
  );
};

export default Profile;
