import styles from "./style.module.css";
import ContactComponent from "../components/contactComponent";
import { useUIStore } from "../store/useUIStore";

const Contacts = ({ contacts }) => {
    const setActiveView = useUIStore( state => state.setActiveView );

    let k = 0;
    return (
        <div className={ styles.container }>
            { contacts 
                ?
                    contacts.map( cont => {
                        return <ContactComponent key={ k++ }/>
                    })
                :
                    <div className={ styles.no_data }>Нет контактов</div>
            }
            <div className={ styles.button_add } onClick={ () => { setActiveView( "contactAdd" )}}>Добавить</div>
        </div>
    );
}

export default Contacts;