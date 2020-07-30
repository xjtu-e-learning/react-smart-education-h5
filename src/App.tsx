import React from 'react';
import './App.css';
import Home from "./containers/Home";
import TreeContainer from "./containers/TreeContainer";
import AssembleContainer from "./containers/AssembleContainer";
import Card  from './containers/DomainContainer';
import Menumy from './containers/SubjectContainer'
function App(props: any) {
    return (
        <>
            <Menumy/>
            <Card/>
            <Home/>
            <TreeContainer/>
            <AssembleContainer />
        </>
    );
}

export default App;
