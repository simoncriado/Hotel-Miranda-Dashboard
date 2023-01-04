// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { createNewRoom } from "../../features/rooms/roomsSlice";

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

const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [photoOne, setPhotoOne] = useState("");
  const [photoTwo, setPhotoTwo] = useState("");
  const [photoThree, setPhotoThree] = useState("");
  const [photoFour, setPhotoFour] = useState("");
  const [photoFive, setPhotoFive] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cancellation, setCancellation] = useState("");
  const [roomType, setRoomType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [status, setStatus] = useState("");

  const listOfAmenities = [
    "Air Conditioner",
    "Kitchen",
    "Grocery",
    "Towels",
    "Smart Security",
    "High speed WiFi",
    "Cleaning",
    "Single Bed",
    "24/7 Online Support",
    "Expert Team",
    "Breakfast",
    "Shower",
    "Shop near",
    "Strong locker",
  ];

  const handleCheckboxInput = (value) => {
    setAmenities(amenities.concat(value));
  };

  const createRoom = (e) => {
    e.preventDefault();
    const id = String(Math.floor(Math.random() * 100000));
    const newRoom = {
      id: id,
      room_number: roomNumber,
      room_type: roomType,
      photo: photoOne,
      photoTwo: photoTwo,
      photoThree: photoThree,
      photoFour: photoFour,
      photoFive: photoFive,
      description: description,
      offer: offer,
      room_rate: Number(price).toFixed(2),
      discount: discount,
      room_offer: (price - (price * discount) / 100).toFixed(2),
      cancellation: cancellation,
      room_status: status,
      room_facilities: [...new Set(amenities)],
    };
    dispatch(createNewRoom(newRoom));
    navigate("/rooms");
  };
  return (
    <>
      <LoginContainer style={{ minHeight: "80%" }}>
        <LoginCard
          style={{ height: "fit-content", margin: "2rem 0", width: "90%" }}
        >
          <Description>Fill the form to create a new room</Description>
          <form>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={photoOne}
                placeholder="First photo URL"
                onChange={(e) => setPhotoOne(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={photoTwo}
                placeholder="Second photo URL"
                onChange={(e) => setPhotoTwo(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={photoThree}
                placeholder="Third photo URL"
                onChange={(e) => setPhotoThree(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={photoFour}
                placeholder="Four photo URL"
                onChange={(e) => setPhotoFour(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={photoFive}
                placeholder="Five photo URL"
                onChange={(e) => setPhotoFive(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <RadioDescription>Select the Room Type</RadioDescription>
              <RadioInput
                type="radio"
                id="singleBed"
                value="Single Bed"
                name="roomType"
                onClick={(e) => {
                  setRoomType(e.target.value);
                }}
              />
              <RadioLabel htmlFor="singleBed">Single Bed</RadioLabel>
              <RadioInput
                type="radio"
                id="doubleBed"
                value="Double Bed"
                name="roomType"
                onClick={(e) => {
                  setRoomType(e.target.value);
                }}
              />
              <RadioLabel htmlFor="doubleBed">Double Bed</RadioLabel>
              <RadioInput
                type="radio"
                id="doubleSuperior"
                value="Double Superior"
                name="roomType"
                onClick={(e) => {
                  setRoomType(e.target.value);
                }}
              />
              <RadioLabel htmlFor="doubleSuperior">Double Superior</RadioLabel>
              <RadioInput
                type="radio"
                id="suite"
                value="Suite"
                name="roomType"
                onClick={(e) => {
                  setRoomType(e.target.value);
                }}
              />
              <RadioLabel htmlFor="suite">Suite</RadioLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={roomNumber}
                placeholder="Room Number"
                onChange={(e) => setRoomNumber(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={description}
                placeholder="Room description"
                onChange={(e) => setDescription(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <RadioDescription>Offer</RadioDescription>
              <RadioInput
                type="radio"
                id="yes"
                value="Yes"
                name="offer"
                onClick={(e) => {
                  setOffer(e.target.value);
                }}
              />
              <RadioLabel htmlFor="yes">Yes</RadioLabel>
              <RadioInput
                type="radio"
                id="no"
                value="No"
                name="offer"
                onClick={(e) => {
                  setOffer(e.target.value);
                }}
              />
              <RadioLabel htmlFor="no">No</RadioLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="number"
                className="input-user"
                placeholder="Price per night"
                onChange={(e) => setPrice(e.target.value)}
              ></Input>
            </InputContainer>
            {offer === "Yes" ? (
              <InputContainer>
                <Input
                  type="number"
                  className="input-user"
                  placeholder="Discount %"
                  onChange={(e) => setDiscount(e.target.value)}
                ></Input>
              </InputContainer>
            ) : null}

            <InputContainer>
              <Input
                type="text"
                className="input-user"
                placeholder="Cancellation Policy"
                onChange={(e) => setCancellation(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <RadioDescription>
                Select the amenities included in the new room
              </RadioDescription>
              {listOfAmenities.map((amenity, index) => (
                <div key={index} style={{ display: "inline-block" }}>
                  <RadioInput
                    type="checkbox"
                    name={amenity}
                    id={amenity}
                    value={amenity}
                    onClick={(e) => {
                      handleCheckboxInput(e.target.value);
                    }}
                  />
                  <RadioLabel htmlFor={amenity}>{amenity}</RadioLabel>
                </div>
              ))}
            </InputContainer>
            <InputContainer>
              <RadioDescription>Room status</RadioDescription>
              <RadioInput
                type="radio"
                id="available"
                value="Available"
                name="status"
                onClick={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <RadioLabel htmlFor="available">Available</RadioLabel>
              <RadioInput
                type="radio"
                id="booked"
                value="Booked"
                name="status"
                onClick={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <RadioLabel htmlFor="booked">Booked</RadioLabel>
            </InputContainer>
            <LoginButton
              type="login"
              text="LOGIN"
              onClick={(e) => {
                createRoom(e);
              }}
            >
              Save
            </LoginButton>
          </form>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default NewRoom;
