import React from "react";

import SearchBox from "~/src/js/common/SearchBox.js";

import {Store} from "~/src/js/tool/commonMethod.js";

import {browserHistory, Link} from "react-router";

import List from "~/src/js/common/List.js";

import ItemLi from "~/src/js/common/ItemLi.js";

import ReactSwipe from "react-swipe";

import HeaderIcon from "./component/headerIcon.js";

import ReactIScroll from "react-iscroll";

import iScroll from "iscroll/build/iscroll-probe";


class Rlist extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			iconList: []
		}
	}
	componentDidMount() {

		var me = this;
		var url = `/v2/index_entry?geohash=${this.props.params.geohash}&group_type=1&flags[]=F`;

		fetch(url).then(function(res) {
					return res.json();
				}).then(function(data) {
					console.log(data);
					me.setState({
						iconList: data
					})
				})

		// 商家列表搜索
		var loc = Store("curLoc");
		if(!loc) {
			alert("请搜索地址");
			browserHistory.push("/"); // js控制路由跳转
		}
		var url = `https://mainsite-restapi.ele.me/shopping/restaurants?latitude=${loc.lat}&longitude=${loc.lng}&offset=0&limit=20&extras[]=activities&terminal=h5`;

		fetch(url).then(function(res) {
					return res.json();
				}).then(function(data) {
					me.setState({
						list: data
					})
				})
	}
	render() {
		var options = {
			mouseWheel: true,
			scrollbars: true,
			bounce: false,
			probeType: 2								
		}
		return (
			<div id="rList">
				<div className="bar bar-header bar-light">
					<img src="/src/imgs/location.png" />
					<h1 className="title"><span>商家列表页面</span></h1>
				</div>
				<SearchBox type="jump"></SearchBox>
				<HeaderIcon data={this.state.iconList}></HeaderIcon>
				<ReactIScroll iScroll={iScroll} options={options}>
					<div>
						<List>
							{
								this.state.list.map(function(val, index) {					
										var link = `/detail/${val.id}`;
										return (
											<ItemLi
												type="rlist"
												key={index}
												lat={val.latitude}
												lng={val.longitude}>
												<Link to={link}>{val.name}</Link>
											</ItemLi>
										)
								})
							}
						</List>
					</div>
				</ReactIScroll>
			</div>
		)
	}
}

export default Rlist