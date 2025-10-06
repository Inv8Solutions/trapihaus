"use client";

import Navbar from "../components/layout/Navbar";
import ContactHeader from "./ContactHeader";
import SendAMessage from "./SendAMessage";
import Contacts from "./Contacts";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="pb-20">
        <ContactHeader />
        <SendAMessage />
        <Contacts />
      </main>
    </>
  );
}