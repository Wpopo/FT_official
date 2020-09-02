import React from "react";
import $ from "jquery";
import isMobile from "ismobilejs";

class Investor extends React.Component{
	constructor(props){
		super(props);
		this.state = {newsData: ""};
	}
	componentDidMount(){
		let url = "http://ir.fullerton.com.tw/api/news/5";
		this.serverRequest = $.get(url, function(d) {
			this.setState({newsData: d});

			$(".itemTitle").click(function(){
				if(!$(this).is(".active")){
					$(".itemTitle").removeClass("active");
				}
				$(this).toggleClass("active");
			});
		}.bind(this), "jsonp");
	}
	render(){
		let newsList = [];
		let newsData = this.state.newsData;
		{
			newsData && newsData.forEach((v, i) => {
				let dt = new Date(v.news_date);
				newsList.push(
					<div className="item" key={v.id}>
						{/*<div className={(i == 0) ? "itemTitle active" : "itemTitle"}>*/}
						<div className="itemTitle">
							<span className="time">{dt.getFullYear()+"."+(dt.getMonth()+1)+"."+dt.getDate()}</span>
							<span className="subject">{v.subject}</span>
							{v.filename && <a className="pdf" href={v.filename}>PDF</a>}
						</div>
						<div className="itemDesp">
							<div className="despWrap" dangerouslySetInnerHTML={{__html: v.content}} />
						</div>
					</div>
				);
			});
		}
		return (
			<div className={(isMobile.any) ? "Investor m" : "Investor"}>
				<div className="wrap">
					<div className="title">
						<span>NEWS</span>
						<a href="http://ir.fullerton.com.tw/news" target="_blank">View all</a>
					</div>
					<div className="newsList">
						{newsList}
					</div>
				</div>
			</div>
		);
	}
}

export default Investor;