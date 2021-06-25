import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API_URLS from '../../../config';

const GoogleLogin = props => {
  const history = useHistory();
  useEffect(() => {
    googleLogin();
  }, []);

  const googleButton = useRef();

  const googleLogin = () => {
    window.gapi.load('auth2', function () {
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
          fetch(`${API_URLS.LOGIN}`, {
            headers: {
              Authorization: googleUser.getAuthResponse().id_token,
            },
          })
            .then(res => res.json())
            // .then(res => console.log(res));
            .then(res => {
              sessionStorage.setItem('wrtoken', res.werecord_token);
              sessionStorage.setItem('user_type', res.user_info.user_type);
              sessionStorage.setItem('batch', res.user_info.batch);
              sessionStorage.setItem('email', res.user_info.email);
              sessionStorage.setItem(
                'profile_image_url',
                res.user_info.profile_image_url
              );
              if (res.user_info.user_id) {
                alert('로그인이 완료되었습니다!');
                if (res.user_info.user_type === '수강생') {
                  history.push('/main');
                } else if (res.user_info.user_type === '멘토') {
                  history.push('/mentorpage');
                } else if (res.user_info.user_type === '') {
                  props.changeModalValue();
                }
              } else if (res.user_info.user_id === '') {
                alert('신규 가입 회원입니다');
                props.changeModalValue();
              }
              return res;
            });
          //테스트용 console입니다.
          // .then(res => console.log(res));
          // 테스트용 주석입니다.
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    }
  };

  return (
    <>
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
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;

const GoogleLogo = styled.img`
  margin: 5px;
  width: 20px;
  height: 20px;
`;

const GoogleLoginText = styled.p`
  margin: 5px;
  font-size: 16px;
  font-weight: 700;
  line-height: 15px;
`;
