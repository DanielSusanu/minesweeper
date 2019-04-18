function Cell(i, j, w){ 
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w=w;
    this.neighborCount= -1;
    this.bee = false;
    this.revealed = false;  
    this.backgroundColor = color(190);
    this.flagged = false;

}
Cell.prototype.show = function(){
    
    stroke(0);
    fill(this.backgroundColor);
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed && !this.flagged){        
        if(this.bee){
            stroke(0);
            fill(127);
            ellipse(this.x + this.w * 0.5 , this.y + this.w * 0.5 , this.w * 0.5)
        }else{
            fill(255)
            rect(this.x, this.y, this.w, this.w);
            if(this.neighborCount > 0){                
                textAlign(CENTER);
                switch(this.neighborCount) {
                    case 1:
                        fill(0 , 0 , 255);
                        stroke(0 , 0 , 255);
                      break;
                    case 2:
                        fill(0, 128, 0);
                        stroke(0, 128, 0);
                      break;
                    case 3:
                        fill(255, 87, 34);
                        stroke(255, 87, 34);
                      break;
                    default:
                        fill(244, 67, 54);
                        stroke(244, 67, 54);
                  }
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.7);
            }
        }
    } else if(this.flagged){
        fill(239, 219, 47);
        ellipse(this.x + this.w * 0.5 , this.y + this.w * 0.5 , this.w * 0.5)
    }

}
Cell.prototype.removeFlag = function(){
    this.flagged = false;
}



Cell.prototype.toggleFlag = function(){
    this.flagged = !this.flagged;
}

Cell.prototype.countNeighbors = function(){
    if(this.bee){
        return -1
    }
    var total = 0;
    for (var xoff= -1; xoff <= 1; xoff++){
        for (var yoff = -1; yoff <= 1; yoff++){
            var i = this.i + xoff;
            var j = this.j + yoff;
            if(i > -1 && i < cols && j > -1 && j < rows){
                var neighbor = grid[i][j];
                if(neighbor.bee){
                    total++;
                }
            }           
        }        
    }

    this.neighborCount = total;
    return total;
}

Cell.prototype.reveal = function(){
    this.revealed = true;
    if(this.neighborCount == 0){
        // flood fill time
        this.floodFill();
    }
}

Cell.prototype.forceReveal = function(){
    this.removeFlag();
    this.revealed = true;
}

Cell.prototype.floodFill = function(){
    for (var xoff= -1; xoff <= 1; xoff++){
        for (var yoff = -1; yoff <= 1; yoff++){
                var i = this.i + xoff;
                var j = this.j + yoff;
                if(i > -1 && i < cols && j > -1 && j < rows){
                    var neighbor = grid[i][j];
                    if(!neighbor.bee && !neighbor.revealed){
                        neighbor.reveal();
                    }
                }    
        }        
    }
}

Cell.prototype.contains = function(x , y){
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}