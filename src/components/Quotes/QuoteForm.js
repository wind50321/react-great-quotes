import { useRef, useEffect } from 'react'

import LoadingSpinner from '../UI/LoadingSpinner'
import Button from '../UI/Button'
import classes from './QuoteForm.module.css'

const QuoteForm = (props) => {
  const authorInputRef = useRef()
  const textInputRef = useRef()

  useEffect(() => {
    authorInputRef.current.focus()
  }, [])

  const formSubmitHandler = (event) => {
    event.preventDefault()

    const enteredAuthor = authorInputRef.current.value
    const enteredText = textInputRef.current.value

    if (enteredAuthor.trim() === '' || enteredText.trim() === '') return

    props.onAddQuote({ author: enteredAuthor, text: enteredText })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      {props.isLoading && (
        <div className={classes.loading}>
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control}>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" ref={authorInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="text">Text</label>
        <textarea id="text" rows="5" ref={textInputRef} />
      </div>
      <div className={classes.actions}>
        <Button>Add Quote</Button>
      </div>
    </form>
  )
}

export default QuoteForm
