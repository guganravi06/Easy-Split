import styles from './Groups.module.css';
import GroupCard from './GroupCard';

const Groups = ({ groups, loading }) => {
  if (loading) {
    return <div className={styles.container}>Loading groups...</div>;
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Groups</h2>
      <div className={styles.grid}>
        {groups.length === 0 ? (
          <p>No groups yet. Create one to get started!</p>
        ) : (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              name={group.name}
              memberCount={group.members.length}
              balance={group.balance}
              owed={group.owed}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Groups;