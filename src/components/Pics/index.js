import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Lightbox } from "react-modal-image";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from "@mui/material/Divider";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import styles from './index.module.css';

const Suffix = {
    Low: "-640",
    Medium: "-800",
    Large: "-1024",
};

const VerticalSpacing = 3;

// Node.js polyfill required for webpack >= 5. Too much effort to fix, just implemented
// parse instead of fixing create-react-app imports.
function pathParse(path) {
    if (path[0] === "/") {
        path = path.substring(1);
    }

    const parts = path.split("/");
    const dir = parts.slice(0, -1).join("/");

    let name = "";
    let ext = "";

    if (parts[parts.length - 1] !== "") {
        const fileExt = parts[parts.length - 1];
        const fileParts = fileExt.split(".");
        name = fileParts.slice(0, -1).join(".");

        if (fileParts.length > 1) {
            ext = "." + fileParts[fileParts.length - 1];
        }
    }

    let base = name;
    if (ext.length > 0) {
        base = name + ext;
    }

    return { dir, name, ext, base };
}

export default function Pics() {
    const gallery = useSelector((state) => state.gallery);

    const [modalImage, setModalImage] = useState("");
    const [modalImageDate, setModalImageDate] = useState("");
    const [modalImageDesc, setModalImageDesc] = useState("");
    const [showModal, setShowModal] = useState(false);

    const openModal = (src, date, desc) => {
        setModalImage(src);
        setModalImageDate(date);
        setModalImageDesc(desc);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const gallerySorted = useMemo(() => {
        const g = {};

        Object.keys(gallery).forEach(k => {
            g[k] = [...gallery[k]];
            g[k].sort((a, b) => {
                const aDate = new Date(a.date);
                const bDate = new Date(b.date);
                return aDate - bDate;
            });
        });

        return g;
    }, [gallery]);

    const getPicBlock = (name, images) => {
        return (
            <Box mt={VerticalSpacing} key={`fragment-${name}`}>
                <h2>{name}</h2>
                <ImageList variant="standard" cols={3} gap={8}>
                    {images.map(image => {
                        const p = pathParse(`/screenshots/${image.file}`);
                        const common = `${process.env.PUBLIC_URL}/${p.dir}/${p.name}`;
                        const low = common + Suffix.Low + p.ext;
                        const med = common + Suffix.Medium + p.ext;
                        const lrg = common + Suffix.Large + p.ext;
                        const full = common + p.ext;

                        return (
                            <ImageListItem key={`imglistitem-${p.base}`}>
                                <img
                                    src={low}
                                    srcSet={`${low} 1x, ${med} 1.25x, ${lrg} 1.6x`}
                                    alt={name + "," + image.date}
                                    loading="lazy"
                                    onClick={() => openModal(full, image.date, image.desc)}
                                />
                                <ImageListItemBar
                                    title={image.desc}
                                    subtitle={image.date}
                                    onClick={() => openModal(full, image.date, image.desc)}
                                    className={styles.thumbdesc}
                                />
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </Box>
        );
    };

    return (
        <Container key="pics" className={styles["outer-container"]} maxWidth="md">
            <p className={styles.overview}>
                Some random pics from over the years.
            </p>

            <Divider />

            {getPicBlock("Old Shop Offers", gallerySorted["shop"])}
            <Divider />
            {getPicBlock("Fun Bugs From Over The Years", gallerySorted["bugs"])}
            <Divider />
            {getPicBlock("Other Random Photos", gallerySorted["other"])}
            <Divider />
            {getPicBlock("Drops On BillyIdol", gallerySorted["drops"])}

            {showModal && (
                <Lightbox
                    medium={modalImage}
                    large={modalImage}
                    alt={`${modalImageDate}: ${modalImageDesc}`}
                    onClose={closeModal}
                />
            )}
        </Container>
    );
}
