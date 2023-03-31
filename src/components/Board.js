/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(mineNum);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.
    //console.log(mineLocations)
    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);
    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.
        setBoard(newBoard.board)
        setMineLocations(newBoard.mineLocations)
        //console.log(newBoard.mineLocations)
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
        setRemainFlagNum(mineNum);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        //console.log("x: ", x,",y: ", y)
        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end
        if(remainFlagNum === 0){return;}
        if(board[x][y].revealed === false){
            if(board[x][y].flagged === false){
                newBoard[x][y].flagged = true;
                newFlagNum--;
            }
            else{
                newBoard[x][y].flagged = false;
                newFlagNum++;
            }
        }
        //console.log(newBoard);
        setRemainFlagNum(newFlagNum);
        setBoard(newBoard);

    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        if(board[x][y].value === '💣'){
            mineLocations.map(loc => newBoard[loc[0]][loc[1]].revealed=true)
            setBoard(newBoard);
            setGameOver(true);
            return;
        }
        else if(board[x][y].value!=0){
            newBoard[x][y].revealed=true;
        }
        else{
            press0(newBoard, x, y);
        }
        setBoard(newBoard);
        let check=false;
        for(var i=0; i<boardSize; i++){
            for(var j=0; j<boardSize; j++){
                if(newBoard[i][j].value !=='💣' && newBoard[i][j].revealed === false){
                    check=true;
                }
                if(check){break;}
            }
            if(check){break}
        }
        if(check === false){setWin(true);setGameOver(true);}
    };
    const press0 =(newBoard, x, y) =>{
        newBoard[x][y].revealed=true;
        for(var i = x-1; i<=x+1; i++){
            for(var j = y-1; j<=y+1; j++){
                if(i>=0 && i<boardSize && j>=0 && j<boardSize){
                    //console.log("i: ",i,", j: ",j);
                    if(newBoard[i][j].value !=='💣' && newBoard[i][j].value>0){
                        newBoard[i][j].revealed=true;
                    }
                    else if(newBoard[i][j].value === 0){
                        if(newBoard[i][j].revealed === false){
                            press0(newBoard, i, j);
                        }
                        
                    }
                }
            }
        }
    }

    let endgame;
    const display_none={
        display: 'none'
    };
    if( gameOver || win){
        endgame=<Modal restartGame={restartGame} backToHome={backToHome} win={win}/>
    }
    else{
        endgame=<div style={display_none}></div>
    }
    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                 {/*<h1>This is the board Page!</h1>*/}  {/* This line of code is just for testing. Please delete it if you finish this function. */}

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className='boardContainer'>
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {board.map((subarray, index) => (
                        <div id={'row'+index.toString()} style = {{display: 'flex'}}>{
                            subarray.map((item) =>{
                                const { value, revealed, x, y, flagged} = item
                                return <Cell 
                                key={x.toString() + '-' + y.toString()}
                                rowIdx={x}
                                colIdx={y}
                                detail={item}
                                updateFlag={updateFlag}
                                revealCell={revealCell}
                                />
                            })}    
                        </div>
                        ))}
                </div>
            </div>
            {endgame}
        </div>
    );



}

export default Board