import styles from './appPage.module.css';
import MainHeader from '../components/mainView/mainHeader';
import MainFooter from '../components/mainView/mainFooter';
import Contacts from '../modules/contacts';
import Chats from '../modules/chats';
import Activities from '../modules/activities';
import ChatHeader from '../components/chatView/chatHeader';
import ChatBody from '../components/chatView/chatBody';
import ChatFooter from '../components/chatView/chatFooter';
import { useUIStore } from '../store/useUIStore';
import ContactAddHeader from '../components/contactAddView/contactAddHeader';
import ContactAddBody from '../components/contactAddView/contactAddBody';
import ProfileHeader from '../components/profileView/profileHeader';
import ProfileBody from '../components/profileView/profileBody';

const AppPage = () => {
    const activeModule = useUIStore( state => state.activeModule );
    const activeView = useUIStore( state => state.activeView );
    const test = [1, 2, 3];

    return(
        <div className={ styles.container }>
            { activeView === "main" && <div className={ styles.main }>
                <MainHeader />
                { activeModule === "contacts" && <Contacts contacts={ null }/> }
                { activeModule === "chats" && <Chats chats={ null }/>}
                { activeModule === "activities" && <Activities activities={ null }/> }
                <MainFooter />
            </div> }
            { activeView === "chat" && <div className={ styles.chat }>
                <ChatHeader />
                <ChatBody />
                <ChatFooter />
            </div> }
            { activeView === "contactAdd" && <div className={ styles.contact_add }>
                <ContactAddHeader />
                <ContactAddBody />
            </div> }
            <div className={ styles.ativity }></div>
            <div className={ styles.contact }></div>
            <div className={ styles.settings }></div>
            { activeView === "profile" && <div className={ styles.profile }>
                <ProfileHeader />
                <ProfileBody />
            </div> }
        </div>
    );
}

export default AppPage;
