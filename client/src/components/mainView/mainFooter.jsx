import styles from "./mainFooter.module.css";
import { useUIStore } from "../../store/useUIStore";
import { BsFillChatSquareFill, BsFillPersonFill, BsPersonVcardFill  } from "react-icons/bs";

const MainFooter = () => {
    const setActiveModule = useUIStore( state => state.setActiveModule );
    const activeModule = useUIStore( state => state.activeModule );

    return (
        <div className={ styles.container }>
            <div 
                className={ activeModule === "chats" ? styles.button_active : styles.button_inactive }
                onClick={ () => { setActiveModule( "chats" )}}
            ><BsFillChatSquareFill size={ 25 }/></div>
            <div 
                className={ activeModule === "contacts" ? styles.button_active : styles.button_inactive }
                onClick={ () => { setActiveModule( "contacts" )}}
            ><BsFillPersonFill  size={ 25 }/></div>
            <div 
                className={ activeModule === "activities" ? styles.button_active : styles.button_inactive }
                //onClick={ () => { setActiveModule( "activities" )}}
            >Activities</div>
        </div>
    );
}

export default MainFooter;