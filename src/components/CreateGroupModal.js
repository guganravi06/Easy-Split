import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../fireBase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import styles from "./CreateGroupModal.module.css";
import Button from "./Button";
import InputField from "../components/InputField";

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const { user } = useAuth();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([
    { id: user.uid, name: user.displayName || user.email, email: user.email },
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [error, setError] = useState("");

  const checkIfUserExists = async (email) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleAddMember = async () => {
    setError(""); // Clear previous errors

    if (!newMemberEmail.trim()) {
      setError("Email is required");
      return;
    }

    // Check if member is already in the group
    if (members.some((member) => member.email === newMemberEmail)) {
      setError("This user is already in the group");
      return;
    }

    try {
      const userExists = await checkIfUserExists(newMemberEmail);

      if (!userExists) {
        setError(
          "This email is not registered. Please invite them to join Easy Split first."
        );
        return;
      }

      const newMember = {
        name: newMemberName.trim() || newMemberEmail, // Use email as name if no name provided
        email: newMemberEmail.trim(),
      };

      setMembers([...members, newMember]);
      setNewMemberName("");
      setNewMemberEmail("");
      setError("");
    } catch (error) {
      setError("Error checking user. Please try again.");
      console.error("Error checking user:", error);
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
        createdBy: user.uid, // Store user ID instead of name
        createdByName: user.displayName || user.email, // Store name for display
        members: members.map((m) => ({
          name: m.name,
          email: m.email,
        })),
        createdAt: Timestamp.now(),
      };

      try {
        const groupRef = await addDoc(collection(db, "groups"), newGroup);
        const groupId = groupRef.id;

        // 2. Update all member users' groups arrays
        const updatePromises = members.map(async (member) => {
          // Query to find user document by email
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", member.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(doc(db, "users", userDoc.id), {
              groups: arrayUnion(groupId),
            });
          }
        });

        await Promise.all(updatePromises);

        onCreateGroup({ ...newGroup, id: groupId });
        onClose();
        alert(`${groupName} Group Added!`);
      } catch (error) {
        console.error("Error adding group to Firebase:", error);
        alert("Failed to create group. Please try again.");
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Create Group</h2>
          <Button
            text="×"
            textAlign="right"
            onClick={onClose}
            className={styles.closeButton}
          />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            {/* <label htmlFor='groupName'>Group Name</label> */}
            <InputField
              type="text"
              placeholder="Enter group name"
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

            {error && <div className={styles.errorMessage}>{error}</div>}

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
                      text="×"
                      textAlign="right"
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
                  type="text"
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                />
                <InputField
                  type="email"
                  placeholder="Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.marginTopandbottom}></div>
              <Button
                text=" + Add Member"
                onClick={handleAddMember}
                className={styles.addMemberButton}
                type="button"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Button
              text=" Cancel"
              onClick={onClose}
              className={styles.cancelButton}
            />
            <Button
              text=" Create Group"
              className={styles.createButton}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
