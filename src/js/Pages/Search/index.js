import React from "react";

import SearchBox from "~/src/js/common/SearchBox.js";

import List from "~/src/js/common/List.js";

import ItemLi from "~/src/js/common/ItemLi.js";

import {Link} from "react-router";
import {Store} from "~/src/js/tool/commonMethod.js";

import FilterNav from "./FilterNav.js";

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}
	search(data) {
		var t = [];
		for (var key in data) {
			t.push(...data[key].restaurant_with_foods)
		}
		console.log('商家数据:', t);
		this.setState({
			list: t
		})
	}
	changeList(filterType) {
		var list = this.state.list;
		console.log(filterType);

		var t = list.sort(function(a, b) {
			if ((filterType === "distance") || (filterType === "price")){
				return a.restaurant[filterType] - b.restaurant[filterType]
			}
			return b.restaurant[filterType] - a.restaurant[filterType]
		})
		this.setState({
			list: t
		})
	}
	render() {
		var search_url = "https://mainsite-restapi.ele.me/shopping/v1/restaurants/search";

		let {lat, lng} = Store("curLoc");
		return (
			<div>
				<SearchBox
					type="search"
					url={search_url}
					lat={lat}
					lng={lng}
					onSearch={this.search.bind(this)}
					keyword={this.props.params.keyword}
					>
				</SearchBox>
				<FilterNav onFilter={this.changeList.bind(this)}></FilterNav>
				<List>
					{
						this.state.list.map(function(value, index) {
							var item = value.restaurant;
							var link = `/detail/item.id`;
							return (
								<ItemLi key={index} type="rlist"
										lat={item.latitude}
										lng={item.longitude}>
									<div className="desc">
										<Link to={link}>
											{item.name}</Link>
										<p>距离{item.distance}</p>
										<p>销量{item.recent_order_num}</p>
										<p>评分{item.rating}</p>
									</div>
								</ItemLi>
							)
						})
					}
				</List>
			</div>
		)
	}
}