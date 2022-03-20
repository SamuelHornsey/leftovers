import { h, Component } from "preact";
import { useReducer, useContext } from "preact/hooks";
import { doc, deleteDoc } from "firebase/firestore";

import "./Item.scss";

import UserContext from "../../services/user";
import { db } from "../../services/firebase";

import tick from "../../assets/tick.png";

const Item = (props) => {
  let timer;
  const user = useContext(UserContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { status: props.status, controls: false }
  );

  const toggle = () => {
    setState({ status: !state.status });
  };

  const touchStart = () => {
    timer = setTimeout(() => setState({ controls: true }), 1000);
  };

  const touchEnd = () => {
    clearTimeout(timer);
  };

  const deleteItem = () => {
    deleteDoc(doc(db, `users/${user.uid}/ingredients/${props.id}`)).then(() =>
      setState({ controls: false })
    );
  };

  const close = () => {
    setState({ controls: false });
  };

  return (
    <div class={state.controls ? "Item Item--controls" : "Item"}>
      <div
        class="Item__container"
        onClick={toggle}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
        <div class="Item__text">{props.title}</div>
        <div class="Item__tickBox">
          <div class="Item__tickBoxContainer">
            {state.status ? (
              <img class="Item__tick" src={tick} alt="tick" />
            ) : null}
          </div>
        </div>
      </div>

      <div
        class={
          state.controls
            ? "Item__controls Item__controls--active"
            : "Item__controls"
        }
      >
        <div class="Item__delete" onClick={deleteItem}>
          Delete
        </div>
        <div class="Item__close" onClick={close}>
          Close
        </div>
      </div>
    </div>
  );
};

export default Item;