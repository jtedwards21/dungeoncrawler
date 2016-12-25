
var weapons = [{name: "dog", attack: 2}, {name: "brass knuckles", attack: 10}, {name: "pistol", attack: "20"}]

function WeaponItem(weapon, position, id) {
  this.weapon = weapon;
  this.position = position; 
  this.itemType = "weapon";
  this.id = id;
  
};

function HealthItem(value, position, id)　{
  this.value = value;
  this.position = position;
  this.itemType = "health";
  this.id = id;
};

function Enemy (level, position, id) {
  this.id = id;
  this.position = position;
  this.health = 100;
  this.level = level;
  this.getAttackValue = function(){
    var minimum = Math.ceil(this.level * 4);
    var maximum = Math.floor(this.level * 5);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  };
}

var Crawler = React.createClass({
  getInitialState() {
    return {
　　　　　　health: 100,
      level: 1,
      weapon: {name:"dog",attack:20},
      xp: 0,
      enemies: [],
      weaponItems: [],
      healthItems:[],
      position:[7,7],
      lightOn: false,
      lightRadius: 5,
      numberOfEnemies: 3,
      numberOfHealthItems: 3,
      numberOfWeaponItems: 2,
      message : ""
    };
  },
  setLightRadius(newRadius){
    this.setState({lightRadius: newRadius});
    Dungeon.lightRadius = newRadius;
  },
  toggleLights(){
    switch(this.state.lightOn){
      case true:
	this.setState({lightOn: false});
	Dungeon.lightOn = false;
	Renderer.Update(Dungeon.map);
	break;
      case false:
	this.setState({lightOn: true});
	Dungeon.lightOn = true;
	Renderer.Update(Dungeon.map);
	break;
    }
  },
  componentDidMount(){
    this.generateMap();
    $("body").on('keydown', this.handleKeyDown);
  },
  generateMap(){
    Dungeon.Generate();
    Renderer.Initialize();
    //Get Player
    var playerPosition = Dungeon.PlacePlayer();
    this.setState({position: playerPosition});
    this.generateEnemies();
    this.generateWeaponItems();
    this.generateHealthItems();
    Renderer.Update(Dungeon.map);
  },
  generateEnemies(){
    var enemies = this.state.enemies;
    var minimum = Math.ceil(this.state.level);
    var maximum = Math.floor(this.state.level * 3);
    var level =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    for(var i = 0; i < this.state.numberOfEnemies; i++){
      enemies = enemies.slice();
      var level =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var position = Dungeon.PlaceEnemy(i);
      var id = i;
      var e = new Enemy(level, position, id);
　　　　　　enemies.push(e);
    }
    this.setState({enemies:enemies});
  },
  generateWeaponItems(){
    var items = this.state.weaponItems;

    //Generate Weapons
    var minimum = Math.ceil(0);
    var maximum = Math.floor(weapons.length);
    for(var i = 0; i < this.state.numberOfWeaponItems;i++){
      var n =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      items = items.slice();
      var position = Dungeon.PlaceWeapon(i);
      var id = i;
      var w = new WeaponItem(weapons[n], position, id);
      console.log(w);
      items.push(w);
    }
    this.setState({weaponItems: items});
  },
  generateHealthItems(){
    var items = this.state.healthItems;
    //Generate Health Items
    var minimum = Math.ceil(1);
    var maximum = Math.floor(100);
    for(var i = 0; i < this.state.numberOfHealthItems;i++){
      var value =  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      items = items.slice();
      var position = Dungeon.PlaceHealth(i);
      var id = i;
      var h = new HealthItem(value, position, id);
      items.push(h);
    }
    this.setState({healthItems: items});
  },
  changeWeapon(name){
    var weapon = {};
    for(var i = 0;i < weapons.length;i++){
	if(weapons[i].name == name){weapon = weapons[i]}
    }
    this.setState({weapon:weapon});
  },
　　changeHealth(changeValue){
    var health = this.state.health;
    this.setState({health: health + changeValue});
  },
  changeXp(changeValue){
    var Xp = this.state.xp;
    var level = this.state.level;
    Xp = xp + changeValue;
    this.setState({xp:Xp%100, level: level+(Math.floor(Xp/100))})
  },
  refreshDungeon(){ 
    Dungeon.playerPosition = this.state.position;
    Renderer.Update(Dungeon.map);
  },
  killEnemy(id){
    var index;
    var enemyPositions = this.state.enemies;
    for(var i = 0; i < enemyPositions.length; i++){
      if(enemyPositions[i].id == id){
	index = i;
      }
    }
    console.log(index);
    var newPositions = enemyPositions.slice(0,index);
    var tail = enemyPositions.slice(index + 1);
    newPositions = newPositions.concat(tail);
    Dungeon.RemoveEnemy(id);
    this.setState({enemies: newPositions, message: "You killed an enemy!"});
  },
  killPlayer(){
    console.log('You Died.');
  },
  movePlayer(coord){
    var position = this.state.position;
    var newPosition = [coord[0] + position[0],coord[1] + position[1]];
    var isWall = Dungeon.IsWall(newPosition);
    var isEnemy = Dungeon.IsEnemy(newPosition);
    var isWeapon = Dungeon.IsWeapon(newPosition);
    var isHealth = Dungeon.IsHealth(newPosition);
    switch(isWall){
	case true:
	  break;
	case false:
	  //Later I need to make sure you can't walk through enemies
	  if(isEnemy !== false){
		console.log('enemy!');
		var health = this.state.health;
		var playerAttack = this.state.weapon.attack * this.state.level;
		var enemy;
		for(var i = 0; i < this.state.enemies.length; i++){
		  if(this.state.enemies[i].id == isEnemy){enemy = this.state.enemies[i]}
		}
		enemy.health = enemy.health - playerAttack;
		health = health - enemy.getAttackValue();
		if(health <= 0){this.killPlayer();}
		if(enemy.health <= 0){this.killEnemy(enemy.id)}
		this.setState({health:health});
	  }
	  else if (isWeapon !== false){
		console.log('weapon!');
		var weapon;
		for(var i = 0; i < this.state.weaponItems.length; i++){
		  if(this.state.weaponItems[i].id == isWeapon){weapon = this.state.weaponItems[i]}
		}
		Dungeon.RemoveWeapon(weapon.id);
		this.setState({weapon:weapon.weapon});
		}
	  else if (isHealth !== false){
		console.log('health!')
		var health;
		for(var i = 0; i < this.state.healthItems.length; i++){
		  if(this.state.healthItems[i].id == isHealth){health = this.state.healthItems[i]}
		}
		Dungeon.RemoveHealth(health.id);
		this.setState({health:health.value});
		};
          this.setState({position:newPosition});
	  this.refreshDungeon();
    }
  },
  handleKeyDown(e){
    switch(e.originalEvent.key){
      case "ArrowRight":
	this.movePlayer([1,0]);
	break;
      case "ArrowLeft":
	this.movePlayer([-1,0]);
	break;
      case "ArrowUp":
	this.movePlayer([0,-1]);
	break;
      case "ArrowDown":
	this.movePlayer([0,1]);
	break;
    }
  },
  resetGame(){
    this.generateMap();
  },
  render(){
    var infoBox = <InfoBox enemies={this.state.enemies} weapon={this.state.weapon} level={this.state.level} health={this.state.health} xp={this.state.xp} message={this.state.message} />
    var buttonContainer = <ButtonContainer toggleLights={this.toggleLights} resetGame={this.resetGame} />
　　　　return(
	<div id="box">
	  <div id="inner-box">
	    <canvas id="canvas"></canvas>
	    {infoBox}
            {buttonContainer}
	  </div>
	</div>
      
    )
  }
})

