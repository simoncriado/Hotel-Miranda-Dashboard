import React from "react";

// Styles
import { Reviews } from "../dashboard/DashboardStyled";
import { Container } from "../../components/styled/Containers";

// Components
import ReviewsSwiper from "../../components/reviews/Reviews";

const Contact = () => {
  return (
    <Container>
      <Reviews>
        <ReviewsSwiper></ReviewsSwiper>
      </Reviews>
    </Container>
  );
};

export default Contact;
