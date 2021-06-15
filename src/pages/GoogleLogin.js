import React, { useEffect } from 'react';

const gauth = gapi.auth2.init({
  client_id:
    '348690319815-t5e8gq77l8f3iqm60aqsiebna9utntq8.apps.googleusercontent.com',
});

const googleSDK = () => {
  // 구글 SDK 초기 설정
  window.googleSDKLoaded = () => {
    window.gapi.load('auth2', () => {
      const auth2 = window.gapi.auth2.getAuthInstance({
        client_id: '클라이언트_ID.apps.googleusercontent.com',
        scope: 'profile email',
      });
      auth2.attachClickHandler(
        googleLoginBtn.current, // useRef랑 current!!!!!
        {},
        googleUser => {
          const profile = googleUser.getBasicProfile();
          console.log(profile);
          console.log(`Token || ${googleUser.getAuthResponse().id_token}`);
          setToken(googleUser.getAuthResponse().id_token);
          console.log(`ID: ${profile.getId()}`);
          console.log(`Name: ${profile.getName()}`);
          console.log(`Image URL: ${profile.getImageUrl()}`);
          console.log(`Email: ${profile.getEmail()}`);
        },
        error => {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    });
  };
  // 구글 SDK 로드
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
  googleSDK();
}, []);

export default function GoogleLogin() {
  return (
    <Head>
      <script
        src="https://apis.google.com/js/platform.js?onload=init"
        async
        defer
      ></script>
      <meta
        name="google-signin-client_id"
        content="348690319815-t5e8gq77l8f3iqm60aqsiebna9utntq8.apps.googleusercontent.com"
      />
    </Head>
  );
}
