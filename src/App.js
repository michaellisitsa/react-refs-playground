import React, {useState, useEffect, useRef, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import ResizeObserver from 'resize-observer-polyfill';


const useResizeObserver = (ref) => {
  const [size, setSize] = useState([0,0]);
  
  const handleResize = useCallback((dimensions) =>{
      if (!Array.isArray(dimensions)) {
        return;
      }
      setSize([Dimensions[0].contentRect.height,dimensions[0].contentRect.width]);
      console.log("entered handler")}
  ,[ref]);
  
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    
    const observer = new ResizeObserver((entries) => {
      console.log("resized");
      handleResize(entries);
    })

    observer.observe(ref.current);

    return () => observer.disconnect()
  },[ref])
  return size
  
}


const App = () => {
    const ref = useRef();
    const size = useResizeObserver(ref);
    console.log("Size",size);
    console.log("ref",ref);
    return (
      <div className="App">
        <div className="App-header" ref={ref}>
          <img src={logo} className="App-logo" alt="logo"  />
          <h2>Welcome to Michael's React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
}

export default App;
