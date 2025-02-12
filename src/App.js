import React, { Component } from 'react';
import './components/css/buttonComponent.css'; // Make sure this points to your updated CSS file
import StudentAI from './components/scripts/studentAI';
import TeacherAI from './components/scripts/TeacherAI';
import ChatComponent from './components/scripts/ChatComponent';
import cybermentor_img from './components/img/CyberMentor.png'
import grademaster_img from './components/img/GradeMaster.png'
import horizontal_img from './components/img/HorizontalLogo.png'
import './App.css'

import Title from './components/scripts/textanimation';

class App extends Component {
  state = {
    student: false,
    teacher: false,
    hoverSide: '', // Added for hover effect
  };

  setHover = (side) => {
    this.setState({ hoverSide: side });
  };

  clearHover = () => {
    this.setState({ hoverSide: '' });
  };

  pageHandleChangeStudent = () => {
    this.setState({ student: true, teacher: false });
  };

  pageHandleChangeTeacher = () => {
    this.setState({ teacher: true, student: false });
  };

  render() {
    const { student, teacher, hoverSide } = this.state;
    const containerClass = hoverSide ? `container ${hoverSide}` : 'container';

    return (
      <div className={containerClass}>
        {!student && !teacher && (
          <>
            <div class="logo-container">
              <img src={horizontal_img} 
                 alt="Company Logo"
                 class="logo"/>
            </div>

            <div class="cards">
              <div class="card">
                  <div class="card-content">
                    <img src={grademaster_img} 
                        alt="GradeMaster AI"/>
                    <h2>GradeMaster</h2>
                    {/* <Title textData="GradeMaster" /> Use Title component */}
                    <p>AI Agent for Educators - Automates Assignment Grading</p>
                    <button onClick={this.pageHandleChangeTeacher}>Get Started</button>
                  </div>
              </div>

              <div class="card">
                <div class="card-content">
                    <img src={cybermentor_img}
                         alt="CyberMentor AI"/>
                    {/* <Title textData="CyberMentor" /> Use Title component */}
                    <h2>CyberMentor</h2>
                    <p>AI Agent for Learners - Mastering Cybersecurity Expertise</p>
                    <button onClick={this.pageHandleChangeStudent} >Get Started</button>
                </div>
              </div>

            </div>
            

            {/* <div className="split left" onMouseEnter={() => this.setHover('hover-left')} onMouseLeave={this.clearHover}>
              <div className="centered">
                
                <p>AI Agent for Educators - Automates Assignment Grading</p>
                
              </div>
            </div> */}
            {/* <div className="split right" onMouseEnter={() => this.setHover('hover-right')} onMouseLeave={this.clearHover}>
              <div className="centered">
                
                <p>AI Agent for Learners -  Mastering Cybersecurity Expertise</p>
                <button className="customButton" >Get Started</button>
              </div>
            </div> */}
          </>
        )}
        {student && <ChatComponent />}
        {teacher && <TeacherAI />}
      </div>
    );
  }
}

export default App;
