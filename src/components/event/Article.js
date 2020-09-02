import React from "react";
import {HashRouter as Router, Route, Link} from "react-router-dom";
import $ from "jquery";

/*const EventArticle = ({ match }) => {
	return(
		<div>
			<h1>Event Article！</h1>
			<h2>Page ID：{match.params.id}</h2>
		</div>
	)
}*/

class EventArticle extends React.Component{
	constructor(props){
		super(props);
		this.state = {articleData: ""};
	}
	componentDidMount(){
		let thePath = this.props.location.pathname;
		let p = thePath.lastIndexOf("/")+1;
		let s = thePath.slice(p);
		let url = "https://ir.fullerton.com.tw/api/event/"+s;
		this.serverRequest = $.get(url, function(d) {
			this.setState({articleData: d});
		}.bind(this), "jsonp");
	}
	render(){
		//const { match, location, history } = this.props;
		//const articleId = match.params.id;
		//const thePath = this.props.location.pathname;
		let DATA = this.state.articleData;
		let TIME = new Date(DATA.news_date);
		let y = TIME.getFullYear();
		let m = ((TIME.getMonth()+1).toString().length == 1) ? "0"+(TIME.getMonth()+1) : TIME.getMonth()+1;
		let d = TIME.getDate();
		return (
			<div className="EventArticle">
				{DATA &&
					<div>
						<div className="kv">
							<div className="kvWrap" style={{backgroundImage:`url(${DATA.img1}`}}>
								<span>EVENT</span>
							</div>
						</div>
						<div className="content">
							<h1>
								<div className="time">{y+"."+m+"."+d}</div>
								<div className="title">{DATA.subject}</div>
							</h1>
							<h2>{DATA.short_descript}</h2>
							<div className="contentWrap" dangerouslySetInnerHTML={{__html: DATA.content}} />
						</div>
					</div>
				}
			</div>
		);
	}
}

export default EventArticle;
