import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const GoogleLogin = () => {
  const history = useHistory();
  console.log(history);
  useEffect(() => {
    googleLogin();
  }, []);

  const googleLogin = () => {
    window.gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      window.auth2 = window.gapi.auth2.init({
        client_id:
          '348690319815-t5e8gq77l8f3iqm60aqsiebna9utntq8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        //scope: 'additional_scope'
      });
      attachSignin(document.getElementById('customBtn'));
    });

    function attachSignin(element) {
      console.log(element.id);
      window.auth2.attachClickHandler(
        element,
        {},
        function (googleUser) {
          // setToken(googleUser.getAuthResponse().id_token);
          // console.log();
          // console.log(googleUser.getAuthResponse().access_token);
          const value = googleUser.getAuthResponse().id_token;

          fetch('http://15.164.163.99:8000/users/login', {
            headers: {
              Authorization: value,
            },
          })
            .then(res => res.json())
            .then(res => {
              sessionStorage.setItem('token', res.werecord_token);
              return res;
            })
            // .then(res => console.log(res));
            .then(res => {
              if (res.user_info.batch) {
                alert('이미 가입된 회원입니다');
              } else if (res.user_info.batch === undefined) {
                alert('신규 가입 회원입니다');
                history.push('/');
              }
            });
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    }
  };

  return (
    <div
      id="customBtn"
      style={{ width: '30px', height: '30px', backgroundColor: 'yellow' }}
    ></div>
  );
};

// const GoogleButton = styled.div`
// `;

export default GoogleLogin;
