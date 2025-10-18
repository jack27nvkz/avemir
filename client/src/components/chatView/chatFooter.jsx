import styles from "./chatFooter.module.css";
import { useRef, useState } from "react";
import { BsFillCursorFill } from "react-icons/bs";

const ChatFooter = () => {
    const [ text, setText ] = useState( "" );
    const textareaRef = useRef( null );

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if ( textarea ) {
            textarea.style.height = 'auto';
            textarea.style.height = `${ textarea.scrollHeight }px`;
        }
    };

    const handleSend = () => {
        if ( text.trim() === "" ) return;

        // Send the message logic here

        setText( "" );
        adjustHeight();
    }

    const handleKeyDown = ( e ) => {
        if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            handleSend();
        }
    }

    return(
        <div className={ styles.container }>
            <textarea 
                rows={ 1 }
                value={ text }
                onChange={( e ) => { setText( e.target.value )}}
                onKeyDown={( e ) => { handleKeyDown( e )}}
                id="chat_input" 
                className={ styles.input } 
                placeholder="Type a message..."
                ref={ textareaRef }
            />
            <button 
                className={ styles.button_send }
                onClick={ handleSend }><BsFillCursorFill size={ 25 }/></button>
        </div>
    );
};


export default ChatFooter;