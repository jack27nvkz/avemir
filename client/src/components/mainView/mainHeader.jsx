import styles from "./mainHeader.module.css";
import { BsGearFill } from "react-icons/bs";
import { useUIStore } from "../../store/useUIStore";

const MainHeader = () => {
    const setActiveView = useUIStore( state => state.setActiveView );

    return (
        <div className={ styles.container }>
            <div className={ styles.profile } onClick={ () => setActiveView( "profile" )}></div>
            <div className={ styles.title }></div>
            <div className={ styles.settings }>
                <BsGearFill size={ 30 } color="wheat"/>
            </div>
        </div>
    );
}

export default MainHeader;