import React from 'react';
import { gapi } from 'gapi-script';

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log('ID Token: ' + id_token);
}

function signOut() {
  gapi.auth2.getAuthInstance().disconnect();
}

export default function GoogleLogin() {
  return (
    <>
      <div
        className="g-signin2"
        data-onsuccess="onSignIn"
        data-theme="dark"
      ></div>
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}
