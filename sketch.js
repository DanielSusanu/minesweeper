var grid;
var cols;
var rows;
var w = 40;
var canvasW= 401;
var totalBees=20;
var fontSize= w * 0.5;

function setup() {
    createCanvas(canvasW, canvasW);    
    textAlign(CENTER, CENTER);
    textSize(fontSize);
    cols = floor(width / w);
    rows = floor(height / w);
    grid = make2DArray(cols,rows);

    // create neighbors
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            grid[i][j] = new Cell(i, j, w);
        }
    }

    // Pik totalBees spots
    var options= [];   
    
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            options.push([i, j]);
        }
    }

    for (var n=0; n < totalBees; n++){
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
            grid[i][j].countNeighbors();
        }
    }
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
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            grid[i][j].revealed = true;
        }
    }
}

function mousePressed(event){   
    
    for(var i=0; i < cols; i++){
        for(var j=0; j < rows; j++){
            if(grid[i][j].contains(mouseX, mouseY)){
                // if left clicked
                if(event.button == 0){
                    grid[i][j].reveal();    
                    if(grid[i][j].bee){
                        grid[i][j].backgroundColor = color(255, 0 ,0);
                        gameOver();
                    }
                }else if(event.button == 2){ // if right clicked
                    grid[i][j].toggleFlag();
                }   
                return;
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