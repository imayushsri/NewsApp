import React from 'react'

const NewsItem = (props) => {
    let {title, description, imgUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card m-0 p-0">
        <span className="position-absolute top-0  badge rounded-pill bg-danger" style={{zIndex: 1, right:0}}>
        {source ? source : 'Unkwon'}
        </span>
  <img src={imgUrl ? imgUrl : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-design-template-e67358190527f4a3f22bf9b294b59447_screen.jpg?ts=1636609387"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...
    </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unkwon" } on {new Date(date).toGMTString()}</small></p>
    <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More...</a>
  </div>
</div>
      </div>
    )
  }

export default NewsItem
