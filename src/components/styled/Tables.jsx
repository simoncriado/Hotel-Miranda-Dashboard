import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 20px;
  width: 100%;
`;

const HeaderTitle = styled.th`
  font-family: var(--font-poppins);
  font-size: 1.8rem;
  font-weight: 600;
  text-align: start;
  padding: 2.2rem 0 2.2rem 4rem;
`;

export { Table, HeaderTitle };
