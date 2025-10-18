import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import LoadingDots from "../components/loadingDots";

const LoginPage = ({ isDisplayed }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ statusMessage, setStatusMessage ] = useState("");
    const [ statusTextColor, setStatusTextColor ] = useState("");

    const login = useAuthStore( state => state.login );
    const isAuth = useAuthStore( state => state.isAuth );
    const isLoading = useAuthStore( state => state.isLoading );
    const navigate = useNavigate();

    const validateData = () => {
        return !!( email && password && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test( email ) );
    }

    const handleLogin = async () => {
        try{
            setStatusMessage( "" );
            await login( email, password );
        }catch( e ){
            const message = e.response?.data?.message || "Ошибка входа";
            setStatusTextColor( "red" );
            setStatusMessage( message );
            console.log( e );
        }
    }

    const handlePressEnter = ( e ) => {
        if( e.key === "Enter" && validateData() )
            handleLogin();
    }

    useEffect(() => {
        const activationStatus = searchParams.get( 'activation' );
        const email = searchParams.get( 'email' );
        
        if ( activationStatus === 'success' ) {
            setStatusTextColor( 'green' );
            setStatusMessage( `Аккаунт ${ email } успешно активирован! Теперь вы можете войти` );

            searchParams.delete( 'activation' );
            searchParams.delete( 'email' );
            setSearchParams( searchParams );
        } else if ( activationStatus === 'failed' ) {
            setStatusTextColor( 'red' );
            setStatusMessage( 'Ошибка активации. Ссылка недействительна или устарела' );
            
            searchParams.delete( 'activation' );
            setSearchParams( searchParams );
        }
    }, [ searchParams, setSearchParams ]);

    useEffect(() => {
        if( isAuth )
            navigate( "/app" );
    }, [ isAuth, navigate ] );

    useEffect(() => {
        if( email || password )
            setStatusMessage( "" );
    }, [ email, password ] );

    return (
        <div 
            style={{ display: isDisplayed }} 
            className={ styles.container }
            tabIndex={ 0 }
            onKeyDown={ ( e ) => handlePressEnter( e ) }
        >
            <h1 className={ styles.header_text }>Вход</h1>
            <div className={ styles.loading_container }>
                { isLoading && <LoadingDots /> }
            </div>
            <input className={ styles.input }
                type="email"
                placeholder="Введите почту..."
                value={ email }
                onChange={ e => setEmail( e.target.value ) }
                id="email"
            />
            <input className={ styles.input }
                type="password"
                placeholder="Введите пароль..."
                value={ password }
                onChange={ e => setPassword( e.target.value ) }
                id="password"
            />
            <button className={ styles.button }
                onClick={ () => {
                    handleLogin();
                }}
                disabled={ !validateData() }
            >Войти</button> 
            <Link to="/" className={ styles.button_link }>Назад</Link>
            <div className={ styles.status_message } style={{ color: statusTextColor }}>{ statusMessage }</div>
        </div>
    );
}

export default LoginPage;
