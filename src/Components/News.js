// 9b3618c747a64ec5ae6b30410f6fc7f1
import React, {useEffect,useState} from 'react';
import Loading from './loader';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function News(props) {

    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,settoTalResults]=useState(0)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    //Only for use in ither function
    const update =async ()=> {
        props.setProgress(10);  
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let fetchUrl = await fetch(url);
        let parsedData = await fetchUrl.json();
        setArticles(parsedData.articles)
        settoTalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `The East - ${capitalize(props.category)}`
        update();
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles));
        settoTalResults(parsedData.totalResults);
    };



  
        return (
            <>
                <h2 className='mb-3 text-primary text-center mt-10'>The East Top HeadLines - {capitalize(props.category)}</h2>
                {loading && <Loading/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Loading />}
                >
                    <div className="container" style={{marginTop:"15px"}}>
                        <div className="row mb-4">
                            {articles.map((articles) => {
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

};


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
