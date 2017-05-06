import {EventEmmit} from "$tool/commonMethod.js";
import SingleCart from "./SingleCart.js";

var model = new EventEmmit();

export default class CartView extends React.Component {
	hide() {
		console.log("in handle");
		model.dispatch("showCartView", false);
	}
	handle() {
		console.log("in toggle");
		model.dispatch("showCartView");
	}
	render() {
		var list = [];
		var flag = this.props.show ? "block" : "none";
		for (var key in this.props.data) {
			list.push(this.props.data[key]);
		}
		return (	
			<div className="cart-info">
				<div onClick={this.handle} className="cart">
					<span><i className="iconfont icon-cart-active"></i></span>
				</div>
				<div className="cart-view" style={{display: flag}}>
					<div onClick={this.hide} className="cart-layer"></div>
					<div className="cart-title">
						<p>购物车</p>
						<span className="clear">清空</span>
					</div>
					<ul className="cart-list">
						{
							list.map(function(value, index) {
								return (
									<SingleCart item={value} key={index}></SingleCart>
								)
							})
						}
					</ul>
					<div className="food-box">
						<p>餐盒</p>
						<p>￥<span>5</span></p>
					</div>
				</div>
			</div>
		)
	}
}