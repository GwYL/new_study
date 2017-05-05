import {EventEmmit} from "$tool/commonMethod.js";
import classNames from "classnames";
var model = new EventEmmit();

export default class NavList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curIndex: 0
		}
	}
	componentDidMount() {
		
		var detail_url = `https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=${this.props.shopid}`;

		model.register("changeCurIndex", function(index) {
			me.setState({
				curIndex: index
			})
		})

		fetch(detail_url).then(function(res) {
							return res.json();
						}).then(function(data) {
							console.log(data);
							model.dispatch("getFoodList", data)
						})
	}
	handle(index) {
		this.setState({
			curIndex: index
		})

		var curIndex = index - 1;

		var offsetHeight = this.context.heightList[curIndex];
		
		if(curIndex === -1) {
			offsetHeight = 0;
		}

		this.props.onJump(offsetHeight);
	}
	render() {
		var me = this;
		return (
			<ul className="nav-list">
				{
					this.props.data.map(function(value, index) {
						return (
							<li className={classNames({active: me.state.curIndex === index})} onClick={me.handle.bind(me, index)} key={index}>
								{value.name}
							</li>
						)
					})
				}
			</ul>
		)
	}
}

NavList.contextTypes = {
	heightList: React.PropTypes.array
}