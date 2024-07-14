var arr = [[], [], [], [], [], [], [], [], []]
for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}
var board = [[], [], [], [], [], [], [], [], []]
function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};
function isSafe(board,row,col,val,n ){
    for(let i =0;i<n;i++){ 
        //step 1: // Row  check  // col check
        if(board[row][i]==val || board[i][col]==val){
            return false ;
        }
        //3*3 board check 
	 let startRow = row - row % 3;
	 let startCol = col - col % 3;
	  for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i + startRow][j + startCol] == val) {
				return false;
			}
		}
	}
}
    return true ;
}
function SudokuSolver(board,row,col,n)
{
    // base case
    if (row == n)
    {
        FillBoard(board)
        return true;
    }
    // if we  have to stay inside the board
    if (col == n)
    {
        return SudokuSolver(board, row + 1, 0, n);
    }
    // if board is not  empty
    if (board[row][col] != 0)
    {
       return  SudokuSolver(board, row, col + 1, n);
    }
    for (let val = 1; val <= 9; val++)
    {
        // check if val can be filled{
        if (isSafe(board, row, col, val,n))
        {
            board[row][col] = val;
            let nextPossibleAns = SudokuSolver(board, row, col + 1, n);
            if (nextPossibleAns)
            {
                return true;
            }
            // backtracking
            board[row][col] = 0;
        }
    }
    return false;
}
