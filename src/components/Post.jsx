import React, { useEffect, useState } from 'react'
import logo from '../pics/logo.png'
import Carousel from './Carousel';

const api = process.env.REACT_APP_DATABASE_URL;


function Post() {

  const [post, setPost] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (description) => {
    if (description.length > 150 && showFullDescription === false) {
      return description.slice(0, 150) + '...';
    } else {
      return description;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${api}/posts?postId=64b112336e815cda0e7c5f23`);
      const result = await response.json();
      console.log(result)
      setPost(result.data);
    }
    fetchPost();
  }, []);



  return (
    <div className='post-container'>
      {Object.keys(post).length === 0 ? (
        <div>Loading...</div>
        ) : (
          <div className='post flex flex-col'>
            <div className='post__header flex justify-between px-3 py-2'>
              <div className='post__header__left flex gap-3 items-center'>
                <img src={logo} alt='logo pic' className='post__profile-pic' style={{width: "25px"}} />
                <div className='post__title'>{post.title}</div>
              </div>
              <div className='post__header__right'>
                <div className='post__status'>{post.status}</div>
              </div>
            </div>
            <Carousel images={post.photos} />
            <div className='post__body'>
              <div className='post__bodytop'>
                <div className='post__species'>Species</div>
                <div className='post__suburb'>Suburb</div>
              </div>
              <div className='post__info'>
                <div className='post__breed'>Breed</div>
                <div className='color'>Color</div>
                <div className='contactInfo'>Contact Info</div>
                <div className='description'>
                  {truncateDescription(post.description)}
                  {post.description.length > 150 && showFullDescription === false && <span onClick={toggleDescription}>more</span>}
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default Post