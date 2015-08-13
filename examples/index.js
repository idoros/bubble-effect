import React from 'react';
import Reaction from 'reaction';

//var Exmp = React.createClass({
//	getInitialState: function(){
//		return {
//			examples: {
//				TodoMVC: TodoMVC,
//				ObjectTree: ObjectTree,
//				OutsideState:OutsideState,
//				emptyPlugin: emptyPlugin,
//				multipleClasses: multipleClasses,
//				animations:animations
//			},
//			example: load('example') || DEFAULT_EXAMPLE
//		};
//	},
//	onExampleChange: function(evt){
//		if(evt.target.value !== this.state.example){
//			save('example',evt.target.value);
//			this.setState({
//				example: evt.target.value
//			});
//		}
//	},
//	render: function(){
//
//		var Example = this.state.examples[this.state.example] || this.state.examples[DEFAULT_EXAMPLE];
//
//		var options = Object.keys(this.state.examples).map(function(key){
//			return <option value={key}>{key}</option>
//		});
//
//		return <div>
//			<select value={this.state.example} style={{display:'block'}} onChange={this.onExampleChange}>
//				{options}
//			</select>
//			<Example stylorama={updateCss} />
//		</div>
//
//	}
//})

// render example
var wrapper = document.createElement("div");
document.body.appendChild(wrapper);
React.render(<div style={{position:"absolute", left:"50%", top:"50%"}}>
	<Reaction size={100}/>
</div>, wrapper);