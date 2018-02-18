import React, { Component } from 'react';
import ProjectArticle from './ProjectArticle';

export default class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: this.props.posts,
      projectList: [],
      classNames: [],
      titleClassNames: [],
      controlsClassNames: [],
    };
    this.showProject = this.showProject.bind(this);
    this.closeProject = this.closeProject.bind(this);
    this.nextProject = this.nextProject.bind(this);
    this.previousProject = this.previousProject.bind(this);
  }

  showProject(index, id) {
    let { classList, controlsList, titleList } = this.resetClassNames();

    classList[index] = 'project__article--active';
    controlsList[index] = 'project__controls--active';
    titleList[index] = 'project__title-container--active';

    this.setState({
      classNames: classList,
      titleClassNames: titleList,
      controlsClassNames: controlsList,
    });

    setTimeout(() => {
      document.getElementById(`${id}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, 50);
  }

  resetClassNames() {
    let classList = this.state.classNames,
      titleList = this.state.titleClassNames,
      controlsList = this.state.controlsClassNames;
    for (let i = 0; i < classList.length; i++) {
      classList[i] = 'project__article';
      controlsList[i] = 'project__controls';
      titleList[i] = 'project__title-container';
    }
    return { classList, controlsList, titleList };
  }

  closeProject() {
    let { classList, controlsList, titleList } = this.resetClassNames();

    this.setState({
      classNames: classList,
      titleClassNames: titleList,
      controlsClassNames: controlsList,
    });
  }

  nextProject(index, nextId) {
    let { classList, controlsList, titleList } = this.resetClassNames();

    classList[index + 1] = 'project__article--active';
    controlsList[index + 1] = 'project__controls--active';
    titleList[index + 1] = 'project__title-container--active';

    this.setState({
      classNames: classList,
      titleClassNames: titleList,
      controlsClassNames: controlsList,
    });

    setTimeout(() => {
      document.getElementById(`${nextId}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, 50);
  }

  previousProject(index, prevId) {
    let { classList, controlsList, titleList } = this.resetClassNames();

    classList[index - 1] = 'project__article--active';
    controlsList[index - 1] = 'project__controls--active';
    titleList[index - 1] = 'project__title-container--active';

    this.setState({
      classNames: classList,
      titleClassNames: titleList,
      controlsClassNames: controlsList,
    });

    setTimeout(() => {
      document.getElementById(`${prevId}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }, 50);
  }

  setClasses() {
    const posts = this.state.entries,
      classList = [],
      titleList = [],
      controlsList = [];
    for (let i = 0; i < posts.length; i++) {
      classList.push('project__article');
      titleList.push('project__title-container');
      controlsList.push('project__controls');
    }

    this.setState({
      classNames: classList,
      titleClassNames: titleList,
      controlsClassNames: controlsList,
    });
  }

  componentDidMount() {
    this.setClasses();
  }

  render() {
    const entries = this.state.entries,
    entryLength = entries.length,
    entryList = this.state.entries
      .filter(post => post.tags.length > 0)
      .map((post, index) => (
        <div className="project" key={post._id} id={post._id}>
          <div className={this.state.titleClassNames[index]}>
            <h2
              className="project__title"
              onClick={event => this.showProject(index, post._id)}
            >
              {post.title}
            </h2>
            <div className={this.state.controlsClassNames[index]}>
              {index !== 0 && (
                <span
                  className="controls__back"
                  onClick={event =>
                    this.previousProject(index, entries[index - 1]._id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M10 20l3-3-7-7 7-7-3-3L0 10l10 10z" />
                  </svg>
                </span>
              )}
              {index !== entryLength - 1 && (
                <span
                  className="controls__forward"
                  onClick={event =>
                    this.nextProject(index, entries[index + 1]._id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path d="M3 20l-3-3 7-7-7-7 3-3 10 10L3 20z" />
                  </svg>
                </span>
              )}
              <span
                className="controls__close"
                onClick={event => this.closeProject()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M20.775 2.52a.81.81 0 0 1 0 1.14l-6.276 6.269a.81.81 0 0 0 0 1.141l6.273 6.271a.81.81 0 0 1 0 1.14l-2.285 2.277a.814.814 0 0 1-1.142 0l-6.271-6.271a.812.812 0 0 0-1.141 0l-6.276 6.267a.81.81 0 0 1-1.141 0l-2.282-2.28a.808.808 0 0 1 0-1.139l6.278-6.269a.81.81 0 0 0 0-1.14L.24 3.653a.81.81 0 0 1 0-1.14L2.524.235a.81.81 0 0 1 1.141.001l6.271 6.27a.808.808 0 0 0 1.141.001L17.353.24a.812.812 0 0 1 1.141 0l2.281 2.28z" />
                </svg>
              </span>
            </div>
          </div>

          <article className={this.state.classNames[index]}>
            <ProjectArticle
              post={post.content}
              images={post.images}
              skills={post.tags}
              title={post.title}
              date={post.date}
              update={post.lastUpdated}
              git={post.gitHub}
              url={post.projectUrl}
            />
          </article>
        </div>
      ));

    return (
      <div className="project__list" id="projects">
        {entryList}
      </div>
    );
  }
}
