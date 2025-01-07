import React from 'react';

export default function UserDetails({ user, setIsEditing }) {
  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
    </div>
  );
}
