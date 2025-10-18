import styles from "./style.module.css";
import ChatComponent from "../components/chatComponent";

const Chats = ({ chats }) => {
    let k = 0;
    
    return (
        <div className={ styles.container }>
            { chats 
                ?
                    chats.map( chat => {
                        return <ChatComponent key={ k++ }/>
                    })
                : 
                    <div className={ styles.no_data }>Нет чатов</div>
            }
        </div>
    );
}

export default Chats;