import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API_URLS from '../../config';

console.log(process.env.REACT_APP_GOOGLE_KEY);

export default function GoogleLogin({ setHasUserData }) {
  const history = useHistory();
  const googleButton = useRef();

  const googleLogin = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', function () {
        window.auth2 = window.gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_KEY,
          cookiepolicy: 'single_host_origin',
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
              .then(res => {
                console.log(res);
                return res.json();
              })
              .then(
                ({
                  werecord_token,
                  user_info: { user_type, batch, new_user },
                }) => {
                  sessionStorage.setItem('wrtoken', werecord_token);
                  sessionStorage.setItem('user_type', user_type);
                  sessionStorage.setItem('batch', batch);

                  if (!new_user) {
                    if (user_type === '수강생') history.push('/main');
                    if (user_type === '멘토') history.push('/mentorpage');
                  } else setHasUserData(false);
                }
              );
          },
          function (error) {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      }
    };
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-jssdk');
  };

  useEffect(() => {
    googleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GoogleButton ref={googleButton}>구글계정으로 시작하기</GoogleButton>;
}

const GoogleButton = styled.div`
  margin-top: 154px;
  padding: 8px 46px;
  border: 1px solid ${({ theme }) => theme.colors.regularBtnFontColorWhite};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(24)};
  font-weight: 700;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.fontColorPurple};
    background: ${({ theme }) => theme.colors.hoverBtnBgWhite};
  }

  ${({ theme }) => theme.mobile`
    margin-top: 70px;
    padding: 4px 23px;
    font-size: ${({ theme }) => theme.pixelToRem(16)};
  `}
`;
