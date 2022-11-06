import React, { useState, Fragment } from "react";

import classes from "./App.module.css";
import mobileDivider from "./images/pattern-divider-mobile.svg";
import desktopDivider from "./images/pattern-divider-desktop.svg";

let timeVal;

function App() {
  const [isLoading, setLoading] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState({
    id: 117,
    advice:
      "It is easy to sit up and take notice, without a bread you cannot jogbonlo.",
  });
  const { id, advice } = currentAdvice;

  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setCurrentAdvice(data.slip);
    setLoading(false);
    clearInterval(timeVal);
  }

  function generate() {
    setLoading(true);
    timeVal = setInterval(() => {
      getAdvice();
    }, 2000);
  }

  return (
    <Fragment>
      <main className={classes.Main}>
        <div className={classes.AdviceContainer}>
          {isLoading ? (
            <p className={classes.Advice}>Loading ...</p>
          ) : (
            <Fragment>
              <p className={classes.AdviceSerialNo}>Advice #{id}</p>
              <p className={classes.Advice}>“{advice}”</p>
            </Fragment>
          )}
          <img
            className={classes.MobileViewDivider}
            alt="mobile-divider"
            src={mobileDivider}
          />
          <img
            className={classes.TabViewDivider}
            alt="desktop-divider"
            src={desktopDivider}
          />
          <button
            className={classes.Button}
            onClick={generate}
            arial-label="generate advice"
          ></button>
        </div>
        <footer className={classes.Attribution}>
          Challenge by
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            <strong>Frontend Mentor</strong>
          </a>
          . Made with by &#129505;
          <a rel="noreferrer" target="_blank" href="https://github.com">
            <strong>Askash Verma</strong>
          </a>
        </footer>
      </main>
    </Fragment>
  );
}

export default App;
