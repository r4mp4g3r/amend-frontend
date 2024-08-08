import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Redirect = () => {

    const navigate = useNavigate()
    const {id} = useSearchParams()

    useEffect(() => {
        navigate(`/collections/${id}/main`)
    }, [])

  return (
    <div>Redirect</div>
  )
}

export default Redirect