import React from 'react'
import './css/HomePage.css';

const Panel = ({ showPanel, mineNumOnChange, boardSizeOnChange, mineNum, boardSize, error, setErrorOnChange }) => {
    const display_none={
        display: 'none'
    };
    /* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */
    let error_message;
    let controlNum_name;
    if(mineNum>(boardSize*boardSize)){
        setErrorOnChange(true)
    }
    else{
        setErrorOnChange(false)
    }
    if(error){
        error_message=<div className='error'>ERROR: Mines number and board size are invalid!</div>
        controlNum_name="controlNum_error"
    }
    else{
        error_message=<div style={display_none}></div>
        controlNum_name="controlNum"
    }
    if(showPanel){
        return (
            <div className='controlWrapper'>
              {error_message}
              <div className='controlCol'>
                <p className='controlTitle'>Mines Number</p>
                <input type='range' step="1" min='1' max='60' defaultValue={mineNum} onChange={mineNumOnChange}/>
                <p className={controlNum_name}>{mineNum}</p>
              </div>
              <div className='controlCol'>
                <p className='controlTitle'>Board Size (nxn)</p>
                <input type='range' step="1" min='1' max='20' defaultValue={boardSize} onChange={boardSizeOnChange}/>
                <p className= {controlNum_name}>{boardSize}</p>
              </div>
            </div>
          )
    }
    else{
        return (
            <div style={display_none}>
              
            </div>
          )
    }
  
}

export default Panel
