import { create } from 'zustand';
import AuthService from '../services/authService.js';

export const useAuthStore = create(( set, get ) => ({
    user: null,
    isAuth: false,
    isLoading: false,
    isActivationGreeting: false,
    setAuth: ( isAuth ) => set({ isAuth }),
    setUser: ( user ) => set({ user }),
    login: async ( email, password ) => {
        try{
            set({ isLoading: true });
            const response = await AuthService.login( email, password );
            console.log( response );
            localStorage.setItem( 'token', response.data.accessToken );
            set({ user: response.data.user, isAuth: true, isLoading: false });
        }catch( error ){
            set({ isLoading: false });
            throw error;//new Error( error.response?.data?.message );
    }},

    registration: async ( email, password ) => {
        try{
            set({ isLoading: true });
            const response = await AuthService.registration( email, password );
            console.log( response );
            set({ isLoading: false, isActivationGreeting: true });
            
            return { registerStatus: true };
            //localStorage.setItem( 'token', response.data.accessToken );
            //set({ user: response.data.user, isAuth: true });
        }catch( error ){
            throw error;//new Error( error.response?.data?.message );
    }},

    checkAuth: async () => {
        const { isLoading } = get();

        if ( isLoading ) {
            return;
        }

        const token = localStorage.getItem( 'token' );

        if ( !token ) {
     
            set({ isAuth: false, isLoading: false });
            return;
        }

        try {
            set({ isLoading: true });

            const response = await AuthService.refresh();

            localStorage.setItem('token', response.data.accessToken);
            set({ user: response.data.user, isAuth: true, isLoading: false });
            
        } catch ( error ) {
            localStorage.removeItem('token');
            set({ user: null, isAuth: false, isLoading: false });
            console.log( error )
            throw error;//new Error(error.response?.data?.message || 'Auth check failed');
        }
    },

    logout: async () => {
        try{
            const response = await AuthService.logout();
            console.log( "Logout", response );
            localStorage.removeItem( 'token' );
            set({ user: null, isAuth: false });
        }catch( error ){
            console.log( error );
            throw error;//new Error( error.response?.data?.message );
    }},
}));

