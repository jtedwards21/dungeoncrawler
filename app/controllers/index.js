
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
      weapon: {name:"dog",attack:2},
      xp: 0,
      enemies: [],
      weaponItems: [],
      healthItems:[],
      position:[7,7],
      lightOn: false,
      lightRadius: 5,
      numberOfEnemies: 3,
      numberOfHealthItems: 3,
      numberOfWeaponItems: 2
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
	break;
      case false:
	this.setState({lightOn: true});
	Dungeon.lightOn = true;
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
      var h = new HealthItem(value);
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
  movePlayer(coord){
    var position = this.state.position;
    var newPosition = [coord[0] + position[0],coord[1] + position[1]];
    var isWall = Dungeon.IsWall(newPosition);
    
    switch(isWall){
	case true:
	  break;
	case false:
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
  render(){
　　　　return(
	<div className="box">
	  <canvas id="canvas"></canvas>
	</div>
      
    )
  }
})




var InfoBox = React.createClass({
  getInitialState(){
    return {};
  },
  render(){
    return(
      <div>
	{this.props.weapon.name}
	{this.props.weapon.attack}
	{this.props.level}
	{this.props.health}
	{this.props.xp}
      </div>
    )
  }
})


ReactDOM.render(
  <Crawler  />,
  document.getElementById('container')
)
