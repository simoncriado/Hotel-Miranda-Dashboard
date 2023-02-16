import { MouseEventHandler } from "react";

export interface BookingInt {
  userName: string;
  userPicture: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  roomType: string;
  status: string;
}

export interface BookingFormInt {
  currentBooking: BookingInt;
  formTitle: string;
  handleInput: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | MouseEventHandler<HTMLInputElement>
      | any
  ) => void;
  handleSubmit: () => void;
  handleCancel: (e: Event) => void;
}

export interface BookingRowInt {
  booking: BookingInt | any;
  handleOpenModal: (userName: string, specialRequest: string, e: any) => void;
}
