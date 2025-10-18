import styles from "./contactComponent.module.css";
import { BsFillCameraVideoFill, BsTelephoneFill, BsThreeDotsVertical, BsFillChatRightFill  } from "react-icons/bs";
import { useUIStore } from "../store/useUIStore";

const ContactComponent = () => {
    const setActiveView = useUIStore( state => state.setActiveView );

    const handleContainerClick = () => {
        setActiveView( "contact" );
    } 

    const handleButtonClick = ( type, e ) => {
        e.stopPropagation();

        switch( type ){
            case "chat":
                console.log("open chat");
                break;
            
            case "audio": 
                console.log("start audio");
                break;

            case "video":
                console.log("start video");
                break;

            case "options": 
                console.log("open options");
                break;
        }
    }

    return (
        <div className={ styles.container } onClick={ () => { handleContainerClick() }}>
            <div className={ styles.avatar }></div>
            <div className={ styles.data }>Name</div>
            <div className={ styles.button } onClick={ ( e ) => { handleButtonClick( "chat", e ) }}>
                <BsFillChatRightFill size={ 25 } color="wheat" className={ styles.icon }/>
            </div>
            <div className={ styles.button } onClick={ ( e ) => { handleButtonClick( "audio", e ) }}>
                <BsTelephoneFill size={ 25 } color="wheat"/>
            </div>
            <div className={ styles.button } onClick={ ( e ) => { handleButtonClick( "video", e ) }}>
                <BsFillCameraVideoFill size={ 25 } color="wheat"/>
            </div>
            <div className={ styles.button } onClick={ ( e ) => { handleButtonClick( "options", e ) }}>
                <BsThreeDotsVertical size={ 25 } color="wheat"/>
            </div>
        </div>
    );
}
export default ContactComponent;