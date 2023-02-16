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
  const pageNumbersTotal: number[] = [...Array(nPages + 1).keys()].slice(1);
  const last = pageNumbersTotal.length;

  const paginate = (current: number, max: number) => {
    if (!current || !max) return null;

    let items: any = [1];

    if (current === 1 && max === 1) return { current, items };
    if (current > 4) items.push("...");

    let r = 2,
      r1 = current - r,
      r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

    if (r2 + 1 < max) items.push("...");
    if (r2 < max) items.push(max);

    return { current, items };
  };
  const pageNumbersShort = paginate(currentPage, last);

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
        {pageNumbersShort &&
          pageNumbersShort.items.map((pgNumber: any, index: number) => (
            <LiPageNumber key={index}>
              <LiPageBtn
                currentPage={
                  currentPage === pgNumber ? "currentPage" : "notCurrentPage"
                }
                onClick={() => {
                  if (pgNumber !== "...") {
                    setCurrentPage(pgNumber);
                  }
                }}
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
