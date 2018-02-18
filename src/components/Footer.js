import React, { Component } from 'react';
import Icon from 'react-simple-icons';

export default class Footer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__contact" id="contact">
            <h1 className="footer__title">Contact</h1>
            <a href="https://www.linkedin.com/in/ezell-frazier-830a50135"><Icon name="linkedin" className="footer__social" /></a>
            <a href="https://github.com/lynellf"><Icon name="github" className="footer__social" /></a>
            <a href="https://twitter.com/_Ezell_"><Icon name="twitter" className="footer__social" /></a>
            <a href="mailto:lynellf@gmail.com"><svg
              className="footer__social"
              aria-labelledby="simpleicons-gmail-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068A1.485 1.485 0 0 1 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
            </svg></a>
          </div>
          <div className="about" id="about">
            <h1 className="footer__title">About</h1>
            <div className="footer__summary">
              <p>
                Outside of my qualifications on paper, I am driven by creating
                solutions to solve problems not only for myself but for others.
                Playing trading card games is one of my biggest hobbies. In
                2016, I created a spreadsheet based application performing
                linear operations, mathematically constructing optimal decks of
                playing cards. I shared the application with the public on a
                Reddit forum and the feedback was exceedingly positive, albeit
                with one shared concern; it is a spreadsheet.<br />
                <br />
                <br />Since then I have poured countless hours into planning and
                development to rectify the issue. Joining Team Treehouse in
                April of 2017 represented the largest advancement toward
                achieving a solution. Team Treehouse is an online technology
                school offering a wide range of courses spanning web
                development, databases, and modern programming languages such as
                C# and Go. I wake up around 3 am to study and or work on a
                limitless amount of projects offered by the program.<br />
                <br />
                <br />I have created multiple iterations of the application with
                JavaScript and the Bootstrap CSS framework. Earlier versions of
                the web-based app contained thousands of lines of code for
                creating, modifying, and removing DOM elements and performing
                calculations. The latest build is highly refined, as I have
                regulated DOM manipulation to Angular and data storage and
                retrieval to Node.js and MongoDB. The web-based application
                shall be available to the public by month’s end.<br />
                <br />
                <br />In the meantime, I am wrapping up a front-end tech
                certification through Team Treehouse’s “Techdegree” program this
                month. From there, I plan to continue my education with
                additional languages and technologies such as C# and Java-based
                REST APIs.
              </p>
            </div>
          </div>
          <div className="copyright">
            <h1 className="footer__title">Copyright</h1>
            <span className="footer__legal">Copyright Ezell Frazier 2017-2018. All rights reserved.</span>
          </div>
        </div>
      </footer>
    );
  }
}
