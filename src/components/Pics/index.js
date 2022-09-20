import React, { useState } from "react";
import { useSelector } from "react-redux";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Modal from "@mui/material/Modal";

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
    const [showModal, setShowModal] = useState(false);

    const openModal = (src, date) => {
        setModalImage(src);
        setModalImageDate(date);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const getPicBlock = (name, images) => {
        return (
            <Box mt={VerticalSpacing} key={`fragment-${name}`}>
                <h2>{name}</h2>
                <ImageList variant="masonry" cols={3} gap={8}>
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
                                    src={`${low}?w=248&fit=crop&auto=format`}
                                    srcSet={`${low}?w=248&fit=crop&auto=format&dpr=2 1x, ${med}?w=248&fit=crop&auto=format&dpr=1.25 1.25x, ${lrg}?w=248&fit=crop&auto=format&dpr=1.6 1.6x`}
                                    alt={name + "," + image.date}
                                    loading="lazy"
                                    onClick={() => openModal(full, image.date)}
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
            {Object.keys(gallery).map(k => getPicBlock(k, gallery[k]))}

            <Modal open={showModal} onClose={closeModal} onClick={closeModal}>
                <div className={styles.modal}>
                    <img src={modalImage} alt={modalImageDate} />
                </div>
            </Modal>
        </Container>
    );
}
