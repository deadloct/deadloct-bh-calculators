import { HashRouter, Route, Routes } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Pics from "../Pics";
import Tools from "../Tools";
import Video from "../Video";
import VideoList from "../VideoList";

export default function Home() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Tools />} />
                <Route path="/video" element={<VideoList />} />
                <Route path="/pics" element={<Pics />} />
                <Route path="/video/:slug" element={<Video />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
};
