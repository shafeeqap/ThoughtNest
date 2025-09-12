'use client';

import clsx from 'clsx';
import { ChartOne, ChartTwo } from '@/Components/Admin/Chart';
import styles from './dashboard.module.css'
import { dashboardCards } from '@/constant/constant';
import { dashboardCardType } from '@/types/dashboard';
import Link from 'next/link';


const Dashboard = () => {

    return (
        <main className={styles.container}>
            <div className={styles.title}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.mainCard}>
                {dashboardCards.map((card: dashboardCardType) => {
                    const Icon = card.icon
                    return (
                        <div
                            key={card.id}
                            className={clsx(styles[`card${card.id}`], styles.card)}
                        >
                            <div className={styles.cardInner}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <div className={styles.cardIcon}>{Icon && <Icon size={28} />}</div>
                            </div>
                            <div className={styles.cardItems}>
                                <div>
                                    <h1>{card.value}</h1>
                                </div>
                                <div>
                                    <p>Pending: 10</p>
                                    <p>Blocked: 10</p>
                                    <p>Active: 50</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

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

export default Dashboard;