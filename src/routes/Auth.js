import React from "react";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    //다시 인증 지정된와 현재 사용자 OAuthProvider 팝업 기반의 OAuth 흐름을 사용.
    //oAuth를 사용하여 구글이나 깃허브 아이디를 이용하여 로그인하는 방법

    //https://firebase.google.com/docs/reference/js/auth.md#reauthenticatewithpopup
    // Sign in using a popup.
    // const provider = new FacebookAuthProvider();
    // const result = await signInWithPopup(auth, provider);
    // Reauthenticate using a popup.
    // await reauthenticateWithPopup(result.user, provider);
    let provider
    if (event.target.name === "google") {
      provider = new GoogleAuthProvider();
    } else if (event.target.name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;
