// src/components/OutstandingBalances.js
import React from 'react';
import styles from './OutstandingBalances.module.css';

const OutstandingBalances = ({ balances }) => {
  // Helper to get the initial letter from a name
  const getInitial = (name) => (name ? name[0].toUpperCase() : '?');

  if (!balances || balances.length === 0) {
    return <div className={styles.empty}>No outstanding balances!</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Outstanding Balances</h3>
      <ul className={styles.list}>
        {balances.map((balance) => (
          <li key={balance.id} className={styles.item}>
            <span
              className={styles.avatar}
              style={{ background: balance.color }}
            >
              {getInitial(balance.name)}
            </span>
            <span className={styles.name}>{balance.name}</span>
            <span
              className={
                balance.userOwes ? styles.negative : styles.positive
              }
            >
              ₹{balance.amount.toFixed(2)}{' '}
              {balance.userOwes ? 'You owe' : 'You are owed'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutstandingBalances;
