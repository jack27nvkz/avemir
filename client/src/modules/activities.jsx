import styles from "./style.module.css";
import ActivityComponent from "../components/activityComponent";

const Activities = ({ activities }) => {
    let k = 0;
    return (
        <div className={ styles.container }>
            {
                activities.map( activity => {
                    return <ActivityComponent key={ k++ }/>
                })
            }
        </div>
    );
}

export default Activities;