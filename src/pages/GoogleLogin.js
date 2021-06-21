import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const GoogleLogin = props => {
  const history = useHistory();
  useEffect(() => {
    googleLogin();
  }, []);

  const googleButton = useRef();

  const googleLogin = () => {
    window.gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      window.auth2 = window.gapi.auth2.init({
        client_id:
          '348690319815-t5e8gq77l8f3iqm60aqsiebna9utntq8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        //scope: 'additional_scope'
      });
      attachSignin(googleButton.current);
    });

    function attachSignin(element) {
      window.auth2.attachClickHandler(
        element,
        {},
        function (googleUser) {
          fetch('http://10.58.2.86:8000/users/login', {
            headers: {
              Authorization: googleUser.getAuthResponse().id_token,
            },
          })
            .then(res => res.json())
            .then(res => {
              sessionStorage.setItem('wrtoken', res.werecord_token);
              sessionStorage.setItem('use_type', res.user_info.user_type);
              sessionStorage.setItem('user_id', res.user_info.user_id);
              return res;
            })
            //테스트용 console입니다.
            // .then(res => console.log(res));
            // 테스트용 주석입니다.
            .then(res => {
              if (res.user_info.batch) {
                alert('로그인이 완료되었습니다!');
                history.push('/main');
              } else if (res.user_info.batch == false) {
                alert('신규 가입 회원입니다');
                props.changeModalValue();
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
    <>
      {/* <button onClick={props.changeModalValue}>하이</button> */}
      <GoogleButton ref={googleButton}>
        <GoogleLogo src="/images/googleLogo.png"></GoogleLogo>
        <GoogleLoginText>구글로 로그인하기</GoogleLoginText>
      </GoogleButton>
    </>
  );
};

export default GoogleLogin;

const GoogleButton = styled.button`
  ${({ theme }) => theme.flexbox()}
  width: 200px;
  height: 40px;
  background-color: white;
  border-radius: 3px;
`;

const GoogleLogo = styled.img`
  margin: 5px;
  width: 20px;
  height: 20px;
`;

const GoogleLoginText = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 5px;
  line-height: 15px;
`;
