
var weapons = [{name: "dog", attack: 2}, {name: "brass knuckles", attack: 10}, {name: "pistol", attack: "20"}]

var Crawler = React.createClass({
  getInitialState() {
    return {
　　　　　　health: 100,
      level: 1,
      weapon: {name:"dog",attack:2},
      xp: 0
    };
  },
  changeWeapon(name){
    var weapon = {};
    for(var i = 0;i < weapons.length;i++){
	if(weapons[i].name == name){weapon = weapons[i]}
    }
    this.setState({weapon:weapon});
  },
  render(){
　　　　return(
　　　　　　<h1>
	Hello World
      </h1>
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
