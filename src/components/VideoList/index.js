import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";
import Container from "@mui/material/Container";

import styles from "./index.module.css";
import { DefaultYear, YearFromDate } from "../../utils";

const nameCompare = (a, b) => a.name.localeCompare(b.name);

function listItemForVideo(v, key) {
    const k = `${YearFromDate(v.date)}-${key}`;
    return <li key={k}><Link to={`/video/${v.slug}`}>{v.name}</Link></li>;
}

function listsForYear(year, items, first) {
    const y = year === DefaultYear ? "Unknown Year" : year;

    const classes = [styles["year-block"]];
    if (first) {
        classes.push(styles["year-block-first"]);
    }

    return (
        <div className={classes.join(" ")} key={`year-block-${year}`}>
            <h2 key={`h2-${year}`}>{y}</h2>
            <ul key={`ul-${year}`}>
                {items.map((v, i) => listItemForVideo(v, i))}
            </ul>
        </div>
    );
}

function VideoList(props) {
    const showExcluded = useSelector((state) => state.videos.showExcluded);
    const videos = useSelector((state) => state.videos.db);

    const byYear = useMemo(() => {
        const dict = {};
        videos
            .filter(item => !item.excluded && !showExcluded)
            .forEach(item => {
                const year = YearFromDate(item.date);
                (dict[year] = dict[year] || []).push(item);
            });
        
        Object.keys(dict).forEach(function(y) {
            dict[y].sort(nameCompare);
        });
        return dict;
    }, [showExcluded, videos]);

    const years = useMemo(() => Object.keys(byYear).sort((a, b) => b - a), [byYear]);

    if (videos.length === 0) {
        return (
            <Container maxWidth="md">
                <p>No videos</p>
            </Container>
        );
    }

    const items = years.map((y, i) => listsForYear(y, byYear[y], i === 0))
    items.push((
        <div className={styles["year-block"]} key="year-block-2017-2019">
            <h2 key="h2-2017-2019">2017-2019</h2>
            <p>Sadly I didn't record any videos during this time.</p>
        </div>
    ));

    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <div className={styles["year-blocks"]}>
                {items}
            </div>
        </Container>
    );
}

export default VideoList;
