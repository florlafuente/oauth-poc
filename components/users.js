import React, { useState, useEffect } from 'react';


const Users = () => {
  const [users, setUsers] = useState(null);
  const handleClick = async () => {
    const response = await fetch('/api/fetchUsers');
    const parsedResponse = await response.json();
    setUsers(parsedResponse.users);
  }

  useEffect(() => {
    console.log('users', users);
  }, [users]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h1>Users</h1>
        <button
          style={{ cursor: 'pointer', padding: '1rem 2rem' }}
          onClick={handleClick}
        >
          Get users
        </button>
      </div>
      <div>
        {users?.length  && (
          <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.profile.firstName} ${user.profile.lastName}`}</td>
              <td>{user.profile.email}</td>
            </tr>
          ))}

        </table>
        )}
      </div>
    </div>
  );
};

export default Users;