import React from "react";

function createCss(css){
	var style = document.createElement("style");
	style.textContent = `${css}`;
	document.body.appendChild(style);
}

createCss(`
.dot{
	position:absolute;
	border-radius:50%;
	backface-visibility:hidden;
}`);


function Point(radius){
	this.radius = radius || 50;
	this.angle = Math.floor(Math.random() * 360);
	this.speed = Math.round(Math.random() * radius / 10) + radius / 20;
	this.x = 0;
	this.y = 0;
	this._isOut = false;
	this._redirectValue = radius / 5;
}
Point.prototype.tick = function(){
	var dis = Math.sqrt(this.x*this.x + this.y*this.y);

	var rad = this.angle  * (Math.PI / 180);
	var speed = this.speed + dis/100;
	this.x += ~~speed * Math.cos(rad);
	this.y += ~~speed * Math.sin(rad);

	if(dis > this.radius){
		if(!this._isOut){
			this._redirectValue *= -1;
		}
		this._isOut = true;
		this.angle += this._redirectValue;
	} else {
		this._isOut = false;
	}
};
Point.prototype.getCords = function(gravity){
	var dis = Math.sqrt(this.x*this.x + this.y*this.y);
	var rad = this.angle  * (Math.PI / 180);
	var drag = dis * gravity;

	return {
		x: this.x - Math.round(drag * Math.cos(rad)),
		y: this.y - Math.round(drag * Math.sin(rad))
	}
};

class Reaction extends React.Component {

	componentWillMount(){
		this.renderLayer = this.renderLayer.bind(this);
		this.layers = [
			{ times:2.5, color: "#513B56"},
			{ times:2, color: "#525174"},
			{ times:1.5, color: "#348AA7"},
			{ times:1, color: "white"}
		];
		var size = this.props.size || 50;
		this.dots = new Array(50).join(',').split(',').map(function(){
			return new Point(size);
		});
		var css = '';
		this.layers.forEach(function(layer, index){
			css += `
			.dot${index}{
				width:${size * layer.times}px;
				height:${size * layer.times}px;
				box-shadow:0px 0px 20px 5px ${layer.color};
				background:${layer.color};
			}`;
		});
		createCss(css);
	}

	render(){
		return <div>
			{ this.layers.map(this.renderLayer) }
		</div>;
	}
	renderLayer(layer, index){
		var size = this.props.size || 100;
		return this.renderDots(this.dots, size * layer.times, index);
	}
	renderDots(list, size, groupId){
		return list.map(function(dot, index){
			var cords = dot.getCords(1);
			var halfSize = size / 2;
			var top = cords.y - halfSize;
			var left = cords.x - halfSize;
			return <div key={groupId+"-"+index} className={"dot dot" + groupId} style={{
				transform: `translate3d(${left}px, ${top}px, 0px)`
			}}></div>;
		})
	}
	componentDidMount(){
		this.animTimer = setInterval(this.updateDots.bind(this), 1000 / 16);
		this.updateDisplay();
	}
	componentDidUpdate(){
		this.updateDisplay();
	}
	componentWillUnmount(){
		cleatInterval(this.animTimer);
	}
	updateDots(){
		this.dots.map(function(dot){ dot.tick(); });
	}
	updateDisplay(){
		setTimeout(function(){
			requestAnimationFrame(function(){
				this.forceUpdate();
			}.bind(this));
		}.bind(this), 1000 / 16)
	}
}

export default Reaction;
