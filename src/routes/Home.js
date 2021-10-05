import { dbService, } from "fbase";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Nweet from "../components/Nweet"
import NweetFactory from "components/NweetFactory";



const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([])

  //useEffect를 사용한다는것은 컴포넌트가 마운트 될때마다 안에있는 함수를 실행하기 위해서 이다.

  //스냅샷은 DB가 CRUD하는것을 모두 지켜보고 있음.
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return <div>
    <div>
      <NweetFactory userObj={userObj} />
      {nweets.map(nweet =>
        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
        //isOwner는 true나 false를 프랍스로 넘겨줌
        //userObj.uid는 로그인 로그아웃할때 Oauth에서 받아주는 user를 의미
      )}
    </div>
  </div>
}
export default Home;