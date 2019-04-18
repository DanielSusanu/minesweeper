var grid;
var cols;
var rows;
var w = 40;
var canvasW= 401;
var totalBombs=1;
var fontSize= w * 0.5;
var isGameOver;
var emptyCellsClicked=0;
var totalEmptyCells = 0;
var totalCells=0;
var difficultyLevel = 1;

function setup() {
    createCanvas(canvasW, canvasW).parent("#canvasWrapper");    
    textAlign(CENTER, CENTER);
    textSize(fontSize);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols,rows);
    isGameOver=false;
    totalBombs = floor( (canvasW / w) * difficultyLevel);

    // create neighbors
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
            totalCells++;
        }
    }    

    // Pik totalBombs spots
    var options= [];       
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            options.push([i, j]);
        }
    }

    for (var n=0; n < totalBombs; n++){
        var index = floor(random(options.length));
        var choice = options[index];
        var i = choice[0];
        var j = choice[1];
        options.splice(index, 1);
        grid[i][j].bee = true;
    }

     
    // Count neighbors
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            var neighborBombs = grid[i][j].countNeighbors();
            if(neighborBombs > 0)
            totalEmptyCells++;
        }
    }
    console.log("total bombs : ", totalBombs, " difficulty level : ", difficultyLevel);
}
  
function draw() {
    background(255);
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            grid[i][j].show();
        }
    }

}

function gameOver(){
    isGameOver=true;
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            grid[i][j].forceReveal();
        }
    }
}

function mousePressed(event){   
    if(!isGameOver){
        for(var i=0; i < cols; i++){
            for(var j=0; j < rows; j++){
                var currentCell = grid[i][j];
                
                if(currentCell.contains(mouseX, mouseY)){
                    // if left clicked                    
                    if(event.button == 0 && currentCell.flagged == false){
                        currentCell.reveal();    
                        if(currentCell.bee){
                            currentCell.backgroundColor = color(255, 0 ,0);
                            gameOver();
                        }else{
                            emptyCellsClicked++;
                            console.log(emptyCellsClicked , totalEmptyCells);
                            if(emptyCellsClicked == totalEmptyCells){
                                alert('you won!');
                            }
                        }
                    }else if(event.button == 2  && currentCell.revealed == false){ // if right clicked
                        currentCell.toggleFlag();
                    }   
                    return;
                }
            }
        }
    }
}

function make2DArray(cols, rows){
    var arr = new Array(cols);
    for (var i=0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}