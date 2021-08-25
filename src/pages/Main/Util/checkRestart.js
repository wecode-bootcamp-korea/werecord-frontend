import API_URLS from '../../../config';

export default function checkRestart(setUserInfo) {
  fetch(`${API_URLS.MAIN}/restart`, {
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
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          lastStartTime: result.restart_at,
          totalTime: result.total_time,
        }));
      }
    })
    .catch(error => console.log(error));
}
