// Styled Components
import styled, { css } from "styled-components";

const DropdownMenuStyled = styled.select<{ filter: any }>`
  ${(props) => {
    switch (props.filter) {
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

// Dropdown component. It is given a number of options depending on in which page the dropdown is being used
const DropdownMenu = ({ type, options, setActiveFilter }: any) => {
  return (
    <DropdownMenuStyled
      filter={type}
      onChange={(e: React.MouseEvent<HTMLButtonElement> | any) => {
        setActiveFilter(e.target.value);
      }}
    >
      {options.map((option: string[], index: number) => {
        return <option key={index}>{option}</option>;
      })}
    </DropdownMenuStyled>
  );
};

export { DropdownMenu };
