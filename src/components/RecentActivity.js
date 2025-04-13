import styles from './RecentActivity.module.css';

const RecentActivity = ({ transactions }) => {
    const recentTransactions = transactions.slice(0,3)
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recent Activity</h2>
            <table className={styles.table}>
                <tbody>
                    {recentTransactions.map((transaction, index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={`${styles.tableCell} ${styles.description}`}>
                                {transaction.description}
                            </td>
                            <td className={`${styles.tableCell} ${styles.group}`}>
                                {transaction.group}
                            </td>
                            <td className={`${styles.tableCell} ${styles.date}`}>
                                {transaction.date}
                            </td>
                            <td className={`${styles.tableCell} ${styles.amount}`}>
                                ${transaction.amount.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentActivity;

