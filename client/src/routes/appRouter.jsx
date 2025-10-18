import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';
import LoginPage from '../pages/loginPage';
import RegistrationPage from '../pages/registerPage';
import IndexPage from '../pages/indexPage';
import AppPage from '../pages/appPage';
import styles from "./appRouter.module.css";

const AppRouter = () => {
    const checkAuth = useAuthStore( state => state.checkAuth );
    const isAuth = useAuthStore( state => state.isAuth );
    const isActivationGreeting = useAuthStore( state => state.isActivationGreeting );
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try{
                await checkAuth();
            } catch ( e ) {
                console.log( e );
            }
            
            if ( isAuth ) {
                navigate("/app");
            }
        } 

        fetchData();
    }, [ checkAuth, isAuth, navigate ] );

    if( isActivationGreeting ){
        return (
            <div className={ styles.activation_view }>
                <h2> Успешная региcтрация! На указанную вами почту отправлено письмо с ссылкой для активации</h2>
            </div>
        );
    }

    return (
        <Routes>
            {
                isAuth && <Route path="/app" element={<AppPage />} />
            }
            <Route path="/" element={<IndexPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
    );
}

export default AppRouter;