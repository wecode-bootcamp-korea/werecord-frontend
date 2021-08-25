import API_URLS from '../../../config';
import dayjs from 'dayjs';

export default function checkStart(
  setIsOnCommentModal,
  setUserInfo,
  setStartAndStopImg
) {
  fetch(`${API_URLS.MAIN}/start`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        window.location.href = '/';
      }
      if (message === 'ALREADY_RECORD_ERROR') {
        setIsOnCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '이미 출근하셨습니다.',
        }));
      }
      if (message === 'LOCATION_ERROR') {
        setIsOnCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '위코드에 계시나요?',
        }));
      }
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          isStart: true,
          lastStartTime: `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`,
        }));
        setIsOnCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '오늘 기록이 시작되고 있습니다.',
        }));
        setStartAndStopImg('start');
      }
    })
    .catch(error => console.log(error));
}
