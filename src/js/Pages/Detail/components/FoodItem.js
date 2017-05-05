export default class FoodItem extends React.Component {
	shouldComponentUpdate() {
		return true;
	}
	componentDidMount() {
		var height = this.refs.item.offsetHeight;

		if(this.context.heightList.length > 0) {
			height += this.context.heightList[this.context.heightList.length - 1];
		}

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