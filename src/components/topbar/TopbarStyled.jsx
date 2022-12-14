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
  .wobble:hover {
    animation: wobble 2s ease infinite;
  }
  @keyframes wobble {
    0% {
      transform: translateX(0%);
    }
    15% {
      transform: translateX(-25%) rotate(-5deg);
    }
    30% {
      transform: translateX(20%) rotate(3deg);
    }
    45% {
      transform: translateX(-15%) rotate(-3deg);
    }
    60% {
      transform: translateX(10%) rotate(2deg);
    }
    75% {
      transform: translateX(-5%) rotate(-1deg);
    }
    100% {
      transform: translateX(0%);
    }
  }
  .ring:hover {
    animation: ring 7s .3s ease-in-out infinite;
  }
  @keyframes ring {
  0% { transform: rotateZ(0); }
  1% { transform: rotateZ(30deg); }
  3% { transform: rotateZ(-28deg); }
  5% { transform: rotateZ(34deg); }
  7% { transform: rotateZ(-32deg); }
  9% { transform: rotateZ(30deg); }
  11% { transform: rotateZ(-28deg); }
  13% { transform: rotateZ(26deg); }
  15% { transform: rotateZ(-24deg); }
  17% { transform: rotateZ(22deg); }
  19% { transform: rotateZ(-20deg); }
  21% { transform: rotateZ(18deg); }
  23% { transform: rotateZ(-16deg); }
  25% { transform: rotateZ(14deg); }
  27% { transform: rotateZ(-12deg); }
  29% { transform: rotateZ(10deg); }
  31% { transform: rotateZ(-8deg); }
  33% { transform: rotateZ(6deg); }
  35% { transform: rotateZ(-4deg); }
  37% { transform: rotateZ(2deg); }
  39% { transform: rotateZ(-1deg); }
  41% { transform: rotateZ(1deg); }

  43% { transform: rotateZ(0); }
  100% { transform: rotateZ(0); }
}
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
    
    }

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
