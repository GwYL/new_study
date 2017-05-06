import SingleCart from "./SingleCart.js";
import FoodItem from "./FoodItem.js";

export default class FoodList extends React.Component {
	render() {
		return (
			<div className="food-list">
				{
					this.props.data.map(function(value, index) {
						return (
							<FoodItem key={index} name={value.name}>
								{
									value.foods.map(function(val, item) {
										if (!val.num) {
											val.num = 0;
										}
										return (
											<SingleCart type="normal" item={val} key={item}></SingleCart>
										)
									})
								}
							</FoodItem>
						)
					})
				}
			</div>
		)
	}
}
