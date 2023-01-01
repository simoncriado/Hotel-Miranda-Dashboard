// React
import React, { useState, useEffect } from "react";

// Local data
import UsersList from "../../data/users";

// Styled Components
import {
  Table,
  HeaderTitle,
  TableActions,
  TableFilters,
  FilterButton,
  TableButtons,
} from "../../components/styled/Tables";
import { Container } from "../../components/styled/Containers";
import { DropdownMenu } from "../../components/styled/DropdownMenu";

// Components
import { UserRow } from "../../components/users/UserRow";
import { Pagination } from "../../components/pagination/Pagination";

// Component that creates a table and add a row for each item in the data base
const Users = () => {
  const [users, setUsers] = useState(UsersList);
  const [activeFilter, setActiveFilter] = useState("Name");
  const [currentUsers, setCurrentUsers] = useState([]);

  const getAllUsers = () => {
    setUsers(UsersList);
  };

  const filterByType = (type) => {
    setUsers(UsersList.filter((user) => user.state === type));
  };

  useEffect(() => {
    // STILL WORKING ON THE FILTERS BY DATE! ONLY THE ONE BY USERNAME WORDS ATM!
    const orderedUsers = [...UsersList];
    switch (activeFilter) {
      case "Start Date":
        orderedUsers.sort((a, b) => {
          const date1 = new Date("Oct 30th 2022");
          const date2 = new Date(b.orderDate);

          return date1 - date2;
        });
        break;
      case "Name":
        orderedUsers.sort((a, b) => {
          const nameA = a.name.toUpperCase().replace(/\s/g, "");
          const nameB = b.name.toUpperCase().replace(/\s/g, "");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    setUsers(orderedUsers);
  }, [activeFilter]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const indexOfLastImage = currentPage * usersPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage = indexOfLastImage - usersPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentUsers(users.slice(indexOfFirstImage, indexOfLastImage));
  }, [users, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <TableActions>
        <TableFilters>
          <FilterButton onClick={getAllUsers}>All Employees</FilterButton>
          <FilterButton onClick={() => filterByType("ACTIVE")}>
            Active Employees
          </FilterButton>
          <FilterButton onClick={() => filterByType("INACTIVE")}>
            Inactive Employees
          </FilterButton>
        </TableFilters>
        <TableButtons>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            // options={["Order Date", "Guest", "Check In", "Check Out"]}
            options={["Name"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>
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
            {currentUsers.length > 0 &&
              currentUsers.map((user, index) => (
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
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dataDisplayed={"employees"}
        totalRooms={users.length}
        indexOfFirstImage={indexOfFirstImage}
        indexOfLastImage={indexOfLastImage}
      />
    </>
  );
};

export default Users;
