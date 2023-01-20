import styled from "styled-components";

const CalendarContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  font-family: var(--font-poppins);

  .fc-toolbar-title {
    display: inline;
    vertical-align: middle;
    font-size: 2rem;
    font-weight: 400;
    margin: 0 1.5rem;
  }
  #title-calendar {
    color: #393939;
    position: absolute;
    top: 0.5rem;
    margin-top: 0;
    font-size: 2rem;
    font-weight: 400;
  }
  .fc .fc-button-primary {
    color: #799283;
    font-size: 1.6rem;
    background: none;
    border: none;
    &:active,
    &:focus,
    &:focus-visible {
      color: #799283;
      background: none;
      border: none;
      box-shadow: none;
    }
    &:active:focus {
      box-shadow: none;
    }
  }
  .fc-today-button {
    text-transform: capitalize;
    background-color: #135846 !important;
    color: #ffffff !important;
  }
  table {
    border-collapse: separate;
    border: none;
  }
  .fc .fc-scroller-liquid-absolute,
  .fc-scroller {
    overflow: hidden !important;
  }
  .fc-theme-standard th,
  .fc-theme-standard td,
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }
  .fc-col-header-cell {
    font-size: 1.6rem;
    font-weight: 500;
    color: #799283;
    padding: 1.5rem 0;
  }
  .fc-day {
    font-family: var(--font-poppins);
    cursor: pointer;
  }
  .fc-day-disabled {
    background-color: #ffffff;
  }
  .fc-daygrid-day {
    border-radius: 12px;
    width: 53px;
    height: 53px;
  }
  .fc-daygrid-day-frame {
    height: 100%;
    font-size: 2rem;
  }
  .fc-daygrid-day-top {
    display: flex;
    width: 80%;
    margin: auto;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  .fc-day-today {
    border: 1px solid #393939 !important;
  }
  .fc-daygrid-day-events {
    display: none;
  }
  .fc-event {
    border-radius: 1.2rem;
    opacity: 1;
    width: 70%;
    height: 90%;
    margin: auto;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
  margin-top: 5rem;
`;

const BookingsContainer = styled.div`
  max-height: ${(props) => (props.viewMore === true ? "150rem" : "35rem")};
  overflow: hidden;
  margin-top: 3rem;
  transition: max-height 0.3s ease-in-out;
  p {
    margin-top: 0;
  }
`;

const ViewMoreBtn = styled.button`
  border: none;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  top: ${(props) => (props.viewMore === true ? "-1rem" : "-3rem")};
  font-family: var(--font-poppins);
  font-size: 1.6rem;
  font-weight: 500;
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  display: block;
  position: relative;
  margin: auto;
  line-height: 8rem;
  opacity: ${(props) => (props.disabled === true ? "0.4" : "1")};
  cursor: ${(props) => (props.disabled === true ? "auto" : "pointer")};
  color: ${(props) => (props.viewMore === true ? "#E23428" : "#135846")};
  transition: all 0.3s;
  &:hover {
    font-size: ${(props) => (props.disabled === true ? "1.6rem" : "1.9rem")};
  }
`;

export { CalendarContainer, Divider, BookingsContainer, ViewMoreBtn };
