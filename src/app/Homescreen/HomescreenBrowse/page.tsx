"use client";

import Navbar from "../components/layout/Navbar";
import Search from "./Search";
import FindAccomodation from "./FindAccomodation";
import Footer from "../../components/layout/Footerr";

export default function HomescreenBrowse() {
    return (
        <>
            <Navbar />
            <main className="">
                <Search />
                <FindAccomodation />
            </main>
            <Footer />
        </>
    );
}
