import React from "react";

export default function Install() {
  return (
    <div className="text-white p-[30px]">
      <h2 className="text-[36px] font-bold">Installation</h2>
      <div className="text-[20px] flex flex-col ml-[20px] mt-[10px]">
        <code>
          $ npm install --save hifisdkgames 
        </code>
        <code>
          $ yarn add hifisdkgames 
        </code>
      </div>
      <h2 className="text-[36px] font-bold mt-[30px]">The gist</h2>
      <div className="text-[20px] flex flex-col ml-[20px] mt-[10px]">
        <code>
            import React from 'react';
        </code>
        <code>
            import Main from 'hifisdkgames/dist/Main';
        </code>
        <code className="mt-[20px]">
            function App()&#x7B;
        </code>
        <code className="ml-[20px]">
            return (
        </code>
        <code className="ml-[40px]">
            &lt;div&gt;
        </code>
        <code className="ml-[60px]">
            &lt;Main apikey="COUSTOMER API KEY" playerId="CURRENT PLAYER ID" &#x2215;&gt;
        </code>
        <code className="ml-[40px]">
            &lt;&#x2215;div&gt;
        </code>
        <code className="ml-[20px]">
            );
        </code>        
        <code>
            &#x7D;;
        </code>
      </div>
    </div>
  );
}