var ButtonContainer = React.createClass({
  getInitialState(){
    return {};
  },
　　render(){
    return (
      <div id="button-container">
	<div onClick={this.props.toggleLights} className="btn">Lights</div>
	<div onClick={this.props.resetGame} className="btn">Reset</div>
	<div className="btn">Width</div>
	<div className="btn">Height</div>
      </div>
    )
  }
})


var InfoBox = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    var enemies = this.props.enemies.map(function(e){
      return <EnemyDisplay id={e.id} health={e.health} level={e.level} />
    });
    var message = [];
    if(this.props.message){message = <Message message={this.props.message} />}
    return(
      <div id="info-box">
        <div id="player-stats">
	  <div>Weapon: {this.props.weapon.name}</div>
	  <div>Attack: {this.props.weapon.attack}</div>
	  <div>Level: {this.props.level}</div>
	  <div>Health: {this.props.health}</div>
	  <div>XP: {this.props.xp}</div>
	<div id="enemy-stats">{enemies}</div>
	<div id="message">{message}</div>
        </div>
      </div>
    )
  }
})

var Message = React.createClass({
  getInitialState(){
    return {}
  },
  render(){
    return (
      <p>{this.props.message}</p>
    )
  }
})

var EnemyDisplay = React.createClass({
  getInitialState(){
    return{}
  },
  render(){
    return (
	<div className="enemy">
	  <div>Id: {this.props.id}</div>
	  <div>Health: {this.props.health}</div>
	  <div>Level: {this.props.level}</div>
	</div>
    )
  }
})


ReactDOM.render(
  <Crawler  />,
  document.getElementById('container')
)
