import React from 'react';

export default function About() {
  return (
    <div>
      <h1 className='display-4'>
        <span className='text-primary'>About</span> Contact Manager
      </h1>
      <p className='lead'>Simple app to manage contacts</p>
      <p className='text-secondary'>
        Version 2.0.0. Using Context API and Fake Rest API
      </p>
    </div>
  );
}
