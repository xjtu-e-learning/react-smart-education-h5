import React from 'react';
import './App.css';
import Home from "./containers/Home";
import TreeContainer from "./containers/TreeContainer";
import AssembleContainer from "./containers/AssembleContainer";

function App(props: any) {
    return (
        <>
            <Home/>
            <TreeContainer/>
            <AssembleContainer />
        </>
    );
}

export default App;
