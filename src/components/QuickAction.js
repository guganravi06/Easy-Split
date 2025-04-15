import styles from './QuickAction.module.css';
import React from 'react';
import Button from './Button';

const QuickActions = ({ onCreateGroup, onAddExpense, onSettleUp }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quick Actions</h2>
      <Button
        text='Create Group'
        textAlign='center'
        onClick={onCreateGroup}
        className={styles.createGroupButton}
      />
      <Button
        text='Add Expense'
        textAlign='center'
        onClick={onAddExpense}
        className={styles.addExpenseButton}
      />
      <Button
        text='Settle Up'
        textAlign='center'
        onClick={onSettleUp}
        className={styles.settleUpButton}
      />
    </div>
  );
};

export default QuickActions;
