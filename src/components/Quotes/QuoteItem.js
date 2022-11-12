import { Link } from 'react-router-dom'

import classes from './QuoteItem.module.css'

const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote className={classes.text}>{props.text}</blockquote>
        <figcaption className={classes.author}>{props.author}</figcaption>
      </figure>
      <div className={classes.link}>
        <Link to={`/quotes/${props.id}`}>View Fullscreen</Link>
      </div>
    </li>
  )
}

export default QuoteItem
