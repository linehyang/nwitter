import { authService } from "fbase";
import React from "react";


export default () => {
  //authService.signOut()을 하면 로그인 되어져 있는것을 로그아웃 한다는 의미
  const onLogOutClick = () => authService.signOut();
  return <>
    <button onClick={onLogOutClick}>Log Out</button>
  </>

  //이렇게만 했을경우, 우리는 계속해서 Profile컴포넌트를 보고 있기 때문에, home으로 돌아가야함
  //이때 사용하는것이 Redirect이며 Router.js 28번째 줄을 확인하도록하자..

  //혹은 아래와 같이 react hook을 사용해도됨.
  //useHistory()라는 훅을 만들고 onLogOutClick이벤트에 아래의 코드를 넣음
  //const history = useHistory();
  //history.push("/")

}