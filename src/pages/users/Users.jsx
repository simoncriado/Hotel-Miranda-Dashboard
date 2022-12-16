// React
import React from "react";
import { useState } from "react";

// Local data
import UsersList from "../../data/users";

// Styles
import { Table, HeaderTitle } from "../../components/styled/Tables";
import { Container } from "../../components/styled/Containers";

// Components
import { UserRow } from "../../components/users/UserRow";

// Component that creates a table and add a row for each item in the data base
const Users = () => {
  const [users, setUsers] = useState(UsersList);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <HeaderTitle>Name</HeaderTitle>
            <HeaderTitle>Job Desk</HeaderTitle>
            <HeaderTitle>Contact</HeaderTitle>
            <HeaderTitle>Status</HeaderTitle>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => (
              <UserRow
                key={user.id}
                index={index}
                user={user}
                number={user.id}
              />
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
