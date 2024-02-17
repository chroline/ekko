import Hamburger from "hamburger-react";

import { useState } from "react";

import Header from "~/components/Header";

import "./Home.css";

function Home() {
  // const [count, setCount] = useState(0)
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="home-cont">
        <div className="container">
          <Hamburger color="#fff" size={25} toggled={isOpen} toggle={setOpen} />

          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20" className="profile-svg">
            <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
          </svg>
        </div>

        <h1 className="inter-font-bold">Hola, Nick</h1>

        <Header contentFluency="Proficient" contentLang="Spanish" contentSmthn="Else" />

        <div id="prog-circ">
          <p className="inter-font-black">67%</p>
        </div>

        <div id="streak-cont">
          <svg className="streak-svg" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 8c0 1.5-.5 3.5-2.9 4.3.7-1.7.8-3.4.3-5-.7-2.1-3-3.7-4.6-4.6-.4-.3-1.1.1-1 .7 0 1.1-.3 2.7-2 4.4C4.1 10 3 12.3 3 14.5 3 17.4 5 21 9 21c-4-4-1-7.5-1-7.5.8 5.9 5 7.5 7 7.5 1.7 0 5-1.2 5-6.4 0-3.1-1.3-5.5-2.4-6.9-.3-.5-1-.2-1.1.3"></path>
          </svg>

          <p className="inter-font-med">5 DAY STREAK</p>
        </div>

        <button className="start-btn">START CONVERSATION</button>
      </div>
    </>
  );
}

export default Home;
