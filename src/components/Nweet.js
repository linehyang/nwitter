import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?")
    console.log(ok)
    if (ok) {
      //delete nweet
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      //sotorage에 있는 이미지 삭제
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  }

  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet)
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      //실제 업데이트 할 내용을 적는것.
      text: newNweet
    })
    //바꾼다음 editing을 바꾸어줘야 최종적으로 수정이 완료되고 우리가 보이는 트위트 화면이
    setEditing(false)
  }
  const onChange = (event) => {
    const { target: { value }, } = event;
    setNewNweet(value)
  }


  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" />}
          {/* 내가 쓴글이면 버튼이 보이고 내가 쓴글이 아니면 버튼이 보이지 않음. */}
          {isOwner &&
            <>
              <button onClick={onDeleteClick} >Delete Nweet</button>
              <button onClick={toggleEditing} >Edit Nweet</button>
            </>
          }
        </>)
      }
    </div>
  )
}


export default Nweet