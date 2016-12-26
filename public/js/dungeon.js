var Dungeon = {
    map: null,
    map_size: 64,
    rooms: [],
　　　　lightOn: false,
    lightRadius: 5,
    playerPosition: [7,7],
    enemyPositions: [],
    weaponPositions: [],
    healthPositions: [],
    waypointPosition: [],
　　　　ResetDungeon: function(){
	this.enemyPositions = [];
	this.weaponPositions = [];
	this.healthPositions = [];
	this.waypointPosition = [];
	this.rooms = [];
	this.map = null;
    },
    IsFull(coord){
	for(var i = 0; i < this.enemyPositions.length; i ++){
	  if(this.enemyPositions[i].position[0] == coord[0] && this.enemyPositions[i].position[1] == coord[1]){return true}
	}
	for(var i = 0; i < this.weaponPositions.length; i ++){
	  if(this.weaponPositions[i].position[0] == coord[0] && this.weaponPositions[i].position[1] == coord[1]){return true}
	}
	for(var i = 0; i < this.healthPositions.length; i ++){
	  if(this.healthPositions[i].position[0] == coord[0] && this.healthPositions[i].position[1] == coord[1]){return true}
	}
        if(this.waypointPosition[0] == coord[0] && this.waypointPosition[1] == coord[1]){return true}
	return false;
    },
    RemoveEnemy: function(id){
	var index;
	for(var i = 0; i < this.enemyPositions.length; i++){
	  if(this.enemyPositions[i].id == id){
		index = i;
	  }
	}
	var newPositions = this.enemyPositions.slice(0,index);
	var tail = this.enemyPositions.slice(index + 1);
	newPositions = newPositions.concat(tail);
	console.log(newPositions);
	this.enemyPositions = newPositions;
    },
　　　　RemoveWeapon: function(id){
	var index;
	for(var i = 0; i < this.weaponPositions.length; i++){
	  if(this.weaponPositions[i].id == id){
		index = i;
	  }
	}
	var newPositions = this.weaponPositions.slice(0,index);
	var tail = this.weaponPositions.slice(index + 1);
	newPositions = newPositions.concat(tail);
	console.log(newPositions);
	this.weaponPositions = newPositions;
    },
    RemoveHealth: function(id){
	var index;
	for(var i = 0; i < this.healthPositions.length; i++){
	  if(this.healthPositions[i].id == id){
		index = i;
	  }
	}
	var newPositions = this.healthPositions.slice(0,index);
	var tail = this.healthPositions.slice(index + 1);
	newPositions = newPositions.concat(tail);
	console.log(newPositions);
	this.healthPositions = newPositions;
    },
　　　　PlaceWaypoint: function() {
	var IsFull = true;
	while(IsFull == true){
	  var minimum = 0
          var maximum = this.rooms.length - 1
          var roomNo =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
          var room = this.rooms[roomNo];
	  var x = Math.floor(room.w/2) + room.x;
	  var y = Math.floor(room.h/2) + room.y;
	  IsFull = this.IsFull([x,y]);
	}
        this.waypointPosition = [x,y];
	return this.waypointPosition;
    },
    PlacePlayer: function() {
	var IsFull = true;
	while(IsFull == true){
	  var minimum = 0
          var maximum = this.rooms.length - 1
          var roomNo =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
          var room = this.rooms[roomNo];
	  var x = Math.floor(room.w/2) + room.x;
	  var y = Math.floor(room.h/2) + room.y;
	  IsFull = this.IsFull([x,y]);
	}
        this.playerPosition = [x,y];
	return this.playerPosition;
    },
　　　　PlaceWeapon: function(id){
	var IsFull = true;
	while(IsFull == true){
	　　var minimum = 0
        　　var maximum = this.rooms.length - 1
        　　var roomNo =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        　　var room = this.rooms[roomNo];
	　　var x = Math.floor(room.w/2) + room.x;
	　　var y = Math.floor(room.h/2) + room.y;
	  IsFull = this.IsFull([x,y]);
        }
        var e = {position: [x,y], id: id};
	this.weaponPositions.push(e);
	return [x,y];
    },
    PlaceHealth: function(id){
	var IsFull = true;
	while(IsFull == true){
	　　var minimum = 0
        　　var maximum = this.rooms.length - 1
        　　var roomNo =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        　　var room = this.rooms[roomNo];
	　　var x = Math.floor(room.w/2) + room.x;
	　　var y = Math.floor(room.h/2) + room.y;
	  IsFull = this.IsFull([x,y]);
	}
        var e = {position: [x,y], id: id};
	this.healthPositions.push(e);
	return [x,y];
    },
    PlaceEnemy: function(id) {
	var IsFull = true;
	while(IsFull == true){
          var minimum = 0
          var maximum = this.rooms.length - 1
          var roomNo =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
          var room = this.rooms[roomNo];
	  var x = Math.floor(room.w/2) + room.x;
	  var y = Math.floor(room.h/2) + room.y;
	  IsFull = this.IsFull([x,y]);
	}
        var e = {position: [x,y], id: id};
	this.enemyPositions.push(e);
	return [x,y];
    },
    Generate: function () {
        this.map = [];
        for (var x = 0; x < this.map_size; x++) {
            this.map[x] = [];
            for (var y = 0; y < this.map_size; y++) {
                this.map[x][y] = 0;
            }
        }

        var room_count = Helpers.GetRandom(10, this.map_size/3);
        var min_size = 5;
        var max_size = 15;

        for (var i = 0; i < room_count; i++) {
            var room = {};

            room.x = Helpers.GetRandom(1, this.map_size - max_size - 1);
            room.y = Helpers.GetRandom(1, this.map_size - max_size - 1);
            room.w = Helpers.GetRandom(min_size, max_size);
            room.h = Helpers.GetRandom(min_size, max_size);

            if (this.DoesCollide(room)) {
                i--;
                continue;
            }
            room.w--;
            room.h--;

            this.rooms.push(room);
        }

        this.SquashRooms();

        for (i = 0; i < room_count; i++) {
            var roomA = this.rooms[i];
            var roomB = this.FindClosestRoom(roomA);

            pointA = {
                x: Helpers.GetRandom(roomA.x, roomA.x + roomA.w),
                y: Helpers.GetRandom(roomA.y, roomA.y + roomA.h)
            };
            pointB = {
                x: Helpers.GetRandom(roomB.x, roomB.x + roomB.w),
                y: Helpers.GetRandom(roomB.y, roomB.y + roomB.h)
            };

            while ((pointB.x != pointA.x) || (pointB.y != pointA.y)) {
                if (pointB.x != pointA.x) {
                    if (pointB.x > pointA.x) pointB.x--;
                    else pointB.x++;
                } else if (pointB.y != pointA.y) {
                    if (pointB.y > pointA.y) pointB.y--;
                    else pointB.y++;
                }

                this.map[pointB.x][pointB.y] = 1;
            }
        }

        for (i = 0; i < room_count; i++) {
            var room = this.rooms[i];
            for (var x = room.x; x < room.x + room.w; x++) {
                for (var y = room.y; y < room.y + room.h; y++) {
                    this.map[x][y] = 1;
                }
            }
        }

        for (var x = 0; x < this.map_size; x++) {
            for (var y = 0; y < this.map_size; y++) {
                if (this.map[x][y] == 1) {
                    for (var xx = x - 1; xx <= x + 1; xx++) {
                        for (var yy = y - 1; yy <= y + 1; yy++) {
                            if (this.map[xx][yy] == 0) this.map[xx][yy] = 2;
                        }
                    }
                }
            }
        }
    },
    FindClosestRoom: function (room) {
        var mid = {
            x: room.x + (room.w / 2),
            y: room.y + (room.h / 2)
        };
        var closest = null;
        var closest_distance = 1000;
        for (var i = 0; i < this.rooms.length; i++) {
            var check = this.rooms[i];
            if (check == room) continue;
            var check_mid = {
                x: check.x + (check.w / 2),
                y: check.y + (check.h / 2)
            };
            var distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
            if (distance < closest_distance) {
                closest_distance = distance;
                closest = check;
            }
        }
        return closest;
    },
    SquashRooms: function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < this.rooms.length; j++) {
                var room = this.rooms[j];
                while (true) {
                    var old_position = {
                        x: room.x,
                        y: room.y
                    };
                    if (room.x > 1) room.x--;
                    if (room.y > 1) room.y--;
                    if ((room.x == 1) && (room.y == 1)) break;
                    if (this.DoesCollide(room, j)) {
                        room.x = old_position.x;
                        room.y = old_position.y;
                        break;
                    }
                }
            }
        }
    },
    DoesCollide: function (room, ignore) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (i == ignore) continue;
            var check = this.rooms[i];
            if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
        }

        return false;
    },
    IsWall: function(coord){
         var colorNumber = this.map[coord[0]][coord[1]];
	 switch(colorNumber){
	   case 1:
	     return false;
	     break;
	   case 2: 
	     return true;
	     break;
	 }
    },
    IsEnemy: function(coord){
	for(var i = 0;i < this.enemyPositions.length; i++){
	  var e = this.enemyPositions[i];
	  if(e.position[0] === coord[0] && e.position[1] === coord[1]){return e.id}
        }
	return false;
    },
    IsWeapon: function(coord){
	for(var i = 0;i < this.weaponPositions.length; i++){
	  var e = this.weaponPositions[i];
	  if(e.position[0] === coord[0] && e.position[1] === coord[1]){return e.id}
        }
	return false;
    },
    IsHealth: function(coord){
	for(var i = 0;i < this.healthPositions.length; i++){
	  var e = this.healthPositions[i];
	  if(e.position[0] === coord[0] && e.position[1] === coord[1]){return e.id}
        }
	return false;
    },
    IsWaypoint: function(coord){
	
	if(this.waypointPosition[0] === coord[0] && this.waypointPosition[1] === coord[1]){return true;} else { return false;}
    }
}

