// React
import React, { useState, useEffect } from "react";

// Local data
import ReviewsList from "../../data/reviews";

// Styled Components
import { Reviews } from "../dashboard/DashboardStyled";
import { Container } from "../../components/styled/Containers";
import {
  Table,
  HeaderTitle,
  TableActions,
  TableFilters,
  FilterButton,
  TableButtons,
} from "../../components/styled/Tables";
import { CreateButton } from "../../components/styled/Buttons";
import { DropdownMenu } from "../../components/styled/DropdownMenu";

// Components
import ReviewsSwiper from "../../components/reviews/Reviews";
import { ReviewRow } from "../../components/reviews/ReviewRow";
import { Pagination } from "../../components/pagination/Pagination";

const Contact = () => {
  const [reviews, setReviews] = useState(ReviewsList);
  const [activeFilter, setActiveFilter] = useState("");
  const [currentReviews, setCurrentReviews] = useState([]);

  const getAllReviews = () => {
    setReviews(ReviewsList);
  };

  const filterByType = (type) => {
    setReviews(ReviewsList.filter((review) => review.archived === type));
  };

  // useEffect(() => {
  //   // Filtering by dropdown selection based on the filtered by search input array (in case the user used the search bar)
  //   const orderedReviews = [...ReviewsList];
  //   switch (activeFilter) {
  //     case "Room Nr.":
  //       orderedReviews.sort((a, b) => a.room_number - b.room_number);
  //       break;
  //     case "Highest rate first":
  //       orderedReviews.sort((a, b) => b.room_rate - a.room_rate);
  //       break;
  //     case "Lowest rate first":
  //       orderedReviews.sort((a, b) => a.room_rate - b.room_rate);
  //       break;
  //     default:
  //       break;
  //   }
  //   setReviews(orderedReviews);
  // }, [activeFilter]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  const indexOfLastImage = currentPage * roomsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage = indexOfLastImage - roomsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentReviews(reviews.slice(indexOfFirstImage, indexOfLastImage));
  }, [reviews, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages = Math.ceil(reviews.length / roomsPerPage);

  return (
    <>
      <Container>
        <Reviews>
          <ReviewsSwiper></ReviewsSwiper>
        </Reviews>
      </Container>
      <TableActions>
        <TableFilters>
          <FilterButton onClick={getAllReviews}>
            All Customer Reviews
          </FilterButton>
          <FilterButton onClick={() => filterByType(false)}>
            Published
          </FilterButton>
          <FilterButton onClick={() => filterByType(true)}>
            Archived
          </FilterButton>
        </TableFilters>
        <TableButtons>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            options={["Newest"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>
      <Container>
        <Table>
          <thead>
            <tr>
              <HeaderTitle>Order ID</HeaderTitle>
              <HeaderTitle>Date</HeaderTitle>
              <HeaderTitle>Customer</HeaderTitle>
              <HeaderTitle>Comment</HeaderTitle>
              <HeaderTitle>Action</HeaderTitle>
            </tr>
          </thead>
          <tbody className="task-container">
            {currentReviews.length > 0 &&
              currentReviews.map((review, index) => (
                <ReviewRow
                  key={review.id}
                  index={index}
                  review={review}
                  number={review.id}
                />
              ))}
          </tbody>
        </Table>
      </Container>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dataDisplayed={"reviews"}
        totalRooms={reviews.length}
        indexOfFirstImage={indexOfFirstImage}
        indexOfLastImage={indexOfLastImage}
      />
    </>
  );
};

export default Contact;
