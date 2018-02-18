import React from 'react';
import ProjectContainer from './ProjectContainer';

const Body = (props) => {
    return(
        <main className="body">
            <ProjectContainer posts={props.posts} id="projects"/>
        </main>
    );
}

export default Body;