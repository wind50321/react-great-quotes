import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'
import QuoteForm from '../components/Quotes/QuoteForm'

const NewQuote = () => {
  const { status, sendRequest } = useHttp(addQuote)

  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'completed') {
      navigate('/quotes')
    }
  }, [status, navigate])

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
  }

  const isLoading = status === 'pending'

  return <QuoteForm isLoading={isLoading} onAddQuote={addQuoteHandler} />
}

export default NewQuote
