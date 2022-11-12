import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import useHttp from '../../hooks/use-http'
import { getAllComments } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'
import CommentsList from './CommentsList'
import NewCommentForm from './NewCommentForm'
import Button from '../UI/Button'
import classes from './Comments.module.css'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false)

  const {
    status,
    data: loadedComments,
    sendRequest,
  } = useHttp(getAllComments, true)

  const { quoteId } = useParams()

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true)
  }

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false)
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let content

  if (status === 'pending') {
    content = <LoadingSpinner />
  }

  if (status === 'completed' && loadedComments.length === 0) {
    content = <p>No comments were added yet!</p>
  }

  if (status === 'completed' && loadedComments.length > 0) {
    content = <CommentsList comments={loadedComments} />
  }

  return (
    <section className={classes.comments}>
      <h2>Comments</h2>
      {!isAddingComment && (
        <div className="line-center">
          <Button onClick={startAddCommentHandler}>Add a Comment</Button>
        </div>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      <div className={classes.content}>{content}</div>
    </section>
  )
}

export default Comments
