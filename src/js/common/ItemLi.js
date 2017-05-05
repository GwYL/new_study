import React from "react";

import {Store} from "~/src/js/tool/commonMethod.js";

class ItemLi extends React.Component {
	updateLoc() {
		var lat = this.props.lat;
		var lng = this.props.lng;
		console.log(lat);
		console.log(lng);

		if(this.props.type === "rlist") {
			Store("curDetail", {
				lat: lat,
				lng: lng
			})
		} else {
			console.log("in address");
			Store("curLoc", {
				lat: lat,
				lng: lng
			})
		}

	}
	render() {
		return (
			<li onClick={this.updateLoc.bind(this)} className="item">{this.props.children}</li>
		)
	}
}

export default ItemLi