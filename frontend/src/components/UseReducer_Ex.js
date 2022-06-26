import React, { useReducer } from 'react'

const intialstate = { count: 0 }

function reducer(state, action) {
    switch (action.type) {
        case 'inc':
            return { count: state.count + 1 }
        case 'dec':
            return { count: state.count - 1 }

        default:
            throw new Error()
    }

}

function UseReducer_Ex() {

    // state = {count : 0}
    const [state, dispatch] = useReducer(reducer, intialstate)


    return (
        <div>
            {state.count}
            <button onClick={() => dispatch({ type: 'inc' })} >+</button>
            <button onClick={() => dispatch({ type: 'dec' })} >-</button>

        </div>
    )
}

export default UseReducer_Ex