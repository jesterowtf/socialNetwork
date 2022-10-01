import React from "react";
import s from "./friends.module.scss";
import Friend from "./Friend";

const Friends = (props) => {

  let {friendsData} = props;
  return (
    <div className={s.friends}>
        <h3 className={s.friendTitle}>Друзья:</h3>
        <div className={s.friendsItems}>
          {friendsData.map((fr) => <Friend key={fr.id} name={fr.name} ava={fr.ava} />)}
        </div>
      </div>
  );
};

export default Friends;
