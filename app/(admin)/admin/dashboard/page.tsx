'use client';

import clsx from 'clsx';
import { ChartOne, ChartTwo } from '@/Components/Admin/Chart';
import styles from './dashboard.module.css'
import { dashboardCards } from '@/constant/constant';
import { useEffect, useState } from 'react';
import { blogService } from '@/services/blogService';
import { userService } from '@/services/userService';
import { categoryService } from '@/services/categoryService';
import { subscribeService } from '@/services/subscribeService';
import Spinner from '@/Components/Spinner/Spinner';



const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        blogs: 0,
        users: 0,
        categories: 0,
        subscribers: 0,

        blogStatus: { pending: 0 },
        blogAction: { active: 0, blocked: 0 },
        userStatus: { active: 0, blocked: 0 },
        catStatus: { active: 0, blocked: 0 },
        subStatus: { active: 0, blocked: 0 },

    });


    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const [blogs, users, categories, subscribers] = await Promise.all([
                    blogService.fetchAllBlog(),
                    userService.getUsers(),
                    categoryService.fetchCategory(),
                    subscribeService.fetchAllSubscribe(),
                ]);

                let pendingCount = 0, blogsActiveCount = 0, blogsBlockedCount = 0;

                blogs.forEach((blog) => {
                    if (blog.status === "pending") pendingCount++;
                    if (blog.action === "active") blogsActiveCount++;
                    if (blog.action === "blocked") blogsBlockedCount++;
                })

                const usersActiveCount = users.filter(user => user.status === "active").length;
                const usersBlockedCount = users.filter(user => user.status === "blocked").length;

                const catActiveCount = categories.filter(cat => cat.status === "active").length;
                const catBlockedCount = categories.filter(cat => cat.status === "blocked").length;

                const subsActiveCount = subscribers.filter(sub => sub.status === "active").length;
                const subBlockedCount = subscribers.filter(sub => sub.status === "blocked").length;

                setData({
                    blogs: blogs.length,
                    users: users.length,
                    categories: categories.length,
                    subscribers: subscribers.length,
                    blogStatus: { pending: pendingCount },
                    blogAction: {
                        active: blogsActiveCount,
                        blocked: blogsBlockedCount,
                    },
                    userStatus: {
                        active: usersActiveCount,
                        blocked: usersBlockedCount,
                    },
                    catStatus: {
                        active: catActiveCount,
                        blocked: catBlockedCount,
                    },
                    subStatus: {
                        active: subsActiveCount,
                        blocked: subBlockedCount,
                    }
                })
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    console.log(data, 'Data...');


    return (
        <main className={styles.container}>
            <div className={styles.title}>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.mainCard}>
                {dashboardCards.map((card) => {
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
                                        <h1>{data[card.title as keyof typeof data]}</h1>
                                    </div>
                                )}
                                <div className={styles.cardStatus}>
                                    {card.title === "blogs" && (
                                        <>
                                            <div className={styles.cardStatusItems}>
                                                <p>Pending:</p>
                                                <span>{data.blogStatus.pending}</span>
                                            </div>
                                            <div className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span> {data.blogAction.active}</span>
                                            </div>
                                            <div className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{data.blogAction.blocked}</span>
                                            </div>
                                        </>
                                    )}

                                    {card.title === "users" && (
                                        <>
                                            <div className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{data.userStatus.active}</span>
                                            </div>
                                            <div className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{data.userStatus.blocked}</span>
                                            </div>
                                        </>
                                    )}


                                    {card.title === "categories" && (
                                        <>
                                            <div className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{data.catStatus.active}</span>
                                            </div>
                                            <div className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span> {data.catStatus.blocked}</span>
                                            </div>
                                        </>
                                    )}


                                    {card.title === "subscribers" && (
                                        <>
                                            <div className={styles.cardStatusItems}>
                                                <p>Active:</p>
                                                <span>{data.subStatus.active}</span>
                                            </div>
                                            <div className={styles.cardStatusItems}>
                                                <p>Blocked:</p>
                                                <span>{data.subStatus.blocked}</span>
                                            </div>
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