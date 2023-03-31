/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState } from 'react';
import Panel from './Panel';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}

  const setPanelOnClick = () => {
    setShowPanel(!showPanel);
  }
  const setErrorOnChange =(bool) => {
    setError(bool)
  }
  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className='btn' onClick={startGameOnClick} disabled={error}>Start Game</button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className='controlContainer'>
        <button className='btn' onClick={setPanelOnClick}>Difficulty Adjustment</button>
        <Panel 
        showPanel={showPanel} 
        mineNumOnChange={mineNumOnChange} 
        boardSizeOnChange={boardSizeOnChange} 
        mineNum={mineNum} 
        boardSize={boardSize}
        error={error}
        setErrorOnChange={setErrorOnChange}
        />
      </div>
      
    </div>
  );

}
export default HomePage;   