"use client";

import Navbar from "../components/layout/Navbar";
import ContactHeader from "./ContactHeader";
import SendAMessage from "./SendAMessage";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <ContactHeader />
        <SendAMessage />
      </main>
    </>
  );
}