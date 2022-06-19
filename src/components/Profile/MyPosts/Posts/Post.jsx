import styles from './Post.module.css';

const Post = (props) => {

   return (

      <div className={styles.item}>
         <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4AuCaCDS8eeLRXGL0pFD9cIddYuHc8AJoSA&usqp=CAU'
            alt={'Post-illustration'}
         />
          {props.value}
         <div>
            Сподобалось {props.likesCount}
         </div>
      </div>

   );
}

export default Post;