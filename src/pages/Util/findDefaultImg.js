export default function findDefaultImg(imageURL) {
  const haveImg = imageURL.indexOf('werecord');

  if (haveImg > 0) {
    return imageURL;
  }

  if (haveImg < 0) {
    return `/images/userImgs/userImg${Math.floor(Math.random() * 6)}.png`;
  }
}
