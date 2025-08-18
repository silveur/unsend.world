"use client";

import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.landing}>
          <div className={styles.logoContainer}>
            <img src="/bannernew.svg" alt="Logo" className={styles.logo} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/register">
            <button className={`${styles.enterButton} button`}>register</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
