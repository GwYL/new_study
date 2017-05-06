export default class PriceBar extends React.Component {
	render() {
		var sum = 0;
		for (var key in this.props.data) {
			sum += this.props.data[key].num * this.props.data[key].specfoods[0].price;
		}
		return (
			<div className="total-price">总价： ￥{sum}</div>
		)
	}
}
