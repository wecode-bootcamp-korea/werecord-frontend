import API_URLS from '../../../config';

export default function checkPause(setIsCommentModal, setUserInfo) {
  fetch(`${API_URLS.MAIN}/pause`, {
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
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: 'START를 먼저 누르세요.',
        }));
      }
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: false,
          totalTime: result.total_time,
        }));
      }
    })
    .catch(error => console.log(error));
}
