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
  regularBtnFontColorWhite: '#ffffff',
  regularBtnBordderColorWhite: '#ffffff',

  hoverBtnBgWhite: '#ffffff',
  hoverBtnFontColorPurple: '#514AB8',

  disabledBtnFontColorLightWhite: 'rgba(255, 255, 255, 0.7)',
  disabledBtnBgLightWhite: 'rgba(255, 255, 255, 0.3)',

  // input-Color
  regularInputBgWhite: '#ffffff',
  regularInputBorderWhite: '#E0E0E0',

  hoverInputBorderLightPurple: 'rgba(81, 74, 184, 0.6)',

  focusInputBorderPurple: '#514AB8',

  disabledInputBgDarkWhite: '#F8F8F8',
  disabledInputBorderWhite: '#E0E0E0',

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
