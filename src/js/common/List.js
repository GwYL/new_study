import React from "react";

class List extends React.Component {
	render() {
		return (
			<div className="list">
				{this.props.children}
			</div>
		)
	}
}

export default List