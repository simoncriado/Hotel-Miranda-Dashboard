import styled from "styled-components";

const TopbarContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  box-shadow: 0px 3px 10px #00000005;
  height: 12rem;
`;

const TopbarTitle = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  gap: 5rem;
  p {
    padding-left: 10rem;
    font-family: var(--font-poppins);
    font-size: 2.8rem;
    font-weight: 700;
    color: #262626;
  }
`;

const IconContainer = styled.div`
  display: flex;
  width: 70%;
  padding-right: 10%;
  justify-content: flex-end;
  align-items: center;
  gap: 6rem;
`;

const Icon = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    fill: #135846;
  }

  div {
    position: absolute;
    display: block;
    right: -1.4rem;
    top: -1.4rem;
    width: fit-content;
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 2%;
    background-color: #e23428;
    border-radius: 8px;
    border: 2px solid white;

    p {
      text-align: center;
      margin: 0.2rem auto;
      font-family: var(--font-poppins);
      font-weight: 600;
      color: white;
      font-size: 1.4rem;
    }
  }
`;

export { TopbarContainer, TopbarTitle, IconContainer, Icon };
