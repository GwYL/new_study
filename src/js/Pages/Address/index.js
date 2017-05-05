import React from "react";

import SearchBox from "~/src/js/common/SearchBox.js";
import List from "~/src/js/common/List.js";
import ItemLi from "~/src/js/common/ItemLi.js";

import {Link} from "react-router";

class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}
	changeList(data) {
		this.setState({
			list: data
		})
	}
	render() {
		var url = "https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby";
		var me = this;
		return (
			<div id="addr">
				<div id="addr_header" className="bar bar-header bar-light">
					<span className="addr-back">&lt;</span>
					<h1 className="title">选择地址</h1>
					<SearchBox type="address" url={url} onSearch={this.changeList.bind(this)}>请输入地址</SearchBox>
				</div>
				<content className="has-header has-subheader">
					<List>
						{
							this.state.list.map(function(val, index) {
								var link = `/rlist/${val.geohash}`;

								return (
									<ItemLi 
										key={index}
										lat={val.latitude}
										lng={val.longitude}>

										<Link to={link}>
											{val.name}
										</Link>
										<p>{val.address}</p>
									</ItemLi> 
								)
							})
						}
					</List>
				</content>
			</div>
		)
	}
}

export default Address