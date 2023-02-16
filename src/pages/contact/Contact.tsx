// React
import { useState, useEffect } from "react";

// Redux
import { getDataReviews } from "../../features/contact/contactSlice";

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
import { DropdownMenu } from "../../components/styled/DropdownMenu";

// Components
import ReviewsSwiper from "../../components/reviews/Reviews";
import { ReviewRow } from "../../components/reviews/ReviewRow";
import { Pagination } from "../../components/pagination/Pagination";
import { Loader } from "../../components/styled/Loader";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ReviewInt } from "../../interfaces/ReviewInt";

type ReviewsType = {
  reviewsList: ReviewInt[];
};
type StatusType = {
  status: string;
};
type UpdateType = {
  update: boolean;
};

const Contact = () => {
  const dispatch = useAppDispatch();
  const { reviewsList } = useAppSelector<ReviewsType>(
    (state) => state.contactReducer
  );
  const { status } = useAppSelector<StatusType>(
    (state) => state.contactReducer
  );

  const { update } = useAppSelector<UpdateType>(
    (state) => state.contactReducer
  );

  const [reviews, setReviews] = useState<ReviewInt[]>(reviewsList);
  const [activeFilter, setActiveFilter] = useState<string>("Date");
  const [currentReviews, setCurrentReviews] = useState<ReviewInt[]>([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (update) {
      setTimeout(() => {
        dispatch(getDataReviews());
      }, 1000);
    }
    setReviews(reviewsList);
  }, [reviewsList, dispatch, update]);

  const getAllReviews = (): void => {
    setReviews(reviewsList);
  };

  const filterByType = (type: boolean): void => {
    setReviews(reviewsList.filter((review) => review.archived === type));
  };

  useEffect(() => {
    const orderedReviews = [...reviewsList];
    switch (activeFilter) {
      case "Date":
        orderedReviews.sort((a: ReviewInt, b: ReviewInt) => {
          let dateA: Date = new Date(a.date);
          let dateB: Date = new Date(b.date);
          if (dateB < dateA) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "User":
        orderedReviews.sort((a: ReviewInt, b: ReviewInt) => {
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
    setReviews(orderedReviews);
  }, [activeFilter, reviewsList]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage] = useState<number>(10);
  const indexOfLastImage: number = currentPage * roomsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage: number = indexOfLastImage - roomsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentReviews(reviews.slice(indexOfFirstImage, indexOfLastImage));
  }, [reviews, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages: number = Math.ceil(reviews.length / roomsPerPage);

  return (
    <>
      {status === "loading" ? (
        <Loader />
      ) : (
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
                options={["Date", "User"]}
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
                  currentReviews.map((review: any, index: number) => (
                    <ReviewRow key={index} review={review} />
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
      )}
    </>
  );
};

export default Contact;
