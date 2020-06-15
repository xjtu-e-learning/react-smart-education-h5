import React from 'react';
import './App.css';
import Home from "./containers/Home";
import TreeContainer from "./containers/TreeContainer";
import AssembleContainer from "./containers/AssembleContainer";
import Select from "./containers/select"

function App(props: any) {
    return (
        <>
            <Select />
            <Home/>
            <TreeContainer/>
            <AssembleContainer />
        </>
    );
}

export default App;
