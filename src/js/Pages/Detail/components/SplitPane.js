import ReactIScroll from "react-iscroll";

import iScroll from "iscroll/build/iscroll-probe";

import {EventEmmit} from "$tool/commonMethod.js";

var model = new EventEmmit();

export default class SplitPane extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0
		}
	}
	scrollRight(height) {
		height = - height;
		this.refs.rightPaneScroll.withIScroll(function(iScroll) {
			iScroll.scrollTo(0, height, 500);
		})
	}
	onRefresh(iScrollInstance) {
		var yScroll = iScrollInstance.y;

		if (this.state.y !== yScroll) {
			this.setState({
				y: yScroll
			})
		}
	}
	onScroll(iScrollInstance) {
		var offset = Math.abs(iScrollInstance.y);

		for (var i = 0, len = this.context.heightList.length; i < len; i++) {
			if(offset < this.context.heightList[i]) {
				model.dispatch("changeCurIndex", i);
				break;
			}
		}
	}
	render() {		
		var options = {
			mouseWheel: true,
			scrollbars: true,
			bounce: false,
			probeType: 2								
		}
		return (
			<div className="detail-wrapper">
				<ReactIScroll className="left-nav" iScroll={iScroll} options={options}>
					{
						this.props.left && React.cloneElement(this.props.left, {onJump: this.scrollRight.bind(this)})
					}
				</ReactIScroll>
				<ReactIScroll className="right-info" ref="rightPaneScroll" onScroll={this.onScroll.bind(this)} iScroll={iScroll} options={options}>
					{
						this.props.right
					}
				</ReactIScroll>
			</div>
		)
	}
}

SplitPane.contextTypes = {
	heightList: React.PropTypes.array
}