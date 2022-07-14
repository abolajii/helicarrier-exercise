import { css } from "styled-components";

export const mobileResponsiveness = (props) => {
  return css`
    @media (max-width: 768px) {
      ${props}
    }
  `;
};
