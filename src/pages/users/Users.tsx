// React & Router
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Redux
import { getDataUsers } from "../../features/users/usersSlice";

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
import { Loader } from "../../components/styled/Loader";
import { CreateButton } from "../../components/styled/Buttons";

// Components
import { UserRow } from "../../components/users/UserRow";
import { Pagination } from "../../components/pagination/Pagination";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserInt } from "../../interfaces/UserInt";

type UsersType = {
  usersList: UserInt[];
};
type StatusType = {
  status: string;
};

// Component that creates a table and add a row for each item in the data base
const Users = () => {
  const dispatch = useAppDispatch();
  const { usersList } = useAppSelector<UsersType>(
    (state) => state.usersReducer
  );
  const { status } = useAppSelector<StatusType>((state) => state.usersReducer);

  const [users, setUsers] = useState<UserInt[]>(usersList);
  const [activeFilter, setActiveFilter] = useState<string>("Start date");
  const [currentUsers, setCurrentUsers] = useState<UserInt[]>([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (usersList.length === 0) {
      setTimeout(() => {
        dispatch(getDataUsers());
      }, 1000);
    }
    setUsers(usersList);
  }, [usersList, dispatch]);

  const getAllUsers = (): void => {
    setUsers(usersList);
  };

  const filterByType = (type: string): void => {
    setUsers(usersList.filter((user) => user.state === type));
  };

  useEffect(() => {
    const orderedUsers: UserInt[] = [...usersList];
    switch (activeFilter) {
      case "Start date":
        orderedUsers.sort((a: UserInt, b: UserInt) => {
          let dateA: string = a.date;
          let dateB: string = b.date;
          if (dateB.split("/").join() > dateA.split("/").join()) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "Name":
        orderedUsers.sort((a: UserInt, b: UserInt) => {
          const nameA: string = a.name.toUpperCase().replace(/\s/g, "");
          const nameB: string = b.name.toUpperCase().replace(/\s/g, "");
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
  }, [activeFilter, usersList]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(10);
  const indexOfLastImage: number = currentPage * usersPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage: number = indexOfLastImage - usersPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentUsers(users.slice(indexOfFirstImage, indexOfLastImage));
  }, [users, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages: number = Math.ceil(users.length / usersPerPage);

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
          <CreateButton>
            <NavLink to="/newUser">+ New User</NavLink>
          </CreateButton>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            options={["Start date", "Name"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
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
                  currentUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
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
      )}
    </>
  );
};

export default Users;
