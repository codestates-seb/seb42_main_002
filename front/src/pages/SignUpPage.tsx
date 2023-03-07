import styles from './SignUpPage.module.scss'
import {MdOutlineAttachEmail} from 'react-icons/md'
import {BsPencil} from 'react-icons/bs'
import {BsCalendar2Date} from 'react-icons/bs'
import {AiOutlineLock} from 'react-icons/ai'
import {FaVenus} from 'react-icons/fa'
import {FaMars} from 'react-icons/fa'
import {FaTransgender} from 'react-icons/fa'
import {useState} from 'react'

export default function SignUpPage (){
    const [isBtnClick,setIsBtnClick] = useState(false);
    
    return (
        <div className={styles.container}>        
            <div className={styles.input_container}>
            <label htmlFor="email">이메일</label>
            <input id="email"/>
            <MdOutlineAttachEmail className={styles.icon}/>
            </div>
            <div className={styles.input_container}>
            <label htmlFor='alias'>별명</label>
            <input id='alias'/>
            <BsPencil className={styles.icon} />
            </div>
            <p>성별</p>
            <div className={styles.button_Container}>
                <button><FaMars className={styles.male_icon}/> 남자</button>
                <button><FaVenus className={styles.female_icon}/> 여자</button>
                <button><FaTransgender className={styles.ambiguous_icon}/> 기타</button>
            </div>
            <div className={styles.input_container}>
            <label htmlFor='birthDate'>생년월일</label>
            <input id='birthDate'/>
            <BsCalendar2Date className={styles.icon}/>
            </div>
            <div className={styles.input_container}>
            <label htmlFor='passWord'>비밀번호</label>
            <input id='passWord'/>
            <AiOutlineLock className={styles.icon}/>
            </div>
            <div className={styles.input_container}>
            <label htmlFor='passWordCheck'>비밀번호 확인</label>
            <input id='passWordCheck'/>
            <AiOutlineLock className={styles.icon}/>
            </div>
            <button className={styles.signUp_Btn}>회원가입</button>
        </div>
    )
}