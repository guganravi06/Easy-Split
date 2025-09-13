import styles from './Groups.module.css';
import GroupCard from './GroupCard';
import { useEffect, useState } from 'react';
import { collection, doc, documentId, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../fireBase';
import { useAuth } from '../contexts/AuthContext';

const Groups = () => {
  const {user} = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('Current user in Groups component:', user);
  useEffect(()=>{
    if(!user) return;

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userRef, async (userDoc) => {
      if (userDoc.exists()) {
        // console.log('User document data:', userDoc.data());
        const userGroups = userDoc.data().groups || [];
        
        // Fetch all groups that the user is a member of
        if (userGroups.length > 0) {
          const groupsQuery = query(
            collection(db, 'groups'),
            where(documentId(), 'in', userGroups)
          );

        const groupsSnapshot = await getDocs(groupsQuery);
        const groupsData = groupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setGroups(groupsData);
      }}
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [user]);
  if (loading) {
      return <div className={styles.container}>Loading groups...</div>;
    }

console.log('Fetched groups:', groups);

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
              balance={group.balance || 0}
              owed={group.owed || false}
            />
          ))
        )}
        </div>
      </div>
    );
  }

export default Groups