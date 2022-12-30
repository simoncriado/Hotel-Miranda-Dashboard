// React
import { useState } from "react";

// Full calendar Components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Components
import { SingleBookingCard } from "./SingleBookingCard";

// Styled Components
import {
  CalendarContainer,
  Divider,
  BookingsContainer,
  ViewMoreBtn,
} from "./CalendarStyled";

// Local Data
const hardCodedDates = [
  {
    checkIn: "2023-01-10",
    checkOut: "2023-01-15",
  },
  {
    checkIn: "2022-12-29",
    checkOut: "2023-01-18",
  },
  {
    checkIn: "2022-12-27",
    checkOut: "2022-12-29",
  },
  {
    checkIn: "2023-01-15",
    checkOut: "2023-01-19",
  },
  {
    checkIn: "2023-01-24",
    checkOut: "2023-01-28",
  },
  {
    checkIn: "2023-01-14",
    checkOut: "2023-01-18",
  },
  {
    checkIn: "2023-01-20",
    checkOut: "2023-01-21",
  },
  {
    checkIn: "2023-02-02",
    checkOut: "2023-02-05",
  },
  {
    checkIn: "2022-12-22",
    checkOut: "2022-12-26",
  },
  {
    checkIn: "2022-12-15",
    checkOut: "2022-12-22",
  },
];

