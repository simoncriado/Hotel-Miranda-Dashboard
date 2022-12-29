// React
import { useState } from "react";

// Full calendar Components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Styled Components
import { CalendarContainer, Divider } from "./CalendarStyled";

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
];

export const Calendar = () => {
  const [checkIns, setCheckIns] = useState([]);
  const [checkOuts, setCheckOuts] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleEventClick = (clickInfo) => {
    let userSelectStart = clickInfo.start;
    let userSelectEnd = clickInfo.end;
    const checkInsBetweenRange = [];
    const checkOutsBetweenRange = [];

    hardCodedDates.map((obj) => {
      if (
        new Date(obj.checkIn) > userSelectStart &&
        new Date(obj.checkIn) < userSelectEnd
      ) {
        checkInsBetweenRange.push(obj);
      }
      if (
        new Date(obj.checkOut) > userSelectStart &&
        new Date(obj.checkOut) < userSelectEnd
      ) {
        checkOutsBetweenRange.push(obj);
      }
    });
    setCheckIns(checkInsBetweenRange);
    setCheckOuts(checkOutsBetweenRange);
    setSelectedStartDate(userSelectStart);
    setSelectedEndDate(userSelectEnd);
  };

  // Function to get the days where we only have checkIns, checkOuts or both
  const datesCalendarGroupHandler = (data) => {
    const sameDayCheckInCheckOut = [];
    const onlyCheckIn = [];
    const onlyCheckOut = [];

    const checkInDates = data.map((obj) => obj.checkIn);
    const checkOutDates = data.map((obj) => obj.checkOut);

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

  const renderEventesHandler = (data) => {
    const { sameDayCheckInCheckOut, onlyCheckIn, onlyCheckOut } =
      datesCalendarGroupHandler(data);

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

  return (
    <>
      <CalendarContainer>
        <h3 id="title-calendar">Recent Booking Schedule</h3>
        <FullCalendar
          initialView="dayGridMonth"
          // This can be changed to select the start day of the week (0 is Sunday, 1 is Monday)
          firstDay={0}
          locale="en"
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
          dateClick={(date) => {
            console.log(date);
          }}
        />
      </CalendarContainer>

      {checkIns.length || checkOuts.length || selectedStartDate !== null ? (
        <Divider />
      ) : null}

      {checkIns.length || checkOuts.length ? (
        <div style={{ marginTop: 30 }}>
          <p style={{ marginTop: 0 }}>
            Between dates {selectedStartDate.toLocaleDateString()} and{" "}
            {selectedEndDate.toLocaleDateString()} these Check Ins will take
            place:
          </p>
          <ul>
            {checkIns.map((d, index) => (
              <li key={index}>{d.checkIn}</li>
            ))}
          </ul>
          <p style={{ marginTop: 0 }}>And these Check Outs:</p>
          <ul>
            {checkOuts.map((d, index) => (
              <li key={index}>{d.checkOut}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {selectedStartDate !== null && !checkIns.length && !checkOuts.length ? (
        <div style={{ marginTop: 30 }}>
          <p style={{ marginTop: 0 }}>
            No Check Ins or Check Outs between dates{" "}
            {selectedStartDate.toLocaleDateString()} and{" "}
            {selectedEndDate.toLocaleDateString()}.
          </p>
        </div>
      ) : null}
    </>
  );
};
