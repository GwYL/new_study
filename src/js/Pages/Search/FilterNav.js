import React from "react";

export default class FilterNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: ""
		}
	}
	change(event) {
		var me = this;
		this.setState({
			status: event.target.value
		}, function() {
			me.props.onFilter(this.state.status)
		})
	}
	render() {
		return (
			<div className="nav-item">
				<select onChange={this.change.bind(this)} value={this.state.status}>
					<option value="">排序</option>
					<option value="distance">距离最近</option>
					<option value="recent_order_num">销量最高</option>
					<option value="price">起送价最低</option>
					<option value="order_lead_time">配送速度最快</option>
					<option value="rating">评分最高</option>
				</select>
			</div>
		)
	}
}