export const Calendar = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [checkOuts, setCheckOuts] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [viewMore, setViewMore] = useState(false);

  // Function that gets the currently displayed month and checks which checkIns and checkOuts are happening in that month. This is the default displayed data under the calendar
  const getCurrentMonthEvents = (currentMonth) => {
    let currentMonthStart = currentMonth.activeStart;
    let currentMonthEnd = currentMonth.activeEnd;
    const checkInsBetweenRange = [];
    const checkOutsBetweenRange = [];

    hardCodedDates.map((date) => {
      if (
        new Date(date.checkIn) > currentMonthStart &&
        new Date(date.checkIn) < currentMonthEnd
      ) {
        checkInsBetweenRange.push(date);
      }
      if (
        new Date(date.checkOut) > currentMonthStart &&
        new Date(date.checkOut) < currentMonthEnd
      ) {
        checkOutsBetweenRange.push(date);
      }
      return (
        setCheckIns(checkInsBetweenRange),
        setCheckOuts(checkOutsBetweenRange),
        setCurrentMonth(currentMonth.title)
      );
    });
  };

  // Function that gets the user´s selected dates and checks which checkIns or checkOuts are between those dates
  const handleEventClick = (clickInfo) => {
    let userSelectStart = clickInfo.start;
    let userSelectEnd = clickInfo.end;
    const checkInsBetweenRange = [];
    const checkOutsBetweenRange = [];

    hardCodedDates.map((date) => {
      if (
        new Date(date.checkIn) > userSelectStart &&
        new Date(date.checkIn) < userSelectEnd
      ) {
        checkInsBetweenRange.push(date);
      }
      if (
        new Date(date.checkOut) > userSelectStart &&
        new Date(date.checkOut) < userSelectEnd
      ) {
        checkOutsBetweenRange.push(date);
      }
      return (
        setCheckIns(checkInsBetweenRange),
        setCheckOuts(checkOutsBetweenRange),
        setSelectedStartDate(userSelectStart),
        setSelectedEndDate(userSelectEnd)
      );
    });
  };

  // Function to get the days where we only have checkIns, checkOuts or both
  const datesCalendarGroupHandler = (calendarEventDates) => {
    const sameDayCheckInCheckOut = [];
    const onlyCheckIn = [];
    const onlyCheckOut = [];

    const checkInDates = calendarEventDates.map(
      (calendarEvent) => calendarEvent.checkIn
    );
    const checkOutDates = calendarEventDates.map(
      (calendarEvent) => calendarEvent.checkOut
    );

    checkInDates.forEach((date) => {
      checkOutDates.includes(date)
        ? sameDayCheckInCheckOut.push(date)
        : onlyCheckIn.push(date);
    });

    checkOutDates.forEach((date) => {
      !sameDayCheckInCheckOut.includes(date) && onlyCheckOut.push(date);
    });

    return { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut };
  };

  const renderEventesHandler = (calendarEventDates) => {
    const { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut } =
      datesCalendarGroupHandler(calendarEventDates);

    // Creating the different events that will be displayed in the calendar
    const eventsWhenCheckInCheckOut = sameDayCheckInCheckOut.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: "background",
      backgroundColor: "#FF9C3A",
    }));
    const eventsOnlyCheckIn = onlyCheckIn.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: "background",
      backgroundColor: "#135846",
    }));
    const eventsOnlyCheckOut = onlyCheckOut.map((date) => ({
      start: date,
      end: date,
      overlap: true,
      display: "background",
      backgroundColor: "#E23428",
    }));
    return [
      ...eventsWhenCheckInCheckOut,
      ...eventsOnlyCheckIn,
      ...eventsOnlyCheckOut,
    ];
  };

  // Changes the state for showing more or less bookings
  const handleViewMore = () => {
    setViewMore(!viewMore);
  };

  return (
    <>
      <CalendarContainer>
        <h3 id="title-calendar">Recent Booking Schedule</h3>
        <FullCalendar
          initialView="dayGridMonth"
          // This can be changed to select the start day of the week (0 is Sunday, 1 is Monday)
          firstDay={1}
          headerToolbar={{
            left: "",
            center: "",
            right: "today,prev,title,next",
          }}
          events={renderEventesHandler(hardCodedDates)}
          select={handleEventClick}
          editable={true}
          selectable={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          height={450}
          showNonCurrentDates={false}
          fixedWeekCount={false}
          datesSet={(arg) => {
            getCurrentMonthEvents(arg.view);
          }}
        />
      </CalendarContainer>
      <Divider />
      {/* If no user selection I display the checkIns and CheckOuts for the current month. If user selection I display the data corresponding to that time frame */}
      {selectedStartDate !== null && (checkIns.length || checkOuts.length) ? (
        <BookingsContainer viewMore={viewMore}>
          {checkIns.length ? (
            <>
              <p>
                Check Ins between {selectedStartDate.toLocaleDateString()} &{" "}
                {selectedEndDate.toLocaleDateString()}
              </p>
              {checkIns.reverse().map((d, index) => (
                <SingleBookingCard
                  key={index}
                  checkIn={d.checkIn}
                  checkOut={d.checkOut}
                ></SingleBookingCard>
              ))}
            </>
          ) : null}
          {checkOuts.length ? (
            <>
              <p style={{ marginTop: 10 }}>
                Check Outs between {selectedStartDate.toLocaleDateString()} &{" "}
                {selectedEndDate.toLocaleDateString()}
              </p>
              {checkOuts.reverse().map((d, index) => (
                <SingleBookingCard
                  key={index}
                  checkIn={d.checkIn}
                  checkOut={d.checkOut}
                ></SingleBookingCard>
              ))}
            </>
          ) : null}
        </BookingsContainer>
      ) : (
        <BookingsContainer viewMore={viewMore}>
          {checkIns.length ? (
            <>
              <p>Check Ins in {currentMonth}</p>
              {checkIns.reverse().map((d, index) => (
                <SingleBookingCard
                  key={index}
                  checkIn={d.checkIn}
                  checkOut={d.checkOut}
                ></SingleBookingCard>
              ))}
            </>
          ) : null}
          {checkOuts.length ? (
            <>
              <p style={{ marginTop: 10 }}>Check Outs</p>
              {checkOuts.reverse().map((d, index) => (
                <SingleBookingCard
                  key={index}
                  checkIn={d.checkIn}
                  checkOut={d.checkOut}
                ></SingleBookingCard>
              ))}
            </>
          ) : null}
        </BookingsContainer>
      )}
      {/* If no bookings in the current month or the selected time frame, this message is shown */}
      {!checkIns.length && !checkOuts.length ? (
        <BookingsContainer viewMore={viewMore}>
          <p>
            No Check Ins or Check Outs in the current time frame. Please select
            a time frame manually in the calendar or go to a month where there
            are bookings.
          </p>
        </BookingsContainer>
      ) : null}

      {/* Button to show more or less bookings */}
      <ViewMoreBtn
        viewMore={viewMore}
        disabled={!checkIns.length && !checkOuts.length}
        onClick={handleViewMore}
      >
        {viewMore ? "View Less" : "View More"}
      </ViewMoreBtn>
    </>
  );
};
