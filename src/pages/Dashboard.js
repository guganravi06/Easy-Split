import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import StatCard from '../components/StatCard';
import Groups from '../components/Groups';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickAction';
import OutstandingBalances from '../components/OutstandingBalances';
import CreateGroupModal from '../components/CreateGroupModal';
import AddExpenseModal from '../components/AddExpenseModal';

const Dashboard = () => {

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const transactionsData = [
    {
      id: 1,
      description: 'Grocery shopping',
      group: 'Roommates',
      date: '2 days ago',
      amount: 45.0,
    },
    {
      id: 2,
      description: "Dinner at Luigi's",
      group: 'Dinner Club',
      date: '5 days ago',
      amount: 120.0,
    },
    {
      id: 3,
      description: 'Hotel deposit',
      group: 'Trip to NYC',
      date: '1 week ago',
      amount: 350.0,
    },
    {
      id: 4,
      description: 'Hotel deposit',
      group: 'Trip to NYC',
      date: '1 week ago',
      amount: 350.0,
    },
  ];
  const balancesData = [
    {
      id: 'J',
      name: 'John Smith',
      amount: 45.0,
      userOwes: false,
      color: ' #4a8f7b',
    },
    {
      id: 'A',
      name: 'Amy Johnson',
      amount: 40.0,
      userOwes: false,
      color: ' #4a8f7b',
    },
    {
      id: 'M',
      name: 'Mike Chen',
      amount: 25.5,
      userOwes: true,
      color: ' #4a8f7b',
    },
  ];

  const handleCreateGroup = () => {
    setShowCreateGroupModal(false);
  };

  const handleAddExpense = (group) => {
    setShowExpenseModal(true);
  };

  const handleSettleUp = () => {
    alert('Settle up clicked');
    // Add your implementation logic here
  };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContentContainer}>
          <div className={styles.statsContainer}>
            <StatCard
              title='Total Balance'
              value='$124.50'
              subtitle='You are owed'
            />
            <StatCard
              title='Active Groups'
              value='3'
              subtitle='With 11 people'
            />
            <StatCard
              title='Recent Expenses'
              value='12'
              subtitle='In the last 30 days'
            />
          </div>
          <Groups />
          <RecentActivity transactions={transactionsData} />
        </div>

        <div className={styles.sidebarContainer}>
          <QuickActions
            onCreateGroup={() => setShowCreateGroupModal(true)}
            onAddExpense={handleAddExpense}
            onSettleUp={handleSettleUp}
          />
          <OutstandingBalances balances={balancesData} />
        </div>
        {showCreateGroupModal && (
          <CreateGroupModal
            onClose={() => setShowCreateGroupModal(false)}
            onCreateGroup={handleCreateGroup}
          />
        )}
        {showExpenseModal  && (
          <AddExpenseModal
            onClose={() => setShowExpenseModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
