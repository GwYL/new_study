import React from "react";

import ReactSwipe from "react-swipe";

import classNames from "classnames";

export default class HeaderIcon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0
		}
	}
	slideChange(index) {
		this.setState({
			index: index % 2
		})
	}
	render() {
		var me = this;
		var list = this.props.data;
		var new_list = [];

		var len = Math.ceil(list.length / 8);
		for(var i = 0; i < len; i++) {
			var arr = list.slice(0 + (i * 8), 8 + (i * 8));
			new_list.push(arr);
		}

		return (
			<div className="swipeWrap">
				<div className="upwrapper">
					<ReactSwipe 
						key={new_list.length}
						className="carousel"
						swipeOptions={{
							continuous: true,
							callback: this.slideChange.bind(this)
						}}>
						{
							new_list.map(function(value, index) {
								return (
									<div key={index} className="item-pane">
										<ul>
											{
												value.map(function(val, item) {
													var imgUrl = `//fuss10.elemecdn.com/${val.image_url}?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`;
													return (
														<li className="nav-info" key={item}>
															<div className="nav-img">
																<img src={imgUrl} />
															</div>
															<span>{val.title}</span>
														</li>
													)
												})
											}
										</ul>
									</div>
								)
							})
						}
					</ReactSwipe>
					<ul className="position">
						{
							new_list.map(function(val, index) {
								return (
									<li key={index} 
										className={
											classNames({
												dot: true,
												cur: me.state.index === index
											})}>

									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}