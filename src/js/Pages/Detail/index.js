import NavList from "./components/NavList.js";
import FoodList from "./components/FoodList.js";
import CartView from "./components/CartView.js";
import PriceBar from "./components/PriceBar.js";
import SplitPane from "./components/SplitPane.js";
import {Store, EventEmmit} from "$tool/commonMethod.js";

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			shopId: this.props.params.shopId,
			toggle: false
		}
	}
	getChildContext() {
		return {
			heightList: [],
			shopId: this.state.showId
		}
	}
	componentDidMount() {

		var model = new EventEmmit();
		var me = this;

		model.register("getFoodList", function(data) {
			me.setState({
				list: data
			})
		})

		model.register("changeListByItem", function(item) {
			var t = me.state.list;
			for (var i = 0, len = t.length; i < len; i++) {
				for (var j = 0, l = t[i].foods.length; j < l; j++) {
					if (t[i].foods[j].item_id === item.item_id) {
						t[i].foods[j].num = item.num;
					}
				}
			}
			me.setState({
				list: t
			})
		})

		model.register("showCartView", function(flag) {
			me.setState({
				toggle: flag || !me.state.toggle
			})
		})

		var url = `https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=${this.props.params.shopId}`;

		fetch(url).then(function(res) {
			return res.json()
		}).then(function(data) {
			var cartViewList = Store(me.state.shopId);
			for (var i = 0, len = data.length; i < len; i++) {
				for (var j = 0, l = data[i].foods.length; j < l; j++) {
					for (var key in cartViewList) {
						if (cartViewList[key].item_id === data[i].foods[j].item_id) {
							data[i].foods[j].num = cartViewList[key].num;
						}
					}
				}
			}
			me.setState({
				list: data
			})
		})

	}
	render() {
		var cartViewList = Store(this.state.shopId) || {};
		for (var i = 0, len = this.state.list.length; i < len; i++) {
			for (var j = 0, l = this.state.list[i].foods.length; j < l; j++) {
				if (this.state.list[i].foods[j].num > 0) {
					cartViewList[this.state.list[i].foods[j].item_id] = this.state.list[i].foods[j];
				}
			}
		}
		Store(this.state.shopId, cartViewList);
		return (
			<div id="detail">
				<div className="detail-header">
					<h1>商品详情页面</h1>
				</div>
				<div className="goods-rating">
					<div>商品</div>
					<div>评价</div>
				</div>

				<SplitPane 
				left={<NavList data={this.state.list} shopid={this.props.params.shopId} />} 
				right={<FoodList data={this.state.list} />}>
				</SplitPane>
				
				<div className="detail-footer">
					<CartView show={this.state.toggle} data={cartViewList}></CartView>
					<PriceBar data={cartViewList}></PriceBar>
					<div className="pay">去结算</div>
				</div>
			</div>
		)
	}
}

Detail.childContextTypes = {
	heightList: React.PropTypes.array,
	shopId: React.PropTypes.number
}

export default Detail