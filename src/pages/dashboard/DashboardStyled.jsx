import styled from "styled-components";

const DashboardContainer = styled.div`
  width: 96%;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const KPI = styled.div`
  height: 12.5rem;
  widht: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
`;

const KPIContainer = styled.div`
  height: 100%;
  width: 30.4rem;
  background-color: white;
  border-radius: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2.2rem;
  padding-left: 3rem;
  box-shadow: 0px 4px 4px #00000005;
  transition: box-shadow 0.3s;
  svg {
    padding: 2rem;
    border-radius: 8px;
    background-color: rgb(255, 237, 236);
    fill: rgb(226, 52, 40);
    transition: all 0.3s;
  }
  div {
    font-family: "Poppins";
    h2 {
      font-weight: 600;
      font-size: 3rem;
      color: #393939;
      margin: 0;
    }
    p {
      font-weight: 300;
      font-size: 1.4rem;
      color: #787878;
      margin: 0;
    }
  }
  :hover {
    box-shadow: 0px 16px 30px #00000014;
    svg {
      background-color: #e23428;
      fill: white;
    }
    div {
    }
  }
`;

const CalendarAndGraph = styled.div`
  height: 95rem;
  widht: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4rem;
`;

const CalendarAndGraphSubcontainer = styled.div`
  height: 100%;
  width: 50%;
  background-color: grey;
  border-radius: 2rem;
  p {
    text-align: center;
    margin-top: 20rem;
    font-family: "Poppins";
    font-weight: 600;
    font-size: 3rem;
    color: #393939;
  }
`;

const Reviews = styled.div`
  height: 43rem;
  widht: 100%;
  background-color: grey;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 2rem;
  p {
    text-align: center;
    margin-top: 20rem;
    font-family: "Poppins";
    font-weight: 600;
    font-size: 3rem;
    color: #393939;
  }
`;

export {
  DashboardContainer,
  KPI,
  KPIContainer,
  CalendarAndGraph,
  CalendarAndGraphSubcontainer,
  Reviews,
};
