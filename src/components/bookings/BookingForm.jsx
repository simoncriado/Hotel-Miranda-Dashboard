// React
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createNewBooking } from "../../features/bookings/bookingsSlice";
import { getBooking } from "../../features/bookings/bookingsSlice";

// Styled Components
import {
  LoginContainer,
  LoginCard,
  InputContainer,
  Input,
  LoginButton,
  Description,
  RadioInput,
  RadioLabel,
  RadioDescription,
} from "../../pages/login/LoginStyled";

const BookingForm = ({ currentBooking, handleInput, handleSubmit }) => {
  return (
    <>
      <LoginContainer style={{ minHeight: "80%" }}>
        <LoginCard style={{ height: "fit-content", width: "90%" }}>
          <Description>Fill the form to create a new booking</Description>
          {/* add event onSubmit */}
          <form onSubmit={(e) => handleSubmit(e)}>
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
                min={new Date().toISOString().slice(0, 10)}
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
                name="roomStatus"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="checkIn">Check In</RadioLabel>
              <RadioInput
                type="radio"
                id="checkOut"
                value="Check Out"
                name="roomStatus"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="checkOut">Check Out</RadioLabel>
              <RadioInput
                type="radio"
                id="inProgress"
                value="In Progress"
                name="roomStatus"
                onClick={handleInput}
              />
              <RadioLabel htmlFor="inProgress">In Progress</RadioLabel>
            </InputContainer>
            {/* Cambiar por input type submit */}
            {/* <LoginButton
              type="login"
              text="LOGIN"
              onClick={(e) => {
                editBooking(e);
              }}
            >
              Save
            </LoginButton> */}
            <input type="submit" />
          </form>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default BookingForm;
