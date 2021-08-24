import styled from "styled-components";

// Fantastic component library potential and reusability through custom props
// Paired with storybook, styled components is fantastic!
// In reality these should also be abstracted out to a private NPM module to reduce overhead or a custom component library repository

export const StyledFlexBox = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "center"};
  align-items: ${props => props.align || "center"};
  flex-direction: ${props => props.direction || "row"};
`;

export const StyledText = styled.h1`
  font-weight: ${props => props.weight};
  font-size: ${props => props.size};
  color: ${props => props.color};
  margin: ${props => props.margin};
  height: ${props => props.height || props.size};
`;

export const StyledInput = styled.input`
  width: ${props => props.customStyles.width};
  height: ${props => props.customStyles.height || "40px"};
  font-size: ${props => props.customStyles.size};
  border: ${props => props.customStyles.border || "solid #000000 2px"};
  border-radius: ${props => props.customStyles.borderRadius || "5px"};
  padding: ${props => props.customStyles.padding || "0 5px"};
  margin: ${props => props.customStyles.margin};

  &:focus {
    outline: none;
  }
`;

export const StyledInfoWrapper = styled.div`
  position: relative;
  margin-top: 25px;
  padding-left: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledToolTip = styled.div`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 5px;
  width: 220px;
  height: 85px;
  bottom: 150%;
  left: -80px;
  padding: 5px;
  font-size: 12px;

  ${StyledInfoWrapper}:hover & {
    visibility: visible;
  }
`;

export const StyledButton = styled.button`
  width: ${props => props.customStyles.width};
  height: ${props => props.customStyles.height || "40px"};
  border: ${props => props.customStyles.border || "solid #000000 2px"};
  border-radius: ${props => props.customStyles.borderRadius || "5px"};
  padding: ${props => props.customStyles.padding || "0 5px"};
  transition: all 0.3s ease 0s;

  &:hover {
    cursor: pointer;
    background: #dcdcdc;
  }
  &:active {
    border: #ffffff;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: #a9a9a9;
    cursor: not-allowed;
  }
`;

export const LoadingSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #2c5364;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  background: #ffffff;
  margin: 50px 0 70px 0;
`;

export const StyledData = styled.td`
  border: solid thin;
  height: 1.4em;
  width: 1.4em;
  text-align: center;
  padding: 0;
`;
