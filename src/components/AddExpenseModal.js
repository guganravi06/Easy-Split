import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../fireBase';
import styles from './AddExpenseModal.module.css';
import Button from './Button';
import InputField from './InputField';

const AddExpenseModal = ({ onClose }) => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState('equal');
  const [error, setError] = useState('');

  // Fetch user's groups and group details
  useEffect(() => {
    const fetchUserGroups = async () => {
      if (!user?.uid) return;
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
          const groupsData = groupsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setGroups(groupsData);
          setSelectedGroupId(groupsData[0]?.id || '');
        }
      }
    };
    fetchUserGroups();
  }, [user]);

  // Fetch members when selected group changes
  useEffect(() => {
    if (!selectedGroupId) {
      setMembers([]);
      setPaidBy('');
      return;
    }
    const group = groups.find(g => g.id === selectedGroupId);
    if (group && group.members) {
      setMembers(group.members);
      setPaidBy(group.members[0]?.id || '');
    }
  }, [selectedGroupId, groups]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !amount || !date || !selectedGroupId || !paidBy) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      const expenseData = {
        description: description.trim(),
        amount: parseFloat(amount),
        date: Timestamp.fromDate(new Date(date)),
        paidBy,
        splitType,
        groupId: selectedGroupId,
        createdAt: Timestamp.now(),
        splitBetween: members.map(member => ({
          userId: member.email,
          name: member.name,
          share: splitType === 'equal' ? parseFloat(amount) / members.length : 0
        }))
      };
      console.log('expenseData:', expenseData);
      await addDoc(collection(db, `groups/${selectedGroupId}/expenses`), expenseData);
      
      onClose();
    } catch (error) {
      setError('Failed to add expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add Expense</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label>Description</label>
            <InputField
              type="text"
              placeholder="What was is for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Amount</label>
              <InputField
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Date</label>
              <InputField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Paid by</label>
              <select
                className={styles.select}
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                required
              >
                {members.map(member => (
                  <option key={member.id || member.email} value={member.id}>
                    {member.id === user?.uid ? 'You' : member.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Group</label>
              <select
                className={styles.select}
                value={selectedGroupId}
                onChange={e => setSelectedGroupId(e.target.value)}
                required
              >
                {groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.splitButtons}>
            <Button
              text="Split equally"
              onClick={() => setSplitType('equal')}
              className={`${styles.splitButton} ${splitType === 'equal' ? styles.active : ''}`}
              type="button"
            />
            {/* <Button
              text="Custom amount"
              onClick={() => setSplitType('custom')}
              className={`${styles.splitButton} ${splitType === 'custom' ? styles.active : ''}`}
              type="button"
              disabled
            /> */}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.modalFooter}>
            <Button
              text="Cancel"
              onClick={onClose}
              className={styles.cancelButton}
              type="button"
            />
            <Button
              text="Save"
              className={styles.saveButton}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;