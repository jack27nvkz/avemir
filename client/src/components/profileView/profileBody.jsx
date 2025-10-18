import styles from "./profileBody.module.css";
import { useAuthStore } from "../../store/useAuthStore";
import { useUIStore } from "../../store/useUIStore";

const ProfileBody = () => {
    const logout = useAuthStore( state => state.logout );
    const user = useAuthStore( state => state.user );
    const setActiveView = useUIStore( state => state.setActiveView );

    return (
        <div className={ styles.container }>
            <div className={ styles.avatar }></div>
            <div className={ styles.name }>{ user.username }</div>
            <div className={ styles.inviteCode_container }>
                <div className={ styles.inviteCode_text }>Ваш код для приглашения</div>
                <div className={ styles.inviteCode }>{ user.inviteCode }</div>
            </div>
            <button 
                className={ styles.button }
                onClick={ () => {
                    logout();
                    setActiveView( "main" );
                }}
            >Разлогиниться</button>
        </div>
    );
}

export default ProfileBody; 