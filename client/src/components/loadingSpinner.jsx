import styles from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
        <div className={ styles.loadingContainer }>
            <div className={ styles.spinner }></div>
            <p className={ styles.loadingText }>Загрузка...</p>
        </div>
    );
}

export default LoadingSpinner; 