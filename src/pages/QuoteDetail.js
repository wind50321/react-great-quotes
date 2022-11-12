import React, { Fragment, useEffect } from 'react'
import { useParams, Routes, Route, Link } from 'react-router-dom'

import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import HighlightedQuote from '../components/Quotes/HighlightedQuote'
import Comments from '../components/Comments/Comments'

const QuoteDetail = () => {
  const params = useParams()

  const { quoteId } = params

  const {
    status,
    data: loadedQuote,
    error,
    sendRequest,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return (
      <div className="block-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="block-center error">
        <p>{error}</p>
      </div>
    )
  }

  if (!loadedQuote) {
    return (
      <div className="block-center focus">
        <p>No quote found!</p>
      </div>
    )
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          index
          element={
            <div className="line-center">
              <Link to="comments">Load Comments</Link>
            </div>
          }
        />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </Fragment>
  )
}

export default QuoteDetail
