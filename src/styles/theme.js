const flexbox = (direction = 'row', justify = 'center', align = 'center') => {
  return `
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  `;
};

const pixelToRem = size => `${size / 16}rem`;

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

const colors = {
  black: '#000000',
  white: '#ffffff',
  blue: '#0066ff',
  gray: '#F6F4F1',
  red: '#ef6253',
  green: '#41b979',
  purple: '#514AB8',
  pink: '#FD92AE',
  orange: '#FF9900',
  backgroundColor: '#212121',
  fontColor: '#dedede',
  buttonAndLogo: '#514AB8',
};

const theme = {
  colors,
  flexbox,
  pixelToRem,
  posCenterX,
  posCenterY,
  posCenter,
};

export default theme;
