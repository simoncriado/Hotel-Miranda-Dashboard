import React from "react";
import styled, { css } from "styled-components";

const DropdownMenuStyled = styled.select`
  ${(props) => {
    switch (props.$type) {
      case "green":
        return css`
          background-color: #135846;
          color: #ffffff;
        `;
      case "white":
        return css`
          background-color: white;
          border-radius: 1px solid #135846;
          color: #135846;
          width: fit-content;
        `;
      default:
        return css``;
    }
  }};
  border-radius: 8px;
  font-weight: 500;
  font-family: var(--font-poppins);
  padding: 13px 25px;
  height: 50px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const DropdownMenu = ({ type, options, setActiveFilter }) => {
  return (
    <DropdownMenuStyled
      $type={type}
      onChange={(e) => {
        setActiveFilter(e.target.value);
      }}
    >
      {options.map((option, index) => {
        return <option key={index}>{option}</option>;
      })}
    </DropdownMenuStyled>
  );
};

export { DropdownMenu };
