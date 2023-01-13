import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RoomStatus } from "../components/rooms/RoomRowStyled";

afterEach(cleanup);

test("Renders green tag with text AVAILABLE if the current room is available", () => {
  const roomStatus = "Available";
  render(<RoomStatus status={roomStatus}>{roomStatus}</RoomStatus>);

  expect(screen.getByText("Available")).toBeInTheDocument("Available");
});

test("Renders red tag with text BOOKED if the current room is NOT available", () => {
  const roomStatus = "Booked";
  render(<RoomStatus status={roomStatus}>{roomStatus}</RoomStatus>);

  expect(screen.getByText("Booked")).toBeInTheDocument("Booked");
});
