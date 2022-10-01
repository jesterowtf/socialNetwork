import React from "react";
import s from './preloader.module.scss';
import preloader from './../../assets/images/preloader.svg';

const Preloader = (props) => {
    return (
        <div className={s.fetching}>
            <img src={preloader} alt="preloader"/>
        </div>
    )
}

export default Preloader;