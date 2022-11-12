import React, { useEffect } from 'react'

import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import QuoteList from '../components/Quotes/QuoteList'

const AllQuotes = () => {
  const {
    status,
    data: loadedQuotes,
    error,
    sendRequest,
  } = useHttp(getAllQuotes, true)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

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

  if (loadedQuotes.length === 0) {
    return (
      <div className="block-center focus">
        <p>No quotes found!</p>
      </div>
    )
  }

  return (
    <div>
      <QuoteList quotes={loadedQuotes} />
    </div>
  )
}

export default AllQuotes
