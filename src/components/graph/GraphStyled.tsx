import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    color: #393939;
    font-family: var(--font-poppins);
    font-size: 2rem;
    font-weight: 400;
    margin: 0;
    margin-top: 0.5rem;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  p {
    font-family: var(--font-poppins);
    font-size: 14px;
    margin: 0;
    &:nth-child(3) {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const Square = styled.div`
  width: 13px;
  height: 13px;
  background-color: ${(props) => props.color};
`;

export { FilterContainer, StatsContainer, Stat, Square };
