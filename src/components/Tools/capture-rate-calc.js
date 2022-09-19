import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";

import styles from './index.module.css';
import { cleanVal, VerticalSpacing } from "./utils";

const RaidFamPct = .1;
const Common = 4;
const Rare = 2.5;
const Epic = 1.5
const Leg = 1;
const CapturePercentCommon = 0.4;
const CapturePercentRare = 0.2;
const CapturePrecentEpic = 0.15;
const CapturePrecentLeg = 0.1;
const Percentage = .01;

const toFixedPctStr = v => `${v.toFixed(2)}%`;

export default function CaptureRateCalc() {
    const encounterOptions = useSelector((state) => state.calc.options.encounterCapRate);

    const [output, setOutput] = useState("0%");
    const [infoCapRate, setInfoCapRate] = useState(0);
    const [encounterBonus, setEncounterBonus] = useState(cleanVal(encounterOptions.default));
    const [baseChances, setBaseChances] = useState({
        offerCommonDungeon: "0%",
        offerRareDungeon: "0%",
        offerEpicDungeon: "0%",
        offerEpicRaid: "0%",
        offerLegRaid: "0%",
        capCommonDungeon: "0%",
        capRareDungeon: "0%",
        capEpicDungeon: "0%",
        capEpicRaid: "0%",
        capLegRaid: "0%",
    });

    const infoCapRateRef = useRef(infoCapRate);
    const encounterBonusRef = useRef(encounterBonus);

    const handleCapRateChange = e => {
        let { value } = e.target;
    
        if (value.trim().length === 0) {
            value = 0;
        } else if (value.indexOf("%") >= 0) {
            const parts = value.split("%");
            if (parts.length > 0) {
                value = parts[0];
            }
        }

        setInfoCapRate(value);
        infoCapRateRef.current = value;
    };

    const handleEncounterChange = e => {
        const val = cleanVal(e.target.value);
        setEncounterBonus(cleanVal(e.target.value));
        encounterBonusRef.current = val;
    };


    useEffect(() => {
        const timeoutID = setTimeout(() => {
            const output = (cleanVal(infoCapRateRef.current) + 100) * (cleanVal(encounterBonusRef.current));
            
            setBaseChances({
                offerCommonDungeon: toFixedPctStr(output * Common * Percentage),
                offerRareDungeon: toFixedPctStr(output * Rare * Percentage),
                offerEpicDungeon: toFixedPctStr(output * Epic * Percentage),
                offerEpicRaid: toFixedPctStr(output * Epic * RaidFamPct * Percentage),
                offerLegRaid: toFixedPctStr(output * Leg * RaidFamPct * Percentage),
    
                capCommonDungeon: toFixedPctStr(output * Common * Percentage * CapturePercentCommon),
                capRareDungeon: toFixedPctStr(output * Rare * Percentage * CapturePercentRare),
                capEpicDungeon: toFixedPctStr(output * Epic * Percentage * CapturePrecentEpic),
                capEpicRaid: toFixedPctStr(output * Epic * RaidFamPct * Percentage * CapturePrecentEpic),
                capLegRaid: toFixedPctStr(output * Leg * RaidFamPct * Percentage * CapturePrecentLeg),
            });
    
            setOutput(`${output}%`);
        }, 100);

        return () => clearTimeout(timeoutID);
    });

    return (

        <section id="capture-rate-calc">
            <h2>Capture Rate Calculator</h2>

            <Box flexDirection="column">
                <FormControl fullWidth>
                    <TextField id="info-input"
                        name="info"
                        label="Info Screen Capture Rate"
                        type="number"
                        placeholder="i.e. 25"
                        onChange={handleCapRateChange}
                    />
                </FormControl>
            </Box>

            <Box flexDirection="column">
                <Box mt={VerticalSpacing}>
                    <FormControl fullWidth>
                        <InputLabel id="encounter-label">Encounter</InputLabel>
                        <Select
                            labelId="encounter-label"
                            id="encounter"
                            name="encounter"
                            defaultValue={encounterOptions.default}
                            label="Encounter"
                            onChange={handleEncounterChange}
                        >
                            {Object.keys(encounterOptions.groups).map((k, i) => {
                                const items = encounterOptions.groups[k].map((item, j) => (
                                    <MenuItem key={j} value={item.value}>{item.text}</MenuItem>
                                ));

                                return [
                                    <ListSubheader key={`${k}-${i}`}>{k}</ListSubheader>,
                                    ...items,
                                ];
                            })}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <p className={styles.results}>
                Your capture rate is:<br />
                <span id="caprate-output" className={styles.output}>{output}</span>
            </p>

            <div className={styles["extra-results"]}>
                <h3>Offer Chance for One Run</h3>

                <h4>Dungeons</h4>
                <p>
                    Common Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.offerCommonDungeon}</span><br />
                    Rare Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.offerRareDungeon}</span><br />
                    Epic Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.offerEpicDungeon}</span>
                </p>

                <h4>Raids</h4>
                <p>
                    Epic Raid Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.offerEpicRaid}</span><br />
                    Legendary Raid Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.offerLegRaid}</span>
                </p>

                <h3>Capture Chance for One Run</h3>
                <h4>Dungeons</h4>
                <p>
                    Common Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.capCommonDungeon}</span><br />
                    Rare Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.capRareDungeon}</span><br />
                    Epic Dungeon Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.capEpicDungeon}</span>
                </p>

                <h4>Raids</h4>
                <p>
                    Epic Raid Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.capEpicRaid}</span><br />
                    Legendary Raid Fam:&nbsp;<span className={styles["extra-val"]}>{baseChances.capLegRaid}</span>
                </p>
            </div>
        </section>
    );
}
