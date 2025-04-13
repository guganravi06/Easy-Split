import styles from './Groups.module.css';
import GroupCard from './GroupCard';

const Groups = ({ groups }) => {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Your Groups</h2>
        <div className={styles.grid}>
          {groups.map((group, index) => (
            <GroupCard
              key={index}
              name={group.name}
              memberCount={group.memberCount}
              balance={group.balance}
              owed={group.owed}
            />
          ))}
        </div>
      </div>
    );
  }

export default Groups