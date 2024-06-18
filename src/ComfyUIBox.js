import React, { useEffect, useRef, useState } from "react";

const ComfyUIBox = ({ comfyUIUrl, workflow }) => {
  const comfyFrame = useRef(null);

  // useEffect(() => {
  //   const iframe = comfyFrame.current;
  //   if (iframe) {
  //     iframe.onload = () => {
  //       iframe.contentWindow.postMessage(JSON.stringify(workflow), "*");
  //     };
  //   }
  // }, [workflow]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <iframe
        src={comfyUIUrl}
        // ref={comfyFrame}
        style={{ width: '100%', height: '600px', border: 'none' }}
        title="ComfyUI"
        name="ComfyUI"
        id="comfyUIIframe"
      ></iframe>
    </div>
  );
};

export default ComfyUIBox;
