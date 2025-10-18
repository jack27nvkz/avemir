import styles from "./chatComponent.module.css";
import { useUIStore } from "../store/useUIStore";

const ChatComponent = () => {
    const setActiveView = useUIStore( state => state.setActiveView );
    const formatMeassage = ( message ) => {
        if( message.length > 30 ) {
            return message.slice( 0, 30 ) + "...";
        }  
        return message;
    }

    return (
        <div className={ styles.container } onClick={ () => { setActiveView( "chat" ) }}>
            <div className={ styles.avatar }></div>
            <div className={ styles.data }>
                <div className={ styles.name }>Name</div>
                <div className={ styles.last_massage }>{ formatMeassage("Привет") }</div>
            </div>
            <div className={ styles.time }>12:30</div>
        </div>
    );
}
export default ChatComponent;