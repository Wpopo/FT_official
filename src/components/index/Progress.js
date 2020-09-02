import React from "react";
import Slider from "react-slick";
import ezDing from "../../plugin/toolbox";

const ProgressData = [
	{
		"id": "1",
		"year": "1992",
		"capital": "0.03",
		"capitalUnit": "億",
		"title": "創立",
		"content": ""
	},
	{
		"id": "2",
		"year": "1995",
		"capital": "0.33",
		"capitalUnit": "億",
		"title": "軟體事業部",
		"content": "經營國內軟體通路"
	},
	{
		"id": "3",
		"year": "1998",
		"capital": "4.43",
		"capitalUnit": "億",
		"title": "半導體事業部",
		"content": "從事代理經銷業務"
	},
	{
		"id": "4",
		"year": "2000",
		"capital": "14.48",
		"capitalUnit": "億",
		"title": "國際化",
		"content": "成立電子商務事業部，結合半導體通路、軟體通路及Internet技術，經營國際市場。"
	},
	{
		"id": "5",
		"year": "2002",
		"capital": "",
		"capitalUnit": "",
		"title": "股票上櫃",
		"content": "證券櫃買中心上櫃"
	},
	{
		"id": "6",
		"year": "2003",
		"capital": "imagemore",
		"capitalUnit": "",
		"title": "富爾特數位影像",
		"content": "成立富爾特數位影像"
	},
	{
		"id": "7",
		"year": "2003",
		"capital": "82.12",
		"capitalUnit": "億",
		"title": "掛牌上市",
		"content": "2003年8月25日轉至台灣證券交易所上市"
	},
	{
		"id": "8",
		"year": "2005",
		"capital": "wpg",
		"capitalUnit": "",
		"title": "子公司加入大聯大控股",
		"content": "子公司富威科技加入大聯大控股(含營收移入)"
	},
	{
		"id": "9",
		"year": "2007",
		"capital": "ezDing",
		"capitalUnit": "",
		"title": "ez訂成立",
		"content": "成立ez訂電影訂票平台"
	},
	{
		"id": "10",
		"year": "2013",
		"capital": "ezDing",
		"capitalUnit": "",
		"title": "民宿平台成立",
		"content": "開始旅遊訂民宿業務。"
	},
	{
		"id": "11",
		"year": "2016",
		"capital": "niceday",
		"capitalUnit": "",
		"title": "成立Niceday",
		"content": "成立幸福日子網路股份有限公司，經營體驗活動平台。"
	},
];

class Progress extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tabIndex: "id"+Math.ceil(ProgressData.length / 2),
			data: ProgressData,
			centerPadding: ""
		};
		this.handleClick = this.handleClick.bind(this);
		this.setCenterPadding = this.setCenterPadding.bind(this);
	}
	handleClick(e){
		this.setState({
			tabIndex: e.target.id
		});
	}
	setCenterPadding(){
		let winWidth = ezDing.getWinSize()[0];
		this.setState({
			centerPadding: winWidth * 0.22 + "px"
		});
	}
	componentWillMount(){
		this.setCenterPadding();
	}
	componentDidMount(){
		window.addEventListener("resize", this.setCenterPadding);
	}
	componentWillUnmount(){
		window.removeEventListener("resize", this.setCenterPadding);
	}
	render(){
		let settings = {
			responsive: [
				{breakpoint:767,
					settings:{
						autoplay: true,
						autoplaySpeed: 8000,
						dots: true,
						arrows: false,
						infinite: true,
						slidesToShow: 1,
						swipe: true,
						centerMode: true,
						centerPadding: this.state.centerPadding,
						slidesToScroll: 1
					}
				},
				{breakpoint:10000, settings:'unslick'}
			]
		};
		let listItems = [];
		let listData = this.state.data;
		for(let v of listData){
			let logo = "";
			if(isNaN(Number(v.capital))){
				logo = "logo " + v.capital;
			}
			listItems.push(
				<div onClick={this.handleClick} key={v.id} id={"id"+v.id} className={("id"+v.id == this.state.tabIndex) ? "slideItem active" : "slideItem"}>
					<div className="year">{v.year}</div>
					{v.capital &&
						<div className="capital">
							<span className={logo}>{v.capital}</span>
							<span>{v.capitalUnit}</span>
						</div>
					}
					<div className="title">{v.title}</div>
					<div className="content">{v.content}</div>
				</div>
			);
		}
		return (
			<div className="Progress">
				<Slider {...settings}>
					{listItems}
				</Slider>
			</div>
		);
	}
}

export default Progress;