var startBoard = [['','','','','','','',9,''],
                ['','',4,'','','',2,'',''],
                ['','',8,'','',5,'','',''],
                ['','','','','','','',3,''],
                [2,'','','',4,'',1,'',''],
                ['','','','','','','','',''],
                ['','',1,8,'','',6,'',''],
                ['',3,'','','','','',8,''],
                ['','',6,'','','','','','']];
var userInput;
var lastInput = [];

window.onload = function(){
    
    var board = document.getElementById("board");
    createBoard(board, startBoard);

    var numbers = document.getElementById("numbers");
    createNumbers(numbers);

};

function createBoard(board, startBoard){
    for(let i = 0; i < 9; i++){ 
        let tr = board.insertRow(); 
        for(let j = 0; j < 9; j++){
            let td = tr.insertCell();
            td.setAttribute("name",`cell${i}${j}`)
            td.appendChild(document.createTextNode(startBoard[i][j]));
        }
    }
    boardClick(board);
};

function boardClick(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            board.rows[i].cells[j].onclick = function(){
                if(userInput != null && checkNum(board, i, j)){
                    board.rows[i].cells[j].textContent = userInput.textContent;
                    board.rows[i].cells[j].classList.add('user-input');
                    lastInput = [i, j];
                }
            };
        }
    }
};

function checkNum(board, row, col){
    let check = true;
    let firstRow = Math.floor(row / 3) * 3;
    let firstCol = Math.floor(col / 3) * 3;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            if(board.rows[firstRow+i].cells[firstCol+j].textContent == userInput.textContent 
                && (document.getElementsByName(`cell${firstRow+i}${firstCol+j}`) != `cell${row}${col}`)){
                board.rows[firstRow+i].cells[firstCol+j].classList.add("error");
                console.log("same block");
                check = false;
            }
        }
    }

    for(let i = 0; i < 9; i++){
        if(board.rows[row].cells[i].textContent == userInput.textContent 
            && (document.getElementsByName(`cell${row}${i}`) != `cell${row}${col}`)){
            board.rows[row].cells[i].classList.add("error");
            console.log("same row");
            check = false;
        }
    }

    for(let i = 0; i < 9; i++){
        if(board.rows[i].cells[col].textContent == userInput.textContent 
            && (document.getElementsByName(`cell${i}${col}`) != `cell${row}${col}`)){
            board.rows[i].cells[col].classList.add("error");
            console.log("same column");
            check = false;
        }
    }
    return check;
};

function createNumbers(numbers){
    let tr = numbers.insertRow();
    for(let i = 1; i < 11; i++){
        if(i == 10){
            let undo = document.createElement("img");
            let td = tr.insertCell();
            undo.src = "images/undo.png";
            td.appendChild(undo);
        }else{ 
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(i));
        }
    }
    numbersClick(numbers);
};

function numbersClick(numbers){
    for(let i = 0; i < 10; i++){
        if(i < 9){
            numbers.rows[0].cells[i].onclick = function(){
                if(!this.classList.contains("selected")){
                    for(let j = 0; j < 9; j++){                        
                        numbers.rows[0].cells[j].classList.remove("selected")
                    }
                    this.classList.add("selected");
                    userInput = this;
                }else{
                    this.classList.remove("selected");
                    userInput = null;
                }                            
            };
        }else{
            numbers.rows[0].cells[i].onclick = function(){
                if(lastInput.length > 0){
                    let text = document.createTextNode(startBoard[lastInput[0]][lastInput[1]]);
                    let bCell = document.getElementsByName(`cell${lastInput[0]}${lastInput[1]}`)[0];
                    bCell.textContent = text.textContent;
                }
                let errCell = document.getElementsByClassName("error");
                while(errCell[0]){
                    errCell[0].classList.remove("error");
                }
            }
        }
    }
};

