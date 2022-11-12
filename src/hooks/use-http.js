import { useReducer, useCallback } from 'react'

function httpReducer(state, action) {
  switch (action.type) {
    case 'SEND':
      return { status: 'pending', data: null, error: null }

    case 'SUCCESS':
      return { status: 'completed', data: action.responseData, error: null }

    case 'ERROR':
      return { status: 'completed', data: null, error: action.errorMessage }

    default:
      return state
  }
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  })

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' })
      try {
        const responseData = await requestFunction(requestData)
        dispatch({ type: 'SUCCESS', responseData })
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        })
      }
    },
    [requestFunction]
  )

  return { sendRequest, ...httpState }
}

export default useHttp
