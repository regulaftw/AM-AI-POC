import React, { useState } from 'react';
import '../css/TeacherAI.css'; // Ensure your CSS file has the required styles
import TeacherOutput from './TeacherOutput';
import ErrorPopup from './ErrorPopup';

const API_KEY = process.env.REACT_APP_API_KEY;

const TeacherAI = () => {
    const [submitted, setSubmitted] = useState(false);
    const [outputDisplayed, setOutputDisplayed] = useState(false);
    const [messages, setMessages] = useState([
      {
        message: "Hello, I'm the Teaching Assistant for the Cyber Security Module",
        sentTime: "just now",
        sender: "ChatGPT",
      },
    ]);

    const question1 = `
    "What factors can positively and negatively impact the implementation and use of an 
    information security? Define these factors, and explain how they may impact 
    implementation of information security"
    `;

    const question2 = `
    As an Information Security Officer, you have been tasked by Management to determine the Cyber Security Maturity level of your organization, an e-commerce start-up. Determine your approach in conducting the Cyber Security Maturity Assessment for your organization and do your research on how you would be able to determine the level of cyber security maturity of your organization.
    `
    const [question, setQuestion] = useState(question1);
    const [essay, setEssay] = useState('');
    const [content, setContent] = useState('');
    
    const [error, setError] = useState(false);

    const handleEssayChange = (e) => {
      const newValue = e.target.value;
      setEssay(newValue);
      console.log(newValue);
    }

    const handleQuestionChange = (e) => {
      const newValue = e.target.value;
      setQuestion(newValue);
      console.log(question);
    }

    const validateEssay = (_essay) => {
      console.log(_essay.length)
      if(_essay.length > 200){
        return true;
      } else {
        return false;
      }
    }

    const handleSendRequest = async (e) => {
      e.preventDefault();

      if(!validateEssay(essay)){
        setError(true);
      } else {

      let tmpMessage = question + "\n" + essay
      const newMessage = {
        message : tmpMessage,
        direction : "outgoing",
        sender : "user"
      };

      console.log(newMessage);
      setMessages((prevMessages)=> [...prevMessages, newMessage]);
      

      try {
        console.log(([...messages, newMessage]));
        console.log(newMessage.message);
        const response = await processMessageToChatGPT([...messages, newMessage]);
        const _content = response.choices[0]?.message?.content;
        setContent(_content);
      } catch (error) {
        console.error("Error Processing Message: ", error)
      } finally {
        setOutputDisplayed(true);
        setSubmitted(true);
      }
    }
      
    }

    async function processMessageToChatGPT(chatMessages) {
      let Testcontent = `
        You are a lecturer teaching a module on "Cybersecurity and Intelligence". You are an expert in marking student essay assignments. Provide them with a grade and comments. The grades are numerical and in percentages out of 100. Give a single grade, not a range. If its not in the format of "Question: {Question}, Answer:{Answer}. Reply with "This is not the right format, try again!". You may use this grading scheme as a gauge on how to grade the assignment. If it falls below 50% provide a "F" which stands for "Fail" Grading Scheme: 80-100% • Outstanding Subject knowledge • Effectively introduces and integrates knowledge from independent study beyond scope of module materials • Draws links to other modules • No further development of answer required • Extensive critical evaluation of arguments and referenced research and literature • Thoughtful and thorough application of knowledge, theory and research to case study throughout analysis and recommendations • All concepts and material fully relevant to the analysis and recommendations including materials sourced from independent research • Outstanding, sophisticated written communication • No significant areas for further development • Sources are exceptionally well- integrated, and they support claims argued in the paper very effectively. • Quotations and works cited conform international standards • Precise APA / Harvard Referencing 70-79% • Uses a wide range of ideas and concepts from the module • Draws different concepts together effectively • Strong use of relevant theoretical models and/or research • Fully referenced with wide range of sources • Strong evidence of independent research to enhance the answer • Researched and answered from different angles. • Considers the limitations of some of the research sources used • Tailors information to answer the question fully • Illustrates answer with range of organizational examples • Links relevant personal examples/experiences to appropriate theoretical concepts and literature • Applies concepts thoroughly to case study organization • Answers the question fully covering all key concepts • No evidence of ‘padding’ with irrelevant information • Logical organization and flow of ideas • Error free written communication • Precise APA / Harvard Referencing • An enjoyable read • Sources are well integrated and support the paper’s claims. • There may be occasional errors, but the sources and works cited conform to international • Standards Precise APA / Harvard Referencing 60-69% • Draws together key ideas and concepts from the module effectively • Some use of theoretical models and/or research to support answer • Evidence of some independent research but largely guided by references provided in the module • Strong development of advantages / disadvantages and cons etc. evident in answer • May be some evidence different approaches to answering the question are understood • Illustrates answer with some appropriate organizational examples discussed during the module • Uses personal examples but may not always link this back to theoretical concepts and literature • Links to case study but integration with theory/research may still be disjointed in places • Chooses appropriate concepts and makes a clear attempt to answer the question • Information is mostly relevant to the question • Only minor missing elements • Minimal ‘padding’ with irrelevant information • Well-structured answer • Only minor spelling / grammatical errors • Good grasp of APA / Harvard Referencing • Mainly easy to read and follow • Sources support some claims made in the paper but might not be integrated well within the paper’s argument. • There may be a few errors in citing. 50-59% Uses some relevant ideas and concepts from the module • Limited gaps in knowledge or misunderstanding of concepts • Some relevant references but may be overreliance on core textbooks/overuse of direct quotes etc. Acknowledges some alternative interpretations to the answer e.g. advantages and disadvantages, pros and cons Examples are very limited or lack relevance • Case study is mentioned but poorly integrated into the answer Some effort to answer the question • Some missing or weak elements • Covers some relevant concepts but links to answer are unclear in places • Important concepts may be difficult to extract from other irrelevant information Some spelling / grammatical errors but do not significantly interfere with understanding • Some attempt to APA / Harvard Referencing • Difficult to read and follow in places Sources support a few claims in the paper but are not integrated well within the paper’s argument. • There may be multiple errors in citing. Give your answer in this format: {Grade}{Comments}. Make sure {Grade} is just 1 number
      `
      const apiMessages = chatMessages.map((messageObject) => {
          const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
          return { role, content: messageObject.message };
        });
    
        const apiRequestBody = {
          "model": "ft:gpt-3.5-turbo-0613:personal::8nI6dW4H",
          "messages": [
            { role: "system", content: Testcontent },
            ...apiMessages,
          ],
        };
    
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
          
        });
    
        return response.json();
    
    }

    return (
        <div className='centered-container'>
          <ErrorPopup showError={error}/>
            {!submitted && (
                <div className="form-container">
                    <h1 style={{ color: "#1C5DBB" }}>AI Assignment Grader</h1>
                    <form onSubmit={handleSendRequest} className="assignment-form">
                        <div className="box-outer">
                            <div className="main_box">
                                <textarea placeholder="Enter assignment text" className="input-textarea" value={essay} onChange={handleEssayChange}></textarea>
                                <div className="bar top"></div>
                                <div className="bar right delay"></div>
                                <div className="bar bottom"></div>
                                <div className="bar left delay"></div>
                </div>
              </div>
              <div className="dropdown-container">
                <select className="dropdown-menu" value={question} onChange={handleQuestionChange}>
                  <option value = {question1}>"What factors can positively and negatively impact the implementation and use of an
                    information security?"</option>
                  <option value = {question2}>"As an Information Security Officer, you have been tasked by Management to determine the Cyber Security Maturity level of your organization, an e-commerce start-up. "</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Grade</button>
            </form>
          </div>
        )}

        {outputDisplayed && <TeacherOutput output={content} />}
        </div>
    );
}

export default TeacherAI;
