import {Store} from "$tool/commonMethod.js";

export default class FoodItem extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate() {
		return true;
	}
	componentDidMount() {
		var height = this.refs.item.offsetHeight;

		if(this.context.heightList.length > 0) {
			height += this.context.heightList[this.context.heightList.length - 1];
		}
		console.log(this.context.heightList);
		this.context.heightList.push(height);

	}
	render() {
		return (
			<div ref="item" className="food-item">
				<div className="food-menu">{this.props.name}</div>
				{
					this.props.children
				}
			</div>
		)
	}
}

FoodItem.contextTypes = {
	heightList: React.PropTypes.array
}