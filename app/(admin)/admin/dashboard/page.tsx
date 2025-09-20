'use client';

import clsx from 'clsx';
import { ChartOne, ChartTwo } from '@/Components/Admin/Chart';
import styles from './dashboard.module.css'
import { dashboardCards } from '@/constant/constant';
import Spinner from '@/Components/Spinner/Spinner';
import { useGetDashboardDataQuery } from '@/redux/features/dashboardApiSlice';
import Link from 'next/link';


const AdminDashboard = () => {
    const { data, isLoading } = useGetDashboardDataQuery();
    const cards = dashboardCards(data);


    console.log(data, 'Card data...');


    return (
        <main className={styles.container}>
            <div className={styles.title}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.mainCard}>
                {!isLoading && cards.map((card) => {
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
                                {isLoading ? (
                                    <Spinner size="small" />
                                ) : (
                                    <div>
                                        <h1>{card.value}</h1>
                                    </div>
                                )}
                                <div className={styles.cardStatus}>
                                    {card.title === "blogs" && (
                                        <>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Pending:</p>
                                                <span>{card.status}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span> {card.action?.active}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{card.action?.blocked}</span>
                                            </Link>
                                        </>
                                    )}

                                    {card.title === "users" && (
                                        <>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{card.action?.active}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{card.action?.blocked}</span>
                                            </Link>
                                        </>
                                    )}

                                    {card.title === "categories" && (
                                        <>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{card.action?.active}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span> {card.action?.blocked}</span>
                                            </Link>
                                        </>
                                    )}

                                    {card.title === "subscribers" && (
                                        <>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{card.action?.active}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{card.action?.blocked}</span>
                                            </Link>
                                        </>
                                    )}

                                    {card.title === "authors" && (
                                        <>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{card.action?.active}</span>
                                            </Link>
                                            <Link href={card.url} className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{card.action?.blocked}</span>
                                            </Link>
                                        </>
                                    )}
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

export default AdminDashboard;