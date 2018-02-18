import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import chart from '../../icons/Graph.png';
import news from '../../icons/news.png';
import file from '../../icons/File.png';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {};
    this.goToPosts = this.goToPosts.bind(this);
    this.goToTraffic = this.goToTraffic.bind(this);
  }

  goToPosts() {
    this.props.history.push('/controlpanel/posts');
  }

  goToTraffic() {
    this.props.history.push('/controlpanel');
  }

  render() {
    return (
      <div className="cpanel__side">
        <ul className="side__nav">
          <li className="side__item">
            <img
              src={chart}
              className="side__traffic"
              alt="traffic"
              onClick={event => this.goToTraffic()}
            />
          </li>
          <li className="side__item">
            <img
              src={news}
              className="side__news"
              alt="news"
              onClick={event => this.goToPosts()}
            />
          </li>
          <li className="side__item">
            <img src={file} className="side__file" alt="file" />
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Sidebar);
