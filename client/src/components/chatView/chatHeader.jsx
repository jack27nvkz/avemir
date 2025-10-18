import styles from "./chatHeader.module.css";
import { useUIStore } from "../../store/useUIStore";
import { BsArrowLeft, BsFillCameraVideoFill, BsTelephoneFill, BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = () => {
    const setActiveView = useUIStore( state => state.setActiveView );
    return (
        <div className={ styles.container }>
            <div className={ styles.button } id={ styles.arrow } onClick={ () => { setActiveView( "main" )}}>
                <BsArrowLeft size={ 25 } color="wheat"/>
            </div>
            <div className={ styles.user_avatar }></div>
            <div className={ styles.user_data }>Name</div>
            <div className={ styles.button } id={ styles.audiocall }>
                <BsTelephoneFill size={ 25 } color="wheat"/>
            </div>
            <div className={ styles.button } id={ styles.videocall }>
                <BsFillCameraVideoFill size={ 25 } color="wheat"/>
            </div>
            <div className={ styles.button } id={ styles.options }>
                <BsThreeDotsVertical size={ 25 } color="wheat"/>
            </div>
        </div>
    );
}

export default ChatHeader;