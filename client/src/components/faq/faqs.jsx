import { useState } from "react";

function Faqs() {
  const [faqOpen, setFaqOpen] = useState([
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
  ]);
  const toggleFAQ = (index) => {
    setFaqOpen(
      faqOpen.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  return (
    <div>
      <div
        className={"faq " + (faqOpen[0].open ? "open" : "")}
        onClick={() => toggleFAQ(0)}
      >
        <div className="faq-question">WHAT IS THE M9Ξ PROJECT?</div>
        <div className="faq-answer">
          <p>
            M9Ξ project is the digital collection of M9E, M9E is a famous
            designer toy, designed by Daytoner and produced by Purearts. M9Ξ is
            a way to remove all production technical limitation and focus on art
            with no barrier.
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[1].open ? "open" : "")}
        onClick={() => toggleFAQ(1)}
      >
        <div className="faq-question">WHO IS BEHIND M9Ξ PROJECT?</div>
        <div className="faq-answer">
          <p>
            Arnaud from Purearts is our project founder and brings this crazy
            idea to Daytoner.
          </p>
          <p>
            who immediately loves how variants can be randomly generated through
            computer and allow him to unleash his creativity with no limitation!
            Ken from Japan joined the team to be our Lead Developer, and then
            Hunter, is here to take care of our creative community! In addition
            to the core team, a Blockchain Developer and Blockchain Analyst have
            been involved to ensure security for our drop, website and discord
            will be at the maximum. Community safety if our goal#1! And then
            let's have tons of fun!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[2].open ? "open" : "")}
        onClick={() => toggleFAQ(2)}
      >
        <div className="faq-question">HOW MANY WILL BE IN THE COLLECTION?</div>
        <div className="faq-answer">
          <p>-999 by collection!</p>
          <p>
            -We will drop 9 separate collections of 999 and it will be possible
            to collect M9Ξ through the 9 collections to unlock a special gift!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[3].open ? "open" : "")}
        onClick={() => toggleFAQ(3)}
      >
        <div className="faq-question">ALL 999 WILL BE AVAILABLE FOR MINT?</div>
        <div className="faq-answer">
          <p>-9 will be allocated for marketing purpose,</p>
          <p>-9 will be allocated to the team members.</p>
          <p>So 981 will be available during each drop.</p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[4].open ? "open" : "")}
        onClick={() => toggleFAQ(4)}
      >
        <div className="faq-question">
          WHAT IS THE MINT PRICE AND HOW MANY CAN BE MINTED?
        </div>
        <div className="faq-answer">
          <p>-First collection priced at 0.19Ξ</p>
          <p>It will be possible to mint only 1 by wallet!</p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[5].open ? "open" : "")}
        onClick={() => toggleFAQ(5)}
      >
        <div className="faq-question">
          WHEN DID YOU(ARNAUD:PUREARTS) BEGIN WORKING WITH DAYTONER?
        </div>
        <div className="faq-answer">
          <p>
            We started to collaborate at the end 2019 while Daytoner shared a
            test of M9E 3D printed. I immediately loved this design, and wanted
            to help him to bring this incredible character as reference in the
            collectible world. It's what we did with a successful Kickstarter
            and several thousands of M9E sold worldwide! Wow It's time to
            unleash creativity with 0 production constraints and continue to
            build Master9eyes community!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[6].open ? "open" : "")}
        onClick={() => toggleFAQ(6)}
      >
        <div className="faq-question">
          WHAT PREVIOUS PROJECTS HAS THE TEAM WORKED ON?
        </div>
        <div className="faq-answer">
          <p>
            We are working with a lot of entertainment brands, like
            Cyberpunk2077, Assassin's Creed, Terminator, The Witcher3, Resident
            Evil and so on! Collectibles is our passion and we would like to
            share our experience to bring to the community an amazing
            opportunity to be part of the creation of master9eyes brand!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[7].open ? "open" : "")}
        onClick={() => toggleFAQ(7)}
      >
        <div className="faq-question">
          WHAT ARE THE BENEFITS TO COME TO HOLDERS OF THE M9Ξ COLLECTIONS
        </div>
        <div className="faq-answer">
          <p>
            Every collection holders will have access to special drops, M9Ξ
            event and merch. Holders will also be able to vote on our DAO,
            holders of the first collection will have more advantages like
            double vote and drop priority.All holders will be able to brainstorm
            and vote for 1 of our collection where Daytoner will follow your art
            direction to create an unique community tailored collection!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[8].open ? "open" : "")}
        onClick={() => toggleFAQ(8)}
      >
        <div className="faq-question">
          WILL THERE BE ANY REAL WORLD REDEEMABLE FOR M9Ξ HOLDERS?
        </div>
        <div className="faq-answer">
          <p>
            This is something we would like to bring to this project, been able
            to join both worlds, and for sure we will use our capabilities to
            manufacture physical products and bring special products to M9Ξ
            holders!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[9].open ? "open" : "")}
        onClick={() => toggleFAQ(9)}
      >
        <div className="faq-question">
          HOW ARE YOU PLANNING TO BRIDGE YOUR WORK FROM THE REAL WORLD TO THE
          DIGITAL WORLD?
        </div>
        <div className="faq-answer">
          <p>
            We plan to launch in 2022 a special M9E collection for M9Ξ holders.
            Also every year during 9 years, for M9E birthday in 09/Feb, we plan
            to launch an auction for an unique piece of art we commit to produce
            it for the M9Ξ event on 09/Sep, at a ratio 1Ξ = 1cm, this piece of
            art will have physical fluctuation base on his value!
          </p>
        </div>
      </div>
      <div
        className={"faq " + (faqOpen[10].open ? "open" : "")}
        onClick={() => toggleFAQ(10)}
      >
        <div className="faq-question">
          WILL THERE BE A RARITY STRUCTURE BUILT INTO M9Ξ?
        </div>
        <div className="faq-answer">
          <p>
            Yes, every collection will have different traits with different
            variants what will make each M9Ξ unique, and each variant will have
            different %, means some will be rarer than others.</p>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
