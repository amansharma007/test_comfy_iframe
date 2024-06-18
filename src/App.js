import React, { useState } from 'react';
import './App.css';
import ComfyUIBox from './ComfyUIBox';
import workflowJson1 from './hackathon.json';
import workflowJson2 from './blur-test.json';
// import workflowJson3 from './workflow3.json';

const App = () => {
  const comfyUIUrl = 'http://127.0.0.1:8188/'; // Replace with your actual ComfyUI URL
  // const [currentWorkflow, setCurrentWorkflow] = useState(workflowJson1);

  const workflow1 = workflowJson1;
  const workflow2 = workflowJson2;

  const loadWorkflow = (workflow) => {
    const iframe = document.getElementById('comfyUIIframe');
    iframe.contentWindow.postMessage({ type: 'loadGraphData', data: workflow }, '*');
  };

  const handleLoadWorkflow1 = () => {
    loadWorkflow(workflow1);
  };

  const handleLoadWorkflow2 = () => {
    loadWorkflow(workflow2);
  };

  return (
    <div>
      <ComfyUIBox comfyUIUrl={comfyUIUrl} />
      <button onClick={handleLoadWorkflow1}>Load Workflow 1</button>
      <button onClick={handleLoadWorkflow2}>Load Workflow 2</button>
    </div>
  );
};

export default App;
