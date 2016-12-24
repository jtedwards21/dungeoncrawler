
var weapons = [{name: "dog", attack: 2}, {name: "brass knuckles", attack: 10}, {name: "pistol", attack: "20"}]


function Enemy (level) {
  this.health = 100;
  this.level = level;
  this.getAttackValue(){
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
      items: [],
      position:[7,7],
      lightOn: false,
      lightRadius: 5,
      numberOfEnemies: 3,
      numberOfHealthItems: 3,
      numberOfWeapons:1
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
      var e = new Enemy(level);
　　　　　　enemies.push(e);
    }
    this.setState({enemies:enemies});
  },
  generateItems(){

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

var WeaponItem = React.createClass({
  getInitialState(){
    return {
	name: this.props.name,
	attack: this.props.attack
    };
  },
  render(){
    return (
      <div></div>
    )
  }
})

var HealthItem = React.createClass({
  getInitialState(){
    return {
	value: this.props.value
    };
  },
  render(){
    return (
	<div></div>
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
