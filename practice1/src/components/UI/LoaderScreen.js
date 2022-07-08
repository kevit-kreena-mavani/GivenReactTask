import React, { Fragment } from "react";
import styles from "./LoaderScreen.module.css";
import  ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick ={props.onClick}></div>;
};

const Overlay = (props) => {
  return (
    <div className={styles.message}>
      <div>{props.children}</div>
    </div>
  );
};

const LoaderScreen = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};
export default LoaderScreen;