import React from "react";

import {browserHistory} from "react-router";

class SearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.keyword || ""
		}
	}
	componentDidMount() {
		if (this.props.type === "jump")
			return;
		// this.getData();
	}
	edit(event) {
		this.setState({
			text: event.target.value
		})
	}
	getData() {
		var me = this;
		var url = "";

		if(this.props.type === "address") {
			url = this.props.url + "?keyword=" + this.state.text + "&offset=0&limit=20";
		} else if (this.props.type === "search") {
			url = this.props.url + `?latitude=${this.props.lat}&longitude=${this.props.lng}&keyword=${this.state.text}&offset=0&search_item_type=2&limit=20&extras[]=activities`;
		} else if (this.props.type === "jump") {
			var keyword = encodeURI(this.state.text);

			var path = `/search/${keyword}`;

			browserHistory.push(path);

			return;
		}
		// var url = 'https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby?keyword='+ this.state.text +'&offset=0&limit=20';
		fetch(url).then(function(res) {
					return res.json();
				})
				.then(function(data) {
					console.log(data);
					me.props.onSearch(data)
				})
	}
	submit(event) {
		event.preventDefault();
		this.getData();
	}
	render() {
		return (
			<div className="search-item has-header">
				<form onSubmit={this.submit.bind(this)}>
					<label className="item item-input">
						<input type="text" placeholder={this.props.children} onChange={this.edit.bind(this)} value={this.state.text} />
					</label>
				</form>
			</div>
		)
	}
}

export default SearchBox