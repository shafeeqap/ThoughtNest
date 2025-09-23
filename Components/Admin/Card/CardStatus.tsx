import React from 'react';
import styles from "./Card.module.css";
import Link from 'next/link';

type CardStatusTypes = {
    title: string;
    url: string;
    status?: number;
    action?: { active: number; blocked: number };
}

const CardStatus: React.FC<CardStatusTypes> = ({ title, url, status, action }) => {
    return (
        <div className={styles.cardStatus}>
            {title === "blogs" && (
                <Link href={url} className={styles.cardStatusItems}>
                    <p>Pending:</p>
                    <span>{status}</span>
                </Link>
            )}

            <Link href={url} className={styles.cardStatusItems}>
                <p>Active:</p>
                <span> {action?.active}</span>
            </Link>

            <Link href={url} className={styles.cardStatusItems}>
                <p>Blocked:</p>
                <span>{action?.blocked}</span>
            </Link>

        </div>
    )
}

export default CardStatus