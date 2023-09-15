// 9b3618c747a64ec5ae6b30410f6fc7f1
import React, { Component } from 'react';
import Loading from './loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `The East - ${this.capitalize(this.props.category)}`
    }

    //Only for use in ither function
    async update() {
        this.props.setProgress(10);  
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let fetchUrl = await fetch(url);
        let jsonData = await fetchUrl.json()
        this.setState({
            articles: jsonData.articles,
            totalResults: jsonData.totalResults,   
            loading: false
        })
        this.props.setProgress(100);
    }


    async componentDidMount() {
        this.update();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };



    render() {
        return (
            <>
                <h2 className='mb-3 text-primary text-center'>The East Top HeadLines - {this.capitalize(this.props.category)}</h2>
                {this.state.loading && <Loading/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Loading />}
                >
                    <div className="container" style={{marginTop:"15px"}}>
                        <div className="row mb-4">
                            {this.state.articles.map((articles) => {
                                return <div className="col-md-3" key={articles.url}>
                                    <NewsItem title={articles.title?articles.title:""} description={articles.description?articles.description:""} 
                                    imageUrl={articles.urlToImage} newsUrl={articles.url} author={articles.author} 
                                    date={articles.publishedAt} source={articles.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )

    }
}
