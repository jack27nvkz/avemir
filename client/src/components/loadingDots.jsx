import styles from "./loadingDots.module.css";

const LoadingDots = () => {
    return (
        <div className={styles.runningDots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
}

export default LoadingDots;