import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 96%;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background-color: red;
`;
const KPI = styled.div`
  height: 12.5rem;
  widht: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  div {
    height: 100%;
    width: 30.4rem;
    background-color: green;
    border-radius: 12px;
  }
`;

export { DashboardContainer, KPI };
