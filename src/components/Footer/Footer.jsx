import React from "react";
import s from "./footer.module.scss";

const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.copyright}>
              © Социальная сеть 2022
            </div>
        </div>
    )
}

export default Footer;