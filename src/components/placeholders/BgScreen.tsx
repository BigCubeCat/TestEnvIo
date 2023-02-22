import React from "react";
import style from './BgScreen.module.css';

export default function BgScreen() {
  return (
    <>
      <img
        src="/bg_svg/bg.svg"
        className={style.BgScreen}
        style={{ top: 0, left: 0 }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}
