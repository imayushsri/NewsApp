import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResult] = useState(0);
 const CapitalLetter = (string) =>{
    let res = string.charAt(0).toUpperCase() + string.slice(1);
    return res;
  }
  const updateNews = async() =>{
    try{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResult(parsedData.totalResults);
      setLoading(false);
        props.setProgress(100);
      } catch (error) {
        console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
     document.title = `${CapitalLetter(props.category)} - NewsMonkey` ;
    updateNews();
     // eslint-disable-next-line
  }, []);
  // const handlePrevClick = async () =>{
  //   // console.log('prev')
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true})
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();

  //   //  this.setState({
  //   //   page : this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false
  //   //  })
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async () =>{
  //   //  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   //  setLoading(true);
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();

  //   //  this.setState({
  //   //   page : this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading : false
  //   //  })
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
    setLoading(false);

  };
    return (
      <div className='container-fluid my-3'>
        <div style={{padding: '10px', backgroundColor: '#2b3035', marginTop:'clamp(90px, 90px, 25vw)', width: '100%', borderRadius:'30vw', display:"flex", alignItems:'center', justifyContent:'center'}}>
        <h3 className='mx-5 text-center' style={{color:"white", fontSize:'clamp(20px, 2.5vw , 70px)'}}>NewsMonkey - Top {CapitalLetter(props.category)} HeadLines</h3>
        </div>
        {loading && <Spiner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spiner/>}>

         <div className="row my-3 mx-2">
        {articles.map((element) =>{
          return <div className="col-md-4 my-3" key={element.url}>
          <NewsItem  title = {element.title} description = {element.description} newsUrl = {element.url} imgUrl = {element.urlToImage} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
          </div>
        })}
        </div>
        
        </InfiniteScroll>


        {/* <div className="container-fluid d-flex justify-content-between px-5">
        <button disabled={page <= 1} type="button" onClick={handlePrevClick} className="btn btn-dark">&larr; Previous</button>
        <button disabled={state.page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" onClick={handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div> */}
      </div>
    )
  }

export default News

News.defaultProps = {
  country : 'in',
  pageSize : '6',
  category : 'general',
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.string,
  category : PropTypes.string,
}