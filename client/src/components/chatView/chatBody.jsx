import styles from "./chatBody.module.css";

const ChatBody = ({ messages }) => {

    return (
        <div className={ styles.container }>
            {messages ?
                messages.map( ( message, index ) => {
                    return (
                        <div key={ index } className={ styles.message }>
                            <div className={ styles.text }>{ message.text }</div>
                            <div className={ styles.time }>{ message.createdAt }</div>
                        </div>
                    );
                })
            : <div className={ styles.empty_body }>No messages yet</div>}
        </div>
    );
}

export default ChatBody;
        