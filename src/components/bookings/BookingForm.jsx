// React
import React from "react";

// Styled Components
import {
  LoginContainer,
  LoginCard,
  InputContainer,
  Input,
  FormTitle,
  RadioInput,
  RadioLabel,
  RadioDescription,
  InputSubmit,
} from "../../pages/login/LoginStyled";

// This form gets used from editBooking and newBooking. If used for editing a booking it will be preloaded with the data from the currentBooking to edit
const BookingForm = ({
  currentBooking,
  handleInput,
  handleSubmit,
  formTitle,
}) => {
  return (
    <>
      <LoginContainer style={{ minHeight: "80%" }}>
        <LoginCard style={{ height: "fit-content", width: "90%" }}>
          <FormTitle>{formTitle}</FormTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={currentBooking.userName}
                placeholder="User Name"
                name="userName"
                onChange={handleInput}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                className="input-user"
                value={currentBooking.userPicture}
                placeholder="Copy your photo URL"
                name="userPicture"
                onChange={(e) => handleInput(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                style={{ color: "#777777" }}
                type="date"
                className="input-user"
                placeholder="dd-mm-yyyy"
                name="checkIn"
                value={currentBooking.checkIn}
                onChange={handleInput}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                style={{ color: "#777777" }}
                type="date"
                className="input-user"
                placeholder="dd-mm-yyyy"
                name="checkOut"
                value={currentBooking.checkOut}
                onChange={handleInput}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                placeholder="Special request"
                name="specialRequest"
                value={currentBooking.specialRequest}
                onChange={handleInput}
              ></Input>
            </InputContainer>
            <InputContainer>
              <RadioDescription>Select the Room Type</RadioDescription>
              <RadioInput
                type="radio"
                id="singleBed"
                value="Single Bed"
                name="roomType"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="singleBed">Single Bed</RadioLabel>
              <RadioInput
                type="radio"
                id="doubleBed"
                value="Double Bed"
                name="roomType"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="doubleBed">Double Bed</RadioLabel>
              <RadioInput
                type="radio"
                id="doubleSuperior"
                value="Double Superior"
                name="roomType"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="doubleSuperior">Double Superior</RadioLabel>
              <RadioInput
                type="radio"
                id="suite"
                value="Suite"
                name="roomType"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="suite">Suite</RadioLabel>
            </InputContainer>
            <InputContainer>
              <RadioDescription>Select the Booking Status</RadioDescription>
              <RadioInput
                type="radio"
                id="checkIn"
                value="Check In"
                name="status"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="checkIn">Check In</RadioLabel>
              <RadioInput
                type="radio"
                id="checkOut"
                value="Check Out"
                name="status"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="checkOut">Check Out</RadioLabel>
              <RadioInput
                type="radio"
                id="inProgress"
                value="In Progress"
                name="status"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="inProgress">In Progress</RadioLabel>
            </InputContainer>
            <InputSubmit type="submit" />
          </form>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default BookingForm;
