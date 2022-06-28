import React from 'react'
import Alert from 'react-bootstrap/Alert'

function MessageBox({ variant, children }) {
    return (
        <Alert key="danger" variant={variant}>{children} </Alert>
    )
}

export default MessageBox