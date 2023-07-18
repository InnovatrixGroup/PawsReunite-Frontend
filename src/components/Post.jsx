import React, { useEffect, useState } from 'react'
import logo from '../pics/logo.png'
import Carousel from './Carousel';

const api = process.env.REACT_APP_DATABASE_URL;


function Post(props) {

  const postId = props.postId

  const [post, setPost] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateDescription = (description) => {
    if (description.length > 150 && showFullDescription === false) {
      return description.slice(0, 150);
    } else {
      return description;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`${api}/posts?postId=${postId}`);
      const result = await response.json();
      console.log(result)
      setPost(result.data);
    }
    fetchPost();
  }, [postId]);



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

            <div className='post__body p-3'>
              <div className='post__bodytop flex justify-between'>
                <div className='post__species text-gray-500'><span className='font-extrabold'>Species:</span> {post.species}</div>
                <div className='post__suburb text-gray-500'><span className='font-extrabold'>Suburb:</span> {post.suburb}</div>
              </div>
              <div className='post__info flex flex-col items-start'>
                <div className='post__breed text-gray-500'><span className='font-extrabold'>Breed:</span> {post.breed}</div>
                <div className='color text-gray-500'><span className='font-extrabold'>Color:</span> {post.color}</div>
                <div className='contactInfo mb-3 text-gray-500'><span className='font-extrabold'>Contact Info:</span> {post.contactInfo}</div>
                <div className='description text-left'>
                  {truncateDescription(post.description)}
                  {post.description.length > 150 && showFullDescription === false && <span onClick={toggleDescription} className='text-gray-500'> ...more</span>}
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default Post