export default function findDefaultImg(peer_profile_image_url) {
  const haveImg = peer_profile_image_url.indexOf('werecord');

  if (haveImg > 0) {
    return peer_profile_image_url;
  }

  if (haveImg < 0) {
    return `/images/userImgs/userImg${Math.floor(Math.random() * 6)}.png`;
  }
}
