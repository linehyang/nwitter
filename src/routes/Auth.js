import React, { useState } from "react";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value)
    } else if (event.target.name === "password") {
      setPassword(event.target.value)
    }

  }

  const onSubmit = async (event) => {
    event.preventDefault(); //이것을 사용하지 않으면 input type submit을 누르는 순간 입력하였던 email과 password가 사라지고 새로고침이 되어버림 
    //새로 고침이 되면 우리의 react코드도 사라짐 , state도 포함
    //prevent의 뜻은 예방하다
    //preventDefault(): 현재 이벤트의 기본 동작을 중지하는 것이다.

    //form을 submit하였을때 newAccount를 사용해서 확인.
    try {
      let data
      if (newAccount) {
        // create account 새로운 계정을 만드는 로직 
        //https://firebase.google.com/docs/reference/js/auth.md#createuserwithemailandpassword
        data = await createUserWithEmailAndPassword(authService, email, password)
        //계정을 성공적으로 만들면 자동적으로 로그인이 됨.
      } else {
        // log in 로그인 하는 로직
        //const result = await signInWithEmailAndPassword(auth, email, password); 공식문서 참조
        data = await signInWithEmailAndPassword(authService, email, password)
      }

    } catch (error) {
      setError(error.message)
      //만약 계정이 있거나, 해당패스워드를 사용할수 없는 경우 실패함.
    }

  }

  //newAccount를 변경시켜주는것.
  const toggleAccount = () => setNewAccount((prev) => !prev);

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
      <form onSubmit={onSubmit}> {/* onsubmit : form 태그 안에서 form전송을 하기 전에 입력된 데이터의 유효성을 체크하기 위해 사용하는 이벤트. */}
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth;
