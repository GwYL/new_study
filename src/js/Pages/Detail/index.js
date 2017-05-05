import NavList from "./components/NavList.js";
import FoodList from "./components/FoodList.js";
import CartView from "./components/CartView.js";
import PriceBar from "./components/PriceBar.js";
import SplitPane from "./components/SplitPane.js";
import {EventEmmit} from "$tool/commonMethod.js";

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

		var url = `https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=${this.props.params.shopId}`;

		fetch(url).then(function(res) {
			return res.json()
		}).then(function(data) {
			var cartViewList = Store(me.state.shopId);
			me.setState({
				// list: data
			})
		})

	}
	render() {
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
					<CartView data={cartViewList}></CartView>
					<PriceBar data={cartViewList}></PriceBar>
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