import styled from "styled-components";
import { Button } from "@material-ui/core";

export const StyledButton = styled(Button)`
  background-color: "#000000";
  &&:hover {
    color: red;
  }
`;
