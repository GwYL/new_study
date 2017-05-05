import {EventEmmit} from "$tool/commonMethod.js";
import SingleCart from "./SingleCart.js";

export default class CartView extends React.Component {
	render() {
		var list = [];

		for (var key in this.props.data) {
			
		}
		return (
			<div class="cart-view">
				<div class="cart-layer"></div>
				<div class="cart-title">
					<p>购物车</p>
					<span class="clear">清空</span>
				</div>
				<ul class="cart-list">
					{
						list.map(function(value, index) {
							return (
								<SingleCart item={value} key={index}></SingleCart>
							)
						})
					}
				</ul>
				<div class="food-box">
					<p>餐盒</p>
					<p>￥<span>5</span></p>
				</div>
			</div>
		)
	}
}