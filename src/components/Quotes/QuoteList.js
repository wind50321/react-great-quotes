import { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import QuoteItem from './QuoteItem'
import classes from './QuoteList.module.css'

const sortQuotes = (quotes, ascending) => {
  return quotes.slice().sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id < quoteB.id ? -1 : 1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1
    }
  })
}

const QuoteList = (props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const isSortingAscending = searchParams.get('sort') === 'asc'

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

  const changeSortingHandler = () => {
    navigate({
      pathname: location.pathname,
      search: `?sort=${isSortingAscending ? 'dec' : 'asc'}`,
    })
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            text={quote.text}
            author={quote.author}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default QuoteList
