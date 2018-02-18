import React, { Component } from 'react';

export default class ProjectArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classNames: [],
    };
  }

  setClasses() {
    const images = this.props.images,
      classList = [],
      max = Math.floor(this.props.images.length),
      min = 0,
      randomNum = Math.floor(Math.random() * (max - min) + min);

    for (let i = 0; i < images.length; i++) {
      classList.push('slideshow__image--inactive');
    }
    classList[randomNum] = 'slideshow__image--active';
    this.setState({
      classNames: classList,
    });
  }

  componentWillMount() {
    this.setClasses();
  }

  componentDidMount() {
    setInterval(() => {
      this.setClasses();
    }, 8000);
  }

  render() {
    const createMarkup = () => {
      const markup = this.props.post;
      return { __html: markup };
    };

    // const photos = this.props.images;
    const images = this.props.images.map((image, index) => (
        <img
          src={image}
          key={index}
          className={this.state.classNames[index]}
          alt={`${this.props.title} ${index}`}
        />
      )),
      skills = this.props.skills.map((skill, index) => (
        <li className="article__item" key={index}>
          {skill}
        </li>
      ));
    return (
      <div className="article__container">
        <div
          className="article__post"
          dangerouslySetInnerHTML={createMarkup()}
        />
        <div className="article__details">
          <div className="slideshow">
            <div className="slideshow__reel">{images}</div>
          </div>
          <div className="article__extra">
            {this.props.skills ? (
              <div className="article__skills">
                <h4 className="article__title">
                  Related Skills and Technologies
                </h4>
                <ul className="article__list">{skills}</ul>
              </div>
            ) : null}
            <div className="article__more">
              {this.props.git ? (
                <a href={this.props.git} className="button">
                  View Source Code
                </a>
              ) : null}
              {this.props.url ? (
                <a href={this.props.url} className="button">
                  View Live Project
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
