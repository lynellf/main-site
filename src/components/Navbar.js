import React, { Component } from 'react';

export default class Navbar extends Component {

    constructor() {
        super();
        this.state = {
            navbar: 'navbar',
            nav: 'navbar__nav',
            name: 'navbar__name',
            item: 'navbar__item',
            hamburger: 'navbar__hamburger',
            burgerToggled: false
        }
        this.navbarStatus = this.navbarStatus.bind(this);
        this.burgerToggle = this.burgerToggle.bind(this);
    }

    navbarStatus() {
        const height = window.innerHeight;
        if (window.scrollY >= height && this.state.burgerToggled === false) {
          this.setState({
            navbar: 'navbar--scrolled',
            name: 'navbar__name--scrolled',
            item: 'navbar__item--scrolled',
            hamburger: 'navbar__hamburger--scrolled',
          });
        } else if (window.scrollY >= height && this.state.burgerToggled === true) {
          this.setState({
            navbar: 'navbar--scrolled',
            nav: 'navbar__nav--toggled',
            name: 'navbar__name--scrolled--toggled',
            item: 'navbar__item--scrolled--toggled',
            hamburger: 'navbar__hamburger--scrolled',
          });
        } else {
          this.setState({
            navbar: 'navbar',
            name: 'navbar__name',
            item: 'navbar__item',
            hamburger: 'navbar__hamburger',
          });
        }
    }

    burgerToggle(event) {
        if(this.state.burgerToggled === false) {
            this.setState({
                nav: 'navbar__nav--toggled',
                name: 'navbar__name--scrolled--toggled',
                item: 'navbar__item--scrolled--toggled',
                burgerToggled: true
            });
        } else {
            this.setState({
              nav: 'navbar__nav',
              name: 'navbar__name--scrolled',
              item: 'navbar__item--scrolled',
              burgerToggled: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.navbarStatus);
    }
    
    render() {
        return <div className={this.state.navbar}>
            <svg height="32px" id="Layer_1" className={ this.state.hamburger } version="1.1" viewBox="0 0 32 32" width="32px" onClick={event => this.burgerToggle(event) }>
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
            <nav className={ this.state.nav }>
              <h1 className={this.state.name}>Ezell Frazier</h1>
              <ul className="navbar__list">
                <li className={this.state.item}><a href="https://ezellfrazier.com/projects/ezell_resume.pdf">Resume</a></li>
                <li className={this.state.item}><a href="#projects">Projects</a></li>
                <li className={this.state.item}><a href="#contact">Contact</a></li>
                <li className={this.state.item}><a href="#about">About</a></li>
              </ul>
            </nav>
          </div>;
    }
    
}

