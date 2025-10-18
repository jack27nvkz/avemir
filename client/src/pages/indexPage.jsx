import { Link } from "react-router-dom";
import styles from "./auth.module.css";

const IndexPage = () => (
  <div className={ styles.container }>
    <h1>Chat</h1>
    <Link to="/login" className={ styles.button_link}>Войти</Link>
    <Link to="/register" className={ styles.button_link}>Зарегистрироваться</Link>
  </div>
);

export default IndexPage;
