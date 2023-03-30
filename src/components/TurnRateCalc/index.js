import React, { useEffect, useState } from "react";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Slider from '@mui/material/Slider';

import styles from "./index.module.css";
import { ReactComponent as TurnRateEqnSVG } from './turn-rate-equation.svg';

const defaultValues = {
    power: 20000,
    agility: 20000,
    speed: 0,
};

const limits = {
    power: { min: 0, max: 120000 },
    agility: { min: 0, max: 120000 },
    speed: { min: 0, max: 300 },
};

export default function TurnRateCalc() {
    const [formValues, setFormValues] = useState(defaultValues);
    const [turnRate, setTurnRate] = useState(0);

    useEffect(() => {
        let p = formValues.power;
        let a = formValues.agility;
        let s = formValues.speed;
        let multiplier = 1 + (s / 100);
        let numerator = multiplier * (((a + p) / 2) ** 2);
        let rate = Math.floor(numerator / p);
        setTurnRate(isNaN(rate) ? 0 : rate);
    }, [formValues]);

    function limit(val, name) {
        if (val < limits[name].min) {
            return limits[name].min;
        }

        if (val > limits[name].max) {
            return limits[name].max;
        }

        return val;
    }

    function getSliderHandler(name) {
        return (e, value) => {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        };
    }

    function getInputHandler(name) {
        return e => {
            let v = e.target.value === "" ? limits[name].min : limit(parseInt(e.target.value), name);
            setFormValues({
                ...formValues,
                [name]: v,
            });
        };
    }

    function getBlurHandler(name) {
        return () => {
            setFormValues({
                ...formValues,
                [name]: limit(formValues[name], name),
            }); 
        };
    };

    return (
        <Container key="turnratecalc" className={styles["outer-container"]} maxWidth="md">
            <h2>Turn Rate Calculator</h2>

            <Grid container justify="center" direction="column">
                <Grid item>
                    <Grid container justifyContent="space-between" direction="row">
                        <Grid item><label>Power</label></Grid>
                        <Grid item>
                            <Input
                                value={formValues.power}
                                size="small"
                                onChange={getInputHandler("power")}
                                onBlur={getBlurHandler("power")}
                                inputProps={{ step: 100, min: limits.power.min, max: limits.power.max, type: 'number' }}
                            />
                        </Grid>
                    </Grid>
                    <Slider value={formValues.power} min={0} max={120000} valueLabelDisplay="auto" onChange={getSliderHandler("power")} />
                </Grid>
                <Grid item>
                    <Grid container justifyContent="space-between" direction="row">
                        <Grid item><label>Agility</label></Grid>
                        <Grid item>
                            <Input
                                value={formValues.agility}
                                size="small"
                                onChange={getInputHandler("agility")}
                                onBlur={getBlurHandler("agility")}
                                inputProps={{ step: 100, min: limits.agility.min, max: limits.agility.max, type: 'number' }}
                            /> 
                        </Grid>
                    </Grid>
                    <Slider value={formValues.agility} min={0} max={120000} valueLabelDisplay="auto" onChange={getSliderHandler("agility")} />
                </Grid>
                <Grid item>
                    <Grid container justifyContent="space-between" direction="row">
                        <Grid item><label>Speed</label></Grid>
                        <Grid item>
                            <Input
                                value={formValues.speed}
                                size="small"
                                onChange={getInputHandler("speed")}
                                onBlur={getBlurHandler("speed")}
                                inputProps={{ step: 100, min: limits.speed.min, max: limits.speed.max, type: 'number' }}
                            /> 
                        </Grid>
                    </Grid>
                    <Slider value={formValues.speed} min={0} max={300} valueLabelDisplay="auto" onChange={getSliderHandler("speed")} />
                </Grid>
                <Grid item>
                    <p className={styles.results}>
                        Your turn rate is:<br />
                        <span className={styles.output}>{turnRate}</span>
                    </p>
                </Grid>
            </Grid>

            <h3>General Information</h3>
            <p>Contrary to popular belief, your turn rate isn't just agility!</p>
            <p>Quote from the <a href="https://bit-heroes.fandom.com/wiki/Mechanics">BH Wiki:</a></p>
            <blockquote cite="https://bit-heroes.fandom.com/wiki/Mechanics">
                As of 3/26/2017: Agility has been reworked. Turn rates are now based on a sum of power and agility.
                This will allow players to use different builds without losing any overall damage.
            </blockquote>

            <h3>Equation</h3>
            <TurnRateEqnSVG />
            <dl>
                <dt>P</dt>
                <dd>Power of your Character</dd>
                <dt>A</dt>
                <dd>Agility of your Character</dd>
                <dt>SpeedBonus</dt>
                <dd>Your bonus speed (enchants, runes, etc.)</dd>
            </dl>

            <h3>What do I need to know?</h3>
            <p>
                The more power your character has, the slower they will be. Turn rate is inversely proportional to your
                power because it's the denominator in the equation above.
            </p>
            <p>
                Speed bonuses act as a multiplier for your turn rate. For example if there was one build with 0% speed
                and another with exactly the same gear but with +100% speed, the second would take twice as many turns.
            </p>

            <h3>Credits</h3>
            <p>
                Thanks to Chocomint for providing the original source of this calculator. Also thanks to ChubbyDaemon and
                the wiki crew for providing the information and equation that we based it on, along with the turn rate svg.
            </p>
        </Container>
    );
}