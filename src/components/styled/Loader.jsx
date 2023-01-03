// Styled Components
import styled from "styled-components";

const Loader = styled.div`
  margin: 10rem auto;
  width: 150px;
  height: 150px;
  border-left: 5px solid #ff9c3a;
  border-radius: 50%;
  animation: right5231 1.3s linear infinite;
  &::before,
  ::after {
    content: "";
    width: 120px;
    height: 120px;
    display: block;
    position: absolute;
    top: calc(50% - 60px);
    left: calc(50% - 60px);
    border-right: 5px solid #135846;
    border-radius: 50%;
    animation: left036 1.3s linear infinite;
  }
  &::after {
    width: 90px;
    height: 90px;
    top: calc(50% - 45px);
    left: calc(50% - 45px);
    border: 0;
    border-top: 5px solid #e23428;
    animation: none;
  }
  @keyframes right5231 {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes left036 {
    from {
      transform: rotate(720deg);
    }

    to {
      transform: rotate(0deg);
    }
  }
`;

export { Loader };
