import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import ComfyUIBox from "./ComfyUIBox";
import workflowJson1 from "./hackathon.json";
import workflowJson2 from "./blur-test.json";

const getRepoNestedContent = async () => {
  const randomValue = Math.floor(1000 + Math.random() * 9000);

  try {
    const response = await axios.get(
      `https://api.github.com/repos/supersver/test/contents/test/workflow.json?t=${randomValue}`,
      {
        headers: {
          authorization:
            localStorage.getItem("token") ||
            "Bearer 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",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getRepoNestedContent:", error);
    throw error;
  }
};

const App = () => {
  const comfyUIUrl = "https://w3rc--25589837-comfyui-app.modal.run/"; // Replace with your actual ComfyUI URL
  const workflow1 = workflowJson1;
  const workflow2 = workflowJson2;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repoContent, setRepoContent] = useState(null);
  const comfyFrame = useRef(null);

  const loadWorkflow = (workflow) => {
    console.log("Loading workflow:", workflow);
    const iframe = document.getElementById("comfyUIIframe");
    console.log(iframe, "agageag");
    comfyFrame.current.contentWindow.postMessage(
      { type: "loadGraphData", data: workflow },
      "*"
    );
    console.log(comfyFrame.current.contentWindow.postMessage, "anjangkjgn");
  };

  useEffect(() => {
    console.log(comfyFrame);
  }, [comfyFrame]);

  const handleLoadWorkflow1 = () => {
    if (repoContent) {
      loadWorkflow(repoContent);
    } else {
      loadWorkflow(workflow1);
    }
  };

  const handleLoadWorkflow2 = () => {
    loadWorkflow(workflow2);
  };

  const handleFetchRepoContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getRepoNestedContent();
      const content = atob(data.content);
      const jsonContent = JSON.parse(content);

      setRepoContent(jsonContent);
      console.log("Repository nested content fetched successfully:", data);
    } catch (error) {
      setError(error);
      console.error("Repository nested content not fetched:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ComfyUIBox comfyUIUrl={comfyUIUrl} comfyFrame={comfyFrame} />
      <button onClick={handleLoadWorkflow1}>Load Workflow 1</button>
      <button onClick={handleLoadWorkflow2}>Load Workflow 2</button>
      <button onClick={handleFetchRepoContent} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Repo Content"}
      </button>
      {error && <p>Error fetching repository content: {error.message}</p>}
      {repoContent && <pre>{JSON.stringify(repoContent, null, 2)}</pre>}
    </div>
  );
};

export default App;
