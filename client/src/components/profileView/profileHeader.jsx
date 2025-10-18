import styles from "./profileHeader.module.css";
import { useUIStore } from "../../store/useUIStore";
import { BsArrowLeft } from "react-icons/bs";

const ProfileHeader = () => {
    const setActiveView = useUIStore( state => state.setActiveView );

    return (
        <div className={ styles.container }>
            <div className={ styles.button } onClick={ () => { setActiveView( "main" )}}>
                <BsArrowLeft size={ 25 } color="wheat"/>
            </div>
        </div>
    );
}

export default ProfileHeader;