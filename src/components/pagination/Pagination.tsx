// Styled Components
import {
  Nav,
  Text,
  Ul,
  LiNext,
  LiNextBtn,
  LiPageNumber,
  LiPageBtn,
} from "./PaginationStyled";

// Component that creates a pagination bar. Each page contains 10 elements.
const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  dataDisplayed,
  totalRooms,
  indexOfLastImage,
  indexOfFirstImage,
}: any) => {
  // Creates an array that holds all the page numbers from 1 to the total number of pages (this variable is coming from the parent component)
  const pageNumbers: number[] = [...Array(nPages + 1).keys()].slice(1);

  // Goes to next or prev page if the user is not at the last page or first page respectively
  const nextPage = (): void => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = (): void => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Nav aria-label="Page navigation example relative ">
      {/* Shows the current elements (rooms, bookings, etc) that are currently been displayed */}
      <Text>
        Showing {dataDisplayed} {indexOfFirstImage} to{" "}
        {indexOfLastImage > totalRooms ? totalRooms : indexOfLastImage} from a
        total of {totalRooms} {dataDisplayed}
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
              currentPage={
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
