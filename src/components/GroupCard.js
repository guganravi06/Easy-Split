import React from 'react';
import styles from './GroupCard.module.css'

const GroupCard = ({name,memberCount,balance,owed}) => {
    const balanceClass = owed 
    ? styles.positiveBalance 
    : styles.negativeBalance;
  
  const formattedBalance = `${owed ? '+' : '-'}$${Math.abs(balance).toFixed(2)}`;
  const statusText = owed ? "You're owed" : "You owe";
  
  return (
    <div className={styles.groupCard}>
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.members}>{memberCount} members</p>
      <p className={`${styles.balance} ${balanceClass}`}>
        {formattedBalance}
      </p>
      <p className={styles.status}>{statusText}</p>
    </div>
  );
}

export default GroupCard