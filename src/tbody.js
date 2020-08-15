import React from 'react';

export default function Tbody ({users}) {
      return (
        <React.Fragment>
          {users.map(user => {
            return (
              <tr key={user.login.uuid}>
                <td>{user.dob.age}</td>
                <td>{user.name.last + ", " + user.name.first}</td>
                <td>{user.gender}</td>
              </tr>
              )
          })}
          </React.Fragment>
      )
}