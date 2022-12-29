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

export { CalendarContainer, Divider };
