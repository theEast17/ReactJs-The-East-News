import React from 'react'

  export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <>
      <div className="card mb-3">
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:'1'}}>
            {source}
          </span>
        <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/09/11/1600x900/Tharoor-Modi_1694400078667_1694400098629.jpeg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-danger'>By Author {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
          <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    </>
  )
};
