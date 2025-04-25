import { collection, addDoc } from 'firebase/firestore';
import { db } from '../fireBase';
import React, { useState } from 'react';
import styles from './CreateGroupModal.module.css';
import Button from './Button';
import InputField from '../components/InputField';

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'Gauri Gulwane', email: 'gauri@example.com' },
    { id: 2, name: 'Gugan', email: 'gugan@example.com' },
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      const newMember = {
        id: Date.now(),
        name: newMemberName.trim(),
        email: newMemberEmail.trim(),
      };
      setMembers([...members, newMember]);
      setNewMemberName('');
      setNewMemberEmail('');
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (groupName.trim() && members.length > 0) {
      const newGroup = {
        name: groupName,
        memberCount: members.length,
        balance: 0,
        owed: false,
        members,
        createdAt: new Date(),
      };

      try {
        await addDoc(collection(db, 'groups'), newGroup); // sends data to 'groups' collection
        onCreateGroup(newGroup); // for local UI updates
        onClose();
        alert(`${groupName} Group Added!`);
      } catch (error) {
        console.error('Error adding group to Firebase:', error);
        alert('Failed to create group. Please try again.');
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Create Group</h2>
          <Button
            text='×'
            textAlign='right'
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            {/* <label htmlFor='groupName'>Group Name</label> */}
            <InputField
              type='text'
              placeholder='Enter group name'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.membersHeader}>
              <label>Group Members</label>
              <span>{members.length} members</span>
            </div>

            <div className={styles.membersList}>
              {members.map((member) => (
                <div key={member.id} className={styles.memberItem}>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberName}>{member.name}</span>
                    {member.email && (
                      <span className={styles.memberEmail}>{member.email}</span>
                    )}
                  </div>
                  {member.id !== 1 && (
                    <Button
                      text='×'
                      textAlign='right'
                      onClick={() => handleRemoveMember(member.id)}
                      className={styles.removeMemberButton}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.addMemberForm}>
              <div className={styles.addMemberInputs}>
                <InputField
                  type='text'
                  placeholder='Name'
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <InputField
                  type='email'
                  placeholder='Email (optional)'
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>
              <div className={styles.marginTopandbottom}></div>
              <Button
                text=' + Add Member'
                onClick={handleAddMember}
                className={styles.addMemberButton}
                type='button'
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Button
              text=' Cancel'
              onClick={onClose}
              className={styles.cancelButton}
            />
            <Button
              text=' Create Group'
              className={styles.createButton}
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
