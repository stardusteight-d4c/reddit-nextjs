import React from 'react'
import Post from '../common/Post'

// these will come from a database
const posts = [
  {
    id: 0,
    title: 'Build reddit',
    author: '2001so',
  },
  {
    id: 1,
    title: 'Build medium',
    author: 'Luke',
  },
  {
    id: 2,
    title: 'Build facebook',
    author: '2001so',
  },
]

const style = {
  wrapper: 'space-y-2.5',
}

const Feed = () => {
  return (
    <div className={style.wrapper}>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  )
}

export default Feed
