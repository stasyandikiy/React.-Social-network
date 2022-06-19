import styles from './Music.module.css';
import YoureMyHeart from './MusicTrack/modern-talking_-_you-re-my-heart-you-re-my-soul.mp3'
import samci from './MusicTrack/Samci.mp3'
import we_no_angels_boy from './MusicTrack/we_no_angels_boy.mp3'
import Youre_a_Woman from './MusicTrack/Youre_a_Woman.mp3'

//Страница для шаблона, код некрасивый :)
export const Music = () =>{
    
    let musicArray = [ YoureMyHeart, samci,  we_no_angels_boy, Youre_a_Woman ]

    return(
        <div className={styles.music}>
            <div className={styles.playlist}>
                <audio controls>
                    <source src={musicArray[0]} />
                </audio>
            </div>
        <div className={styles.listMusic}>
            <div>
                <span>modern-talking_-_you-re-my-heart-you-re-my-soul</span>
                <audio controls>
                    <source src={musicArray[0]} />
                </audio>
            </div>
            <div>
                <span>Самцы. feat.Berserk/Sokol</span>
                <audio controls>
                    <source src={musicArray[1]} />
                </audio>
            </div>
            <div>                
                <span>A мы не ангелы, парень. Алексей Пономарёв</span>
                 <audio controls>
                    <source src={musicArray[2]} />
                </audio>
            </div>
            <div>
                <span>You`re_a_Woman Bad Boys Blue</span>
                <audio controls>
                    <source src={musicArray[3]} />
                </audio>
            </div>   
        </div>
        </div>
    )
}