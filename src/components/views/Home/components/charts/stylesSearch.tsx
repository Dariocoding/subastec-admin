import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const APP_SEARCHER = styled.div`
  display: flex;
  align-self: center;
  margin-right: 15px;
  padding: 0 0 20px 0;
  justify-content: center;
`;

export const INPUT_SEARCH = styled(DatePicker)`
  border: 0;
  padding: 5px 10px;
  padding-right: 30px;
  border-radius: 5px;
  background-color: #64a3b9;
  color: #fff;
  transition: background-color 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:focus {
    border: none;
  }
`;
