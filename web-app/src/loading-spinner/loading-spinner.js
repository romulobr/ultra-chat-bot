import React from 'react';
import styles from './loading-spinner.module.scss';

const LoadingSpinner = () => {
    return (
        <svg className={styles.circular}>
            <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2"
                    strokeMiterlimit="10"/>
        </svg>
    );
};
export default LoadingSpinner;
