// React
import { useState, useEffect } from "react";

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
import { Loader } from "../styled/Loader";

// Redux
import { getDataBookings } from "../../features/bookings/bookingsSlice";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingInt } from "../../interfaces/BookingInt";

interface SingleDate {
  checkIn: string;
  checkOut: string;
}

type BookingsType = {
  bookingsList: BookingInt[];
};
type UpdateType = {
  update: boolean;
};
type checkIn = {
  checkIn: string;
  checkOut: string;
  booking: any;
};

export const Calendar = () => {
  const [checkIns, setCheckIns] = useState<any>([]);
  const [checkOuts, setCheckOuts] = useState<SingleDate[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | any>(null);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { bookingsList } = useAppSelector<BookingsType>(
    (state) => state.bookingsReducer
  );
  const { update } = useAppSelector<UpdateType>(
    (state) => state.bookingsReducer
  );
  const [bookings, setBookings] = useState<BookingInt[]>(bookingsList);
  const [dates, setDates] = useState<any>([]);

  useEffect(() => {
    if (update) {
      dispatch(getDataBookings());
    }
    setBookings(bookingsList);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [bookingsList, dispatch, update]);

  const formatCalendarDate = (date: string) => {
    const newDate = new Date(date);
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const day = ("0" + newDate.getDate()).slice(-2);
    const year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (bookings.length !== 0) {
      const datesAux: any = [];
      bookings.map((booking) => {
        datesAux.push({
          checkIn: formatCalendarDate(booking.checkIn),
          checkOut: formatCalendarDate(booking.checkOut),
          userName: booking.userName,
          bedType: booking.roomType,
        });
      });
      setDates(datesAux);
    }
  }, [bookings]);

  // useEffect(() => {
  //   getCurrentMonthEvents("Februar");
  // }, [dates]);

  // Function that gets the currently displayed month and checks which checkIns and checkOuts are happening in that month. This is the default displayed data under the calendar
  // Type any because it is a very specific type of object. Does not work giving type object
  const getCurrentMonthEvents = (currentMonth: any) => {
    let currentMonthStart: Date = currentMonth.activeStart;
    let currentMonthEnd: Date = currentMonth.activeEnd;
    const checkInsBetweenRange: checkIn[] = [];
    const checkOutsBetweenRange: SingleDate[] = [];

    dates.map((date: any) => {
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
    const checkInsBetweenRange: checkIn[] = [];
    const checkOutsBetweenRange: SingleDate[] = [];

    dates.map((date: any) => {
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
      {loading ? (
        <Loader />
      ) : (
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
            events={renderEventesHandler(dates)}
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
      )}

      {loading ? null : (
        <>
          <Divider />
          {/* If no user selection I display the checkIns and CheckOuts for the current month. If user selection I display the data corresponding to that time frame */}
          {selectedStartDate !== null &&
          (checkIns.length || checkOuts.length) ? (
            <BookingsContainer viewMore={viewMore}>
              {checkIns.length ? (
                <>
                  <p>
                    Check Ins between {selectedStartDate.toLocaleDateString()} &{" "}
                    {selectedEndDate.toLocaleDateString()}
                  </p>
                  {checkIns.map((d: any, index: number) => (
                    <SingleBookingCard
                      key={index}
                      checkIn={d.checkIn}
                      checkOut={d.checkOut}
                      userName={d.userName}
                      bedType={d.bedType}
                    ></SingleBookingCard>
                  ))}
                </>
              ) : null}
              {checkOuts.length ? (
                <>
                  <p style={{ marginTop: 10 }}>
                    Check Outs between {selectedStartDate.toLocaleDateString()}{" "}
                    & {selectedEndDate.toLocaleDateString()}
                  </p>
                  {checkOuts.map((d: any, index: number) => (
                    <SingleBookingCard
                      key={index}
                      checkIn={d.checkIn}
                      checkOut={d.checkOut}
                      userName={d.userName}
                      bedType={d.bedType}
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
                  {checkIns.map((d: any, index: number) => (
                    <SingleBookingCard
                      key={index}
                      checkIn={d.checkIn}
                      checkOut={d.checkOut}
                      userName={d.userName}
                      bedType={d.bedType}
                    ></SingleBookingCard>
                  ))}
                </>
              ) : null}
              {checkOuts.length ? (
                <>
                  <p style={{ marginTop: 10 }}>Check Outs</p>
                  {checkOuts.map((d: any, index: number) => (
                    <SingleBookingCard
                      key={index}
                      checkIn={d.checkIn}
                      checkOut={d.checkOut}
                      userName={d.userName}
                      bedType={d.bedType}
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
                No Check Ins or Check Outs in the current time frame. Please
                select a time frame manually in the calendar or go to a month
                where there are bookings.
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
      )}
    </>
  );
};
