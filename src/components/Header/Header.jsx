//
import React from "react";
import {NavLink} from "react-router-dom";
import styles from './Header.module.css';
import logo from './logo.png'

const Header = (props) => {
   return (
      <header className={styles.header}>

         <img src={logo}/>
         <input placeholder="🔍︎ Пошук" className={styles.inputSearch}/>

         {props.isAuth
            ?
            <span className={styles.loginBlockIsAuth}>
                  {props.login} - <button onClick={props.logout}>
                  Вийти з кабінету</button>
            </span>
            :
            <NavLink
               className={styles.loginBlockNotAuth} to={'/login'}
            >Увійти в кабінет</NavLink>
         }

      </header>
   );
}

export default Header;
