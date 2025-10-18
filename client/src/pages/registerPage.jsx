import { useState } from "react";
import { useAuthStore } from '../store/useAuthStore';
import { Link } from "react-router-dom";
import styles from "./auth.module.css";
import LoadingDots from "../components/loadingDots";

const RegistrationPage = ({ isDisplayed }) => {
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ password2, setPassword2 ] = useState( "" );
    const [ activationView, setActivationView ] = useState( false );

    const registration = useAuthStore( state => state.registration );
    const isLoading = useAuthStore( state => state.isLoading );

    const validateData = () => {
        return !!( email && password && password === password2 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test( email ) );
    }

    const handleRegister = async () => {
        try{
            const result = await registration( email, password );
            if( result ) 
                setActivationView( true );
        }catch( e ){
            console.log( e );
        }
    }

    const handlePressEnter = ( e ) => {
        if( e.key === "Enter" && validateData() ) 
            handleRegister();
    }

    return (
        <div 
            style={{ display: isDisplayed }} 
            className={ styles.container }
            tabIndex={ 0 }
            onKeyDown={ ( e ) => handlePressEnter( e )}
        >   
            <h1 className={ styles.header_text }>Регистрация</h1>
            <div className={ styles.loading_container }>
                { isLoading && <LoadingDots /> }
            </div>
            <input className={ styles.input }
                type="email"
                placeholder="Введите почту..."
                value={ email }
                onChange={ e => setEmail( e.target.value ) }
            />
            <input className={ styles.input }
                type="password"
                placeholder="Введите пароль..."
                value={ password }
                onChange={ e => setPassword( e.target.value ) }
            />
            <input className={ styles.input }
                type="password"
                placeholder="Повторите пароль..."
                value={ password2 }
                onChange={ e => setPassword2( e.target.value ) }
            />
            <button className={ styles.button }
                onClick={ () => {
                    if ( validateData() ) {
                        registration( email, password );
                    }
                }}
                disabled={ !validateData() }
            >Регистрация</button>
            <Link to="/" className={ styles.button_link }>Назад</Link>
        </div>
    
    );
}

export default RegistrationPage;
