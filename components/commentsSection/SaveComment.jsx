import React, { useContext, useState } from 'react'
import { RedditContext } from '../../context/RedditContext'
import { supabase } from '../../services/supabaseClient'

const style = {
  wrapper: 'flex flex-col space-y-2 rounded bg-[#1a1a1b] p-4',
  input:
    'rounded border border-[#343536] bg-[#1a1a1b] min-h-[100px] max-h-[300px] px-4 py-2 text-left text-sm text-white focus:outline-none',
  commentBtn:
    'rounded-full bg-gray-200 px-4 py-1.5 text-xs font-semibold text-[#1a1a1b]',
}

const SaveComment = ({ postId }) => {
  const { currentUser } = useContext(RedditContext)
  const [input, setInput] = useState('')

  const saveComment = async () => {
    try {
      await supabase.from('comments').insert({
        user: currentUser.user_metadata.full_name,
        comment: input,
        postId: postId,
        userEmail: currentUser.email,
      })
    } catch (error) {
      console.error(error)
    } finally {
      setInput('')
    }
  }

  return (
    <div className={style.wrapper}>
      <div className="text-sm">
        Comment as{' '}
        <span className="text-[#4296ca]">
          {currentUser?.user_metadata.full_name}
        </span>
      </div>
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className={style.input}
        cols="30"
        rows="8"
        placeholder="What are your thoughts?"
      />
      <div className="flex justify-end pt-2">
        <button onClick={() => saveComment()} className={style.commentBtn}>
          Comment
        </button>
      </div>
    </div>
  )
}

export default SaveComment
