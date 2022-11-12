import { useRef, useEffect } from 'react'

import useHttp from '../../hooks/use-http'
import { addComment } from '../../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'
import Button from '../UI/Button'
import classes from './NewCommentForm.module.css'

const NewCommentForm = (props) => {
  const { onAddedComment, quoteId } = props
  const { status, error, sendRequest } = useHttp(addComment)

  const commentTextRef = useRef()

  useEffect(() => {
    commentTextRef.current.focus()
  }, [])

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment()
    }
  }, [status, error, onAddedComment])

  const submitFormHandler = (event) => {
    event.preventDefault()

    const enteredText = commentTextRef.current.value
    if (enteredText.trim() === '') return

    sendRequest({ commentData: { text: enteredText }, quoteId })
  }

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" ref={commentTextRef} />
      </div>
      <div className={classes.actions}>
        <Button>Add Comment</Button>
      </div>
    </form>
  )
}

export default NewCommentForm
