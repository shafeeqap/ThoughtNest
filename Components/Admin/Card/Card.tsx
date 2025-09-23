import React from 'react'
import styles from "./Card.module.css";
import CardStatus from './CardStatus';
import { useGetDashboardDataQuery } from '@/redux/features/dashboardApiSlice';
import { dashboardCards } from '@/constant/constant';
import clsx from 'clsx';
import Spinner from '@/Components/Spinner/Spinner';

const Card: React.FC= () => {
    const { data, isLoading } = useGetDashboardDataQuery();
    const cards = dashboardCards(data);

    console.log(data, 'Card data...');


    return (
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
                        
                        {/* Card status */}
                        <CardStatus
                            title={card.title}
                            action={card.action}
                            status={card.status}
                            url={card.url}
                        />
                    </div>
                </div>
            )
        })}
    </div>
    )
}

export default Card