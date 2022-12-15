import styled from "styled-components";

const NotesButton = styled.button`
  transition: background-color 0.1s;
  border: none;
  background-color: #eef9f2;
  font-weight: 500;
  border: none;
  color: #212121;
  border-radius: 12px;
  margin-left: 30px;
  max-width: 160px;
  &:hover {
    background-color: #0e3f32;
  }
`;

export { NotesButton };
