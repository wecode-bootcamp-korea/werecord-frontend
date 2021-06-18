import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
          const value = googleUser.getAuthResponse().id_token;

          fetch('http://10.58.5.223:8000/users/login', {
            headers: {
              Authorization: value,
            },
          })
            .then(res => res.json())
            .then(res => {
              sessionStorage.setItem('wrtoken', res.werecord_token);
              return res;
            })
            //테스트용 console입니다.
            .then(res => console.log(res));
          //테스트용 주석입니다.
          // .then(res => {
          //   if (res.user_info.batch) {
          //     alert('이미 가입된 회원입니다');
          //   } else if (res.user_info.batch === undefined) {
          //     alert('신규 가입 회원입니다');
          //     history.push('/');
          //   }
          // });
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    }
  };

  return (
    <GoogleButton id="customBtn">
      <GoogleLogo src="/images/googleLogo.png"></GoogleLogo>
      <GoogleLoginText>구글로 로그인하기</GoogleLoginText>
    </GoogleButton>
  );
};

export default GoogleLogin;

const GoogleButton = styled.button`
  ${({ theme }) => theme.flexbox()}
  width: 120px;
  height: 30px;
  background-color: white;
  border-radius: 3px;
`;

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
  margin: 5px;
`;

const GoogleLoginText = styled.p`
  font-size: 10px;
  font-weight: 700;
`;
