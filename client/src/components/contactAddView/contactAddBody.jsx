import styles from "./contactAddBody.module.css";
import { useState } from "react";
import contactService from "../../services/contactService";

const ContactAddBody = () => {
    const [ firstValue, setFirstValue ] = useState("");
    const [ secondValue, setSecondValue ] = useState("");
    const [ statusText, setStatusText ] = useState("");
    const [ statusColor, setStatusColor ] = useState("");

    const handleChange = ( e, callback ) => {
        const value = e.target.value;

        if ( value.length <= 3 ) {
            callback( value );
        }
    }

    const handleClick = async () => {
        try{
            setFirstValue("");
            setSecondValue("");

            const contact = await contactService.addContact( `${ firstValue }-${ secondValue }` );

            setStatusText( "Добавлен контакт" );
            setStatusColor( "green" );
            console.log( "Added contact: ", contact );
        }catch( e ){
            setFirstValue("");
            setSecondValue("");
            setStatusColor( "red" );
            setStatusText( e.response.data.message );
            setTimeout( () => setStatusText(""), 3000 );
            console.log( e.response.data.message );
        }
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.status } style={{ color: statusColor }}>{ statusText }</div>
            <div className={ styles.input_container }>
                <input 
                    className={ styles.input } 
                    type="number" 
                    maxLength={ 3 } 
                    onChange={ ( e ) => handleChange( e, setFirstValue ) }
                    value={ firstValue }
                />
                <div className={ styles.text }>-</div> 
                <input 
                    className={ styles.input } 
                    type="number" 
                    maxLength={ 3 } 
                    onChange={ ( e ) => handleChange( e, setSecondValue ) }
                    value={ secondValue }
                />
            </div>
            <button 
                disabled={ firstValue.length !== 3 || secondValue.length !== 3 } 
                className={ styles.button }
                onClick={ () => handleClick() }
            >Готово</button>
        </div>
    );
}

export default ContactAddBody; 