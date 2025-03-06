import React from 'react';
import styles from './SignUp.module.css';
import LeftSideIllustrator from '../components/LeftSideIllustrator';
import InputField from '../components/InputField'
import Button from '../components/Button'

const SignUp = () => {
  return (
    <div className={styles.container}>
        <div className={styles.leftSide}>
            <LeftSideIllustrator />
        </div>
        <div className={styles.signupContainer}>
           <div className={styles.signupCard}>
                <div className={styles.signupCardHeader}>
                    <b>Create Account</b>
                </div>
                <div className={styles.signupSubtext}>
                    <p>Join EasySplit to start sharing expenses</p>
                </div>
                <InputField  type="text" placeholder="Email address"/>
                <InputField type="password" placeholder="Password"/>
                <div className={styles.passwordSubtext}>
                    <p>Must be at least 8 characters with letters & numbers</p>
                </div>
                <Button text="Create Account" textAlign='center'/>
                <div className={styles.divider}>
                    <div className={styles.dividerLine}></div>
                    <div className={styles.dividerText}>OR</div>
                    <div className={styles.dividerLine}></div>
                </div>
                <div className={styles.signInLink}>
                    <p>Already have an account? <span className={styles.linkText}>Sign In</span></p>
                </div>
           </div>
        </div>
    </div>
  )
}

export default SignUp