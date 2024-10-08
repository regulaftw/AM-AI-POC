import React, { Component } from 'react';
import './components/css/buttonComponent.css'; // Make sure this points to your updated CSS file
import StudentAI from './components/scripts/studentAI';
import TeacherAI from './components/scripts/TeacherAI';
import ChatComponent from './components/scripts/ChatComponent';
import DevNotes from './components/scripts/DevNotes';
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
        <DevNotes showPopup={true}/>
        {!student && !teacher && (
          <>
            <div className="split left" onMouseEnter={() => this.setHover('hover-left')} onMouseLeave={this.clearHover}>
              <div className="centered">
                <Title textData="Teacher" /> {/* Use Title component */}
                <p>Utilize the AI Assignment Grader</p>
                <button className="customButton" onClick={this.pageHandleChangeTeacher}>Get Started</button>
              </div>
            </div>
            <div className="split right" onMouseEnter={() => this.setHover('hover-right')} onMouseLeave={this.clearHover}>
              <div className="centered">
                <Title textData="Student" /> {/* Use Title component */}
                <p>Contact the AI teacher's assistant</p>
                <button className="customButton" onClick={this.pageHandleChangeStudent}>Get Started</button>
              </div>
            </div>
          </>
        )}
        {student && <ChatComponent />}
        {teacher && <TeacherAI />}
      </div>
    );
  }
}

export default App;
