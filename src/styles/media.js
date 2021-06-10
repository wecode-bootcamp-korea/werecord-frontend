import { css } from 'styled-components';

const breakpoint = {
  tablet: 765,
  desktop: 1080,
};

export default Object.keys(breakpoint).reduce((acc, device) => {
  acc[device] = (...attribute) => css`
    @media screen and (min-width: ${breakpoint[device]}px) {
      ${css(...attribute)};
    }
  `;
  return acc;
}, {});
