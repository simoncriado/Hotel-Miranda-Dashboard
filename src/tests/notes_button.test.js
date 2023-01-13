import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NotesButton } from "../components/bookings/BookingRowStyled";

afterEach(cleanup);

test("Renders ACTIVE button if there is a special request attached to the current booking", () => {
  const specialRequest = "This is a special request";
  render(
    <NotesButton type={specialRequest}>
      {specialRequest === "" ? "No Notes" : "View Notes"}
    </NotesButton>
  );
  expect(screen.getByRole("button")).toHaveTextContent("View Notes");
  expect(screen.getByRole("button")).toHaveStyle("backgroundColor: #eef9f2");
  expect(screen.getByRole("button")).toHaveStyle("color: #212121");
});

test("Renders INACTIVE button if there is NOT a special request attached to the current booking", () => {
  const specialRequest = "";
  render(
    <NotesButton type={specialRequest}>
      {specialRequest === "" ? "No Notes" : "View Notes"}
    </NotesButton>
  );
  expect(screen.getByRole("button")).toHaveTextContent("No Notes");
  expect(screen.getByRole("button")).toHaveStyle("backgroundColor: white");
  expect(screen.getByRole("button")).toHaveStyle("color: #799283");
});
