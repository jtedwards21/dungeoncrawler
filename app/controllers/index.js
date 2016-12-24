
var weapons = [{name: "dog", attack: 2}, {name: "brass knuckles", attack: 10}, {name: "pistol", attack: "20"}]

var Crawler = React.createClass({
  getInitialState() {
    return {
　　　　　　health: 100,
      level: 1,
      weapon: {name:"dog",attack:2},
      xp: 0,
      enemies: [],
      items: []
    };
  },
  componentDidMount(){
    this.generateMap();
  },
  generateMap(){
    Dungeon.Generate();
    Renderer.Initialize();
    Renderer.Update(Dungeon.map);
  },
  generateEnemies(){

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

var Enemy = React.createClass({
  getInitialState(){
    return {
	      level: 1,
	      health: 100
	   };
  },
  getAttackValue(){
    var minimum = Math.ceil(this.state.level * 4);
    var maximum = Math.floor(this.state.level * 5);
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  },
  render(){
    return (
	<div>
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
