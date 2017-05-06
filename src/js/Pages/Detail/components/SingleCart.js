import {Store, EventEmmit} from "$tool/commonMethod.js";

var model = new EventEmmit();

export default class SingleCart extends React.Component {
	minus() {
		if (this.props.item.num <= 0) {
			return;
		}
		this.props.item.num--;
		model.dispatch("changeListByItem", this.props.item)
	}
	plus() {
		this.props.item.num++;
		model.dispatch("changeListByItem", this.props.item)
	}
	render() {
		if(this.props.type === "normal") {
			return(
				<div className="food-info">
					<div className="food-img">
						<img src="" alt="物品图片" />
					</div>
					<div className="food-detail">
						<div className="food-name">
							珍珠奶茶
						</div>
						<div className="des">
							好喝上瘾
						</div>
						<div className="food-sales">
							月售200份 好评率98%
						</div>
						<div className="food-price">
							<span className="price-item">
							￥20</span>
							<span onClick={this.minus.bind(this)} className="minus">-</span>
							<span className="num">{this.props.item.num}</span>
							<span onClick={this.plus.bind(this)} className="plus">+</span>
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<li className="cart-info">
					<p>{this.props.item.name}</p>
					<p>￥{this.props.item.specfoods[0].price}</p>
					<p>
						<span onClick={this.minus.bind(this)} className="minus">-</span>
						<span className="num">{this.props.item.num}</span>
						<span onClick={this.plus.bind(this)} className="plus">+</span>
					</p>
				</li>
			)
		}		
	}
}

SingleCart.contextTypes = {
	shopId: React.PropTypes.number
}