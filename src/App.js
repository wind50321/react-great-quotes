import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="block-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" replace />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
