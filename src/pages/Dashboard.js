import React from 'react';
import styles from './Dashboard.module.css'
import StatCard from '../components/StatCard';
import Groups from '../components/Groups';
import RecentActivity from '../components/RecentActivity';

const Dashboard = () => {

    const groupsData = [
        { name: "Roommates", memberCount: 4, balance: 85.00, owed: true },
        { name: "Trip to NYC", memberCount: 6, balance: 25.50, owed: false },
        { name: "Dinner Club", memberCount: 3, balance: 65.00, owed: true }
    ];

    const transactionsData = [
        { id: 1, description: "Grocery shopping", group: "Roommates", date: "2 days ago", amount: 45.00 },
        { id: 2, description: "Dinner at Luigi's", group: "Dinner Club", date: "5 days ago", amount: 120.00 },
        { id: 3, description: "Hotel deposit", group: "Trip to NYC", date: "1 week ago", amount: 350.00 },
        { id: 4, description: "Hotel deposit", group: "Trip to NYC", date: "1 week ago", amount: 350.00 }
    ];

    return (
        <div>
            <div className={styles.statsContainer}>
                <StatCard
                    title="Total Balance"
                    value="$124.50"
                    subtitle="You are owed"
                />
                <StatCard
                    title="Active Groups"
                    value="3"
                    subtitle="With 11 people"
                />
                <StatCard
                    title="Recent Expenses"
                    value="12"
                    subtitle="In the last 30 days"
                />
            </div>
            <Groups groups={groupsData} />
            <RecentActivity transactions={transactionsData}/>
        </div>
    )
}

export default Dashboard