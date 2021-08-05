const flexbox = (direction = 'row', justify = 'center', align = 'center') => {
  return `
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  `;
};

const posCenterX = (type = 'absolute') => {
  return `
  position: ${type};
  left:50%;
  transform:translateX(-50%);
  `;
};

const posCenterY = (type = 'absolute') => {
  return `
  position: ${type};
  top: 50%;
  transform: translateY(-50%);
  `;
};

const posCenter = (type = 'absolute') => {
  return `
  position: ${type};
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  `;
};

// Rem
const pixelToRem = size => `${size / 16}rem`;
const MobilePixelToRem = size => `${size / 13}rem`;

// Colors
const colors = {
  black: '#000000',
  white: '#ffffff',
  purple: '#514AB8',
  pink: '#FD92AE',

  // font-Color
  fontColorPurple: '#514AB8',
  fontColorWhite: '#ffffff',
  fontColorLightWhite: 'rgba(255, 255, 255, 0.6)',

  // button-Color
  buttonBgWhite: '#ffffff',
  buttonBgLightWhite: 'rgba(255, 255, 255, 0.3)',

  // input-Color
  inputRegularBgWhite: '#ffffff',
  inputRegularBorderWhite: '#E0E0E0',

  inputHoverBorderLightPurple: 'rgba(81, 74, 184, 0.6)',

  inputFocusBorderPurple: '#514AB8',

  inputDisabledBgDarkWhite: '#F8F8F8',
  inputDisabledBorderWhite: '#E0E0E0',

  footerColorWhite: 'rgba(255, 255, 255, 0.8)',
  chartRowLine: 'rgba(255, 255, 255, 0.5)',
};

const theme = {
  flexbox,
  posCenterX,
  posCenterY,
  posCenter,
  pixelToRem,
  MobilePixelToRem,
  colors,
};

export default theme;
