import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import StatCard from '../components/StatCard';
import Groups from '../components/Groups';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickAction';
import OutstandingBalances from '../components/OutstandingBalances';
import CreateGroupModal from '../components/CreateGroupModal';
import AddExpenseModal from '../components/AddExpenseModal';
import { useAuth } from '../contexts/AuthContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../fireBase';

const Dashboard = () => {
  const {user} = useAuth();
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch all users
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersArr = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsersData(usersArr);
      console.log('All users:', usersArr);

      // Fetch groups for current user
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const groupIds = userDocSnap.data().groups || [];
          if (groupIds.length > 0) {
            const groupsQuery = query(
              collection(db, 'groups'),
              where('__name__', 'in', groupIds)
            );
            const groupsSnap = await getDocs(groupsQuery);
            const groupsArr = groupsSnap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setGroupsData(groupsArr);
            console.log('User groups:', groupsArr);

            // Fetch expenses for each group
            let allExpenses = [];
            for (const group of groupsArr) {
              const expensesSnap = await getDocs(collection(db, 'groups', group.id, 'expenses'));
              const expensesArr = expensesSnap.docs.map(doc => ({
                id: doc.id,
                groupId: group.id,
                ...doc.data()
              }));
              allExpenses = allExpenses.concat(expensesArr);
            }
            setExpensesData(allExpenses);
            console.log('All expenses:', allExpenses);
          } else {
            setGroupsData([]);
            console.log('User groups: []');
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const totalBalance = groupsData.reduce(
    (sum, group) => sum + getUserBalanceForGroup(group, expensesData, user.email),
    0
  );

  const activeGroups = groupsData.length;
  const recentExpenses = expensesData.filter(
    exp => exp.createdAt.seconds > (Date.now() / 1000) - (30 * 24 * 60 * 60)
  ).length;

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

  function getUserBalanceForGroup(group, expenses, userEmail) {
    let balance = 0;
    expenses
      .filter(exp => exp.groupId === group.id)
      .forEach(exp => {
        // If user paid, add full amount
        if (exp.paidBy === userEmail) {
          balance += exp.amount - exp.splitBetween.reduce((sum, s) => sum + (s.userId === userEmail ? s.share : 0), 0);
        }
        // If user owes, subtract their share
        else {
          const userShare = exp.splitBetween.find(s => s.userId === userEmail);
          if (userShare) balance -= userShare.share;
        }
      });
    return balance;
  }

  const recentActivityData = expensesData
    .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
    .slice(0, 10)
    .map(exp => ({
      id: exp.id,
      description: exp.description,
      group: groupsData.find(g => g.id === exp.groupId)?.name || '',
      date: new Date(exp.createdAt.seconds * 1000).toLocaleDateString(),
      amount: exp.amount,
    }));

  function getOutstandingBalances(groups, expenses, currentUserEmail, currentUserName) {
    const balances = [];

    groups.forEach(group => {
      group.members.forEach(member => {
        if (member.email === currentUserEmail) return; // Skip self

        let netAmount = 0;

        expenses
          .filter(exp => exp.groupId === group.id)
          .forEach(exp => {
            // If this member paid
            if (exp.paidBy === member.name) {
              // Current user owes their share
              const userShare = exp.splitBetween.find(s => s.userId === currentUserEmail);
              if (userShare) netAmount += userShare.share;
            }
            // If current user paid
            else if (exp.paidBy === currentUserName) {
              // Member owes their share
              const memberShare = exp.splitBetween.find(s => s.userId === member.email);
              if (memberShare) netAmount -= memberShare.share;
            }
          });

        // Only show if there is a non-zero balance
        if (Math.abs(netAmount) > 0.01) {
          balances.push({
            id: member.email,
            name: member.name,
            amount: Math.abs(netAmount),
            userOwes: netAmount > 0, // If positive, user owes this member
            color: '#4a8f7b',
          });
        }
      });
    });

    return balances;
  }

  const outstandingBalancesData = getOutstandingBalances(
    groupsData,
    expensesData,
    user.email,
    user.displayName || user.name
  );

  console.log('OutstandingBalances:', outstandingBalancesData);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContentContainer}>
          <div className={styles.statsContainer}>
            <StatCard
              title='Total Balance'
              value={`$${totalBalance.toFixed(2)}`}
              subtitle={totalBalance > 0 ? 'You are owed' : totalBalance < 0 ? 'You owe' : 'All settled'}
            />
            <StatCard
              title='Active Groups'
              value={activeGroups}
              subtitle={`With ${usersData.length} people`}
            />
            <StatCard
              title='Recent Expenses'
              value={recentExpenses}
              subtitle='In the last 30 days'
            />
          </div>
          <Groups
            groups={groupsData.map(group => ({
              ...group,
              balance: getUserBalanceForGroup(group, expensesData, user.email),
              owed: getUserBalanceForGroup(group, expensesData, user.email) > 0
            }))}
            loading={loading}
          />
          <RecentActivity transactions={recentActivityData} />
        </div>

        <div className={styles.sidebarContainer}>
          <QuickActions
            onCreateGroup={() => setShowCreateGroupModal(true)}
            onAddExpense={handleAddExpense}
            onSettleUp={handleSettleUp}
          />
          <OutstandingBalances balances={outstandingBalancesData} />
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
