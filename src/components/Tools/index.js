import React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import CaptureRateCalc from "./capture-rate-calc";
import StandardIFCalc from "./standard-if-calc";
import SimpleIFCalc from "./simple-if-calc";

import styles from "./index.module.css";

export default function Tools() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <p className={styles.overview}>
                Calculators ported from <a href="https://jsfiddle.net/dchzwg90/">Archangel's awesome jsfiddle</a>. 
            </p> 
            <Divider />
            <SimpleIFCalc />
            <Divider />
            <StandardIFCalc />
            <Divider />
            <CaptureRateCalc />
            <Divider />
            <p className={styles.suboverview}>
                Also credit to iWushock for sharing the jsfiddle, Uber-gecko for asking for it, skye666 for making an awesome spreadsheet calculator that I used for ages, and everybody in [DÀRK] for being super rad.
            </p>
            <p className={styles.signature}>
                --BillyIdol
            </p>
        </Container>
    )
}