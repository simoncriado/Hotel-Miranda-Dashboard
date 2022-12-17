// React
import React from "react";

import {
  Nav,
  Text,
  Ul,
  LiNext,
  LiNextBtn,
  LiPageNumber,
  LiPageBtn,
} from "./PaginationStyled";
// Component that creates a pagination. Each page contains 10 elements.
const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  totalRooms,
  indexOfLastImage,
  indexOfFirstImage,
}) => {
  // Creates an array that holds all the page numbers from 1 to the total number of pages (this variable coming from the parent component)
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // Goes to next or prev page if the user is not at the last page or first page respectively
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Nav aria-label="Page navigation example relative ">
      <Text>
        Showing rooms {indexOfFirstImage} to {indexOfLastImage} from a total of{" "}
        {totalRooms} Rooms{" "}
      </Text>
      <Ul>
        <LiNext>
          <LiNextBtn onClick={prevPage} style={{ marginRight: 20 }}>
            <span>Prev</span>
          </LiNextBtn>
        </LiNext>
        {/* Creating a button with the number of the page for each page */}
        {pageNumbers.map((pgNumber) => (
          <LiPageNumber key={pgNumber}>
            <LiPageBtn
              $type={
                currentPage === pgNumber ? "currentPage" : "notCurrentPage"
              }
              onClick={() => setCurrentPage(pgNumber)}
            >
              {pgNumber}
            </LiPageBtn>
          </LiPageNumber>
        ))}

        <LiNext>
          <LiNextBtn onClick={nextPage} style={{ marginLeft: 20 }}>
            <span>Next</span>
          </LiNextBtn>
        </LiNext>
      </Ul>
    </Nav>
  );
};

export { Pagination };
