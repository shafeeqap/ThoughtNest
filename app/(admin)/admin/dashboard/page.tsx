'use client';

import clsx from 'clsx';
import { ChartOne, ChartTwo } from '@/Components/Admin/Chart';
import styles from './dashboard.module.css'
import Card from '@/Components/Admin/Card/Card';


const AdminDashboard = () => {
 

    return (
        <main className={styles.container}>
            <div className={styles.title}>
                <h1>Dashboard</h1>
            </div>

            {/*Dashboard Cards */}
            <Card />

            {/* Dashboar Charts */}
            <div className={clsx(styles.charts)}>
                <div className={styles.chart1}>
                    <ChartOne />
                </div>
                <div className={styles.chart2}>
                    <ChartTwo />
                </div>
            </div>
        </main>
    )
}

export default AdminDashboard;