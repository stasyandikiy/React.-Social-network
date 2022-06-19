import React from "react";
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import home from './imgMenu/home.png';
import message from './imgMenu/message.png';
import music from './imgMenu/music.png';
import news from './imgMenu/news.png';
import setting from './imgMenu/setting.png';
import users from './imgMenu/Users.png';

const Navbar = () => {
   return (

      <nav className={styles.nav}>
         <div className={styles.item}>
            <NavLink to='/profile'
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={home}/> Моя сторінка
            </NavLink>
         </div>

         <div className={styles.item}>
            <NavLink to='/dialogs'
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={message}/> Повідомлення
            </NavLink>
         </div>

         <div className={styles.item}> 
            <NavLink to='/users'
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={users}/> Користувачі
            </NavLink>
         </div>

         <div className={styles.item}>
            <NavLink to="/news"
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={news}/> Новини
            </NavLink>
         </div>

         <div className={styles.item}>
            <NavLink to="/music"
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={music}/> Музика
            </NavLink>
         </div>
         <div className={styles.item}> 
            <NavLink to="/settings"
                     className={navData => navData.isActive ? styles.activeLink : styles.item}>
               <img src={setting}/> Налаштування
            </NavLink>
         </div>
      </nav>
   );

}

export default Navbar;