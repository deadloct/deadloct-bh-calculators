import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function Header() {
    return (
        <>
            <div className={styles.ghribbon}>
                <a href="https://github.com/deadloct/deadloct-bh-calculators"><img loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149" className="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
            </div>

            <header className={styles["site-header"]}>
                <h1>Deadloct / BH</h1>
                <nav>
                    <ul>
                        <li key="calculators"><Link to="/">Calculators</Link></li>
                        <li className={styles.lidivider} key="bullet-1">•</li>
                        <li key="videos"><Link to="/video">Videos</Link></li>
                        <li className={styles.lidivider} key="bullet-2">•</li>
                        <li key="pics"><Link to="/pics">Pics</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
