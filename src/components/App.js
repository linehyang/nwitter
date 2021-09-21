import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [init, setInit] = useState(false);  //init이 true로 되면 firebase가 프로그램을 초기화 했다는 것을 의미함.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //원래는  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)를 사용했지만 이것을 사용하게 되면, 
  //firebase가 초기화되고 모든걸 로드할때까지 기다려 주지 않기 때문. 그래서 uesEffect를 사용한다 
  useEffect(() => {
    authService.onAuthStateChanged((user) => { //onAuthStateChanged는 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킨다는 의미 
      //기본적으로 onAuthStateChagned는 이벤트리스너 같은 존재이며 유저 상태에 변화가 있을때 그 변화를 알아차림, 
      //유저가 로그아웃했을때, 계정을 생성했을때, firebase가 초기화 될때, 로그인 될때 다 포함
      //https://firebase.google.com/docs/reference/js/auth.md#onauthstatechanged
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true); //초기화 완료되면 값을 바꿈
    })
  }, [])
  return <>
    {/* 초기화중이면 initailizeing을 띄우고 초기화가 끝나면 AppRouter를 실행 */}
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initilaizeing.."}
    <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
  </>
}

export default App;
