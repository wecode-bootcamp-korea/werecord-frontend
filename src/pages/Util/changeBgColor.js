export default function changeBgColor(h) {
  if (h >= 22 || h < 4)
    return 'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)';
  if (h >= 18 && h < 22)
    return 'linear-gradient(180deg, #FFC49D 0%, #9A8ADB 100%)';
  if (h >= 12 && h < 18)
    return `linear-gradient(180deg, #E7F5FF 0%, #FFC49D 100%)`;
  if (h >= 9 && h < 12)
    return 'linear-gradient(180deg, #7C9BEA 0%, #FD92AE 100%)';
}
