import React from 'react'

import { AnnotationIcon, GiftIcon, ShareIcon } from '@heroicons/react/outline'

const style = {
  icon: 'w-4 h-4',
  iconContainer: 'flex items-center space-x-1 text-[#818384]',
  wrapper: 'flex items-center space-x-4 pt-2',
}

const Actions = ({ comments }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.iconContainer}>
        <AnnotationIcon className={style.icon} />
        <span className="text-xs">{comments.length} comments</span>
      </div>
      <div className={style.iconContainer}>
        <GiftIcon className={style.icon} />
        <span className="text-xs">Awards</span>
      </div>
      <div className={style.iconContainer}>
        <ShareIcon className={style.icon} />
        <span className="text-xs">Share</span>
      </div>
    </div>
  )
}

export default Actions
