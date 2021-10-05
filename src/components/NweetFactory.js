import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import { collection, addDoc } from "firebase/firestore";



const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("")

  const onSubmit = async (event) => {
    //https://velog.io/@lipton/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EC%B4%88%EB%B0%98-4
    //https://firebase.google.com/docs/reference/js/firestore_.md#adddoc
    event.preventDefault();
    let attachmentUrl = "";
    //공식문서에서 storage, ref를 찾는다.
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    ///실제 firebase DB에 컬렉션과 doc를 만드려면 import {collection, addDoc}를 한후 아래와 같이 사용하면 됨.
    await addDoc(collection(dbService, 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
      //누가 글을 썻는지 알게됨.
      creatorId: userObj.uid,
      attachmentUrl
    })
    //그후 값을 빈값으로 만듬.
    setNweet("")
    setAttachment("")
  }

  const onChange = (event) => {
    const value = event.target.value
    setNweet(value)
  };

  const onFileChange = (event) => {
    //event.target을 보면 파일이 없음.
    //파일을 받으려면 event.target.files를 쳐보면 나옴
    const { target: { files }, } = event;
    const theFile = files[0] //한개의 파일만 받는다.

    //파일을 읽기위해 FileReader라는 api를 사용
    const reader = new FileReader(); //이걸 사용해서 파일을 읽는것 
    reader.onloadend = (finishedEvent) => { //이벤트 리스너
      const { currentTarget: { result }, } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }

  const onClearAttachmentClick = () => setAttachment("")


  return (
    <form onSubmit={onSubmit}>
      <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {/* attachment가 있을떄만 보여주겠다는 의미 파일 미리보기를 만듬*/}
      {attachment && <div>
        <img src={attachment} width="50px" height="50px" />
        <button onClick={onClearAttachmentClick} >Clear</button>
      </div>}
    </form>
  )
}

export default NweetFactory