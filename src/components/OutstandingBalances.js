// src/components/OutstandingBalances.js
import React from 'react';
import styles from './OutstandingBalances.module.css';

const OutstandingBalances = ({ balances }) => {
  // Helper to get the initial letter from a name
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Outstanding Balances</h2>

      {balances.map((balance, index) => (
        <div key={index} className={styles.balanceCard}>
          <div
            className={styles.userAvatar}
            style={{ backgroundColor: balance.color || ' #4a8f7b' }}
          >
            {balance.initial || getInitial(balance.name)}
          </div>

          <div className={styles.balanceInfo}>
            <div className={styles.userName}>{balance.name}</div>
            <div
              className={`${styles.balanceAmount} ${
                balance.userOwes ? styles.youOwe : styles.owesYou
              }`}
            >
              {balance.userOwes ? 'You owe' : 'Owes you'} $
              {balance.amount.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutstandingBalances;
