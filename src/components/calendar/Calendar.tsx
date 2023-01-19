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

interface SingleDate {
  checkIn: string;
  checkOut: string;
}

export const Calendar = () => {
  const [checkIns, setCheckIns] = useState<SingleDate[]>([]);
  const [checkOuts, setCheckOuts] = useState<SingleDate[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | any>(null);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [viewMore, setViewMore] = useState<boolean>(false);

  // Function that gets the currently displayed month and checks which checkIns and checkOuts are happening in that month. This is the default displayed data under the calendar
  // Type any because it is a very specific type of object. Does not work giving type object
  const getCurrentMonthEvents = (currentMonth: any) => {
    let currentMonthStart: Date = currentMonth.activeStart;
    let currentMonthEnd: Date = currentMonth.activeEnd;
    const checkInsBetweenRange: SingleDate[] = [];
    const checkOutsBetweenRange: SingleDate[] = [];

    hardCodedDates.map((date: SingleDate) => {
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
        setCheckIns(checkInsBetweenRange.reverse()),
        setCheckOuts(checkOutsBetweenRange.reverse()),
        setCurrentMonth(currentMonth.title)
      );
    });
  };

  // Function that gets the user´s selected dates and checks which checkIns or checkOuts are between those dates
  const handleEventClick = (clickInfo: any) => {
    let userSelectStart: Date = clickInfo.start;
    let userSelectEnd: Date = clickInfo.end;
    const checkInsBetweenRange: SingleDate[] = [];
    const checkOutsBetweenRange: SingleDate[] = [];

    hardCodedDates.map((date: SingleDate) => {
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
        setCheckIns(checkInsBetweenRange.reverse()),
        setCheckOuts(checkOutsBetweenRange.reverse()),
        setSelectedStartDate(userSelectStart),
        setSelectedEndDate(userSelectEnd)
      );
    });
  };

  // Function to get the days where we only have checkIns, checkOuts or both
  const datesCalendarGroupHandler = (calendarEventDates: any) => {
    const sameDayCheckInCheckOut: string[] = [];
    const onlyCheckIn: string[] = [];
    const onlyCheckOut: string[] = [];

    const checkInDates: string[] = calendarEventDates.map(
      (calendarEvent: any) => calendarEvent.checkIn
    );
    const checkOutDates: string[] = calendarEventDates.map(
      (calendarEvent: any) => calendarEvent.checkOut
    );

    checkInDates.forEach((date: string) => {
      checkOutDates.includes(date)
        ? sameDayCheckInCheckOut.push(date)
        : onlyCheckIn.push(date);
    });

    checkOutDates.forEach((date: string) => {
      !sameDayCheckInCheckOut.includes(date) && onlyCheckOut.push(date);
    });

    return { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut };
  };

  const renderEventesHandler = (calendarEventDates: any) => {
    const { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut } =
      datesCalendarGroupHandler(calendarEventDates);

    // Creating the different events that will be displayed in the calendar
    const eventsWhenCheckInCheckOut = sameDayCheckInCheckOut.map(
      (date: string) => ({
        start: date,
        end: date,
        overlap: true,
        display: "background",
        backgroundColor: "#FF9C3A",
      })
    );
    const eventsOnlyCheckIn = onlyCheckIn.map((date: string) => ({
      start: date,
      end: date,
      overlap: true,
      display: "background",
      backgroundColor: "#135846",
    }));
    const eventsOnlyCheckOut = onlyCheckOut.map((date: string) => ({
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
  const handleViewMore = (): void => {
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
              {checkIns.map((d: SingleDate, index: number) => (
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
              {checkOuts.map((d: SingleDate, index: number) => (
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
              {checkIns.map((d: SingleDate, index: number) => (
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
              {checkOuts.map((d: SingleDate, index: number) => (
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
