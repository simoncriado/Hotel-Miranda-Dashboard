import styled from "styled-components";

const Subcontainer = styled.div`
  width: 50%;
  border-radius: 1.2rem;
  padding: 4rem 4rem 4rem 0;
`;

const BookingDataContainer = styled.div`
  margin: 4rem;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  gap: 5rem;
`;

const BookingDataSubcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Title = styled.p`
  font-family: var(--font-poppins);
  font-size: 1.4rem;
  font-weight: 400;
  color: #6e6e6e;
  margin: 0;
`;
const Data = styled.p`
  font-family: var(--font-poppins);
  font-size: 2.4rem;
  font-weight: 500;
  color: #212121;
  margin: 0;
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: #799283;
    margin: 0;
  }
`;

const Text = styled.p`
  font-family: var(--font-poppins);
  font-size: 1.4rem;
  font-weight: 400;
  color: #363636;
  margin: 0;
  padding: 0 4rem 0 4rem;
`;

const Divider = styled.div`
  height: 1px;
  margin-left: 4rem;
  background-color: #d4d4d4;
`;

export {
  Subcontainer,
  BookingDataContainer,
  BookingDataSubcontainer,
  Title,
  Data,
  Divider,
  Text,
};
