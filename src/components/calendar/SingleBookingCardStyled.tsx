import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  align-items: center;
  max-heigth: 100px;
  margin-bottom: 1.5rem;
  img {
    border-radius: 8px;
    width: 150px;
    height: 77px;
    object-fit: cover;
  }
`;
const CardData = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  color: #393939;
  h2 {
    font-size: 2rem;
    margin: 0;
  }
  p {
    font-size: 1.6rem;
    color: #787878;
    margin: 0;
  }
`;
export { Card, CardData };
