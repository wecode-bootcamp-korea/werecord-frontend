import { css } from 'styled-components';

const breakpoint = {
  mobile: 425,
  tablet: 1024,
  middle_desktop: 1280,
  large_desktop: 1440,
};

export default Object.keys(breakpoint).reduce((acc, device) => {
  acc[device] = (...attribute) => css`
    @media screen and (max-width: ${breakpoint[device]}px) {
      ${css(...attribute)};
    }
  `;
  return acc;
}, {});