var Renderer = {
    canvas: null,
    ctx: null,
    size: 512,
    scale: 0,
    Initialize: function () {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = canvas.getContext('2d');
        this.scale = this.canvas.width / Dungeon.map_size;
    },
    isDark: function(coord) {
	xDistance = Math.abs(coord[0] - Dungeon.playerPosition[0]);
	yDistance = Math.abs(coord[1] - Dungeon.playerPosition[1]);
	var distance = xDistance + yDistance;
	if(distance > Dungeon.lightRadius　&& Dungeon.lightOn == false){return true;} else {return false;}
    },
    Update: function () {
        for (var y = 0; y < Dungeon.map_size; y++) {
            for (var x = 0; x < Dungeon.map_size; x++) {
		var coord = [x,y];
		switch(this.isDark(coord)){
		  case true:
		    var tile = Dungeon.map[x][y];
		    this.ctx.fillStyle = '#351330';
                    this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
		    break;
		  case false:
                    var tile = Dungeon.map[x][y];
                    if (tile == 0) this.ctx.fillStyle = '#351330';
                    else if (tile == 1) this.ctx.fillStyle = '#64908A';
                    else this.ctx.fillStyle = '#424254';
                    this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
		    break;
		}
            }
        }
	//Show Player Position
	this.ctx.fillStyle = "red";
	this.ctx.fillRect(Dungeon.playerPosition[0] * this.scale, Dungeon.playerPosition[1] * this.scale, this.scale, this.scale)
        //Show Enemy Positions
	this.ctx.fillStyle = "blue";
	for(var i = 0; i < Dungeon.enemyPositions.length; i++){
	  var x = Dungeon.enemyPositions[i].position[0];
	  var y = Dungeon.enemyPositions[i].position[1];
	　　this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
	//Show Weapon Positions
	this.ctx.fillStyle = "yellow";
	for(var i = 0; i < Dungeon.weaponPositions.length; i++){
	  var x = Dungeon.weaponPositions[i].position[0];
	  var y = Dungeon.weaponPositions[i].position[1];
	　　this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
	this.ctx.fillStyle = "green";
	for(var i = 0; i < Dungeon.healthPositions.length; i++){
	  var x = Dungeon.healthPositions[i].position[0];
	  var y = Dungeon.healthPositions[i].position[1];
	　　this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
	this.ctx.fillStyle = "white";
	var x = Dungeon.waypointPosition[0];
	var y = Dungeon.waypointPosition[1];
	this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
    }
};

var Helpers = {
    GetRandom: function (low, high) {
        return~~ (Math.random() * (high - low)) + low;
    }
};

