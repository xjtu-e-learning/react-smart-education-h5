import React from 'react';
import './App.css';
import Home from "./containers/Home";
import TreeContainer from "./containers/TreeContainer";

function App(props: any) {
    return (
        <>
            <Home/>
            <TreeContainer/>
        </>
    );
}

export default App;
