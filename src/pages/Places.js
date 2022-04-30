import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Place from '../components/Place'

export default function Places() {

  const [places, setPlaces] = useState([])

  useEffect(() => {

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios.get(`${process.env.REACT_APP_API_URL}/place/owner`)
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data)
      })
      .catch((err) => console.log(err))
  },[])

  return (
   <>
    <div className='container-fluid'  style={{
          background: "#f7f7f7",
          height: "100vh",
          padding: "2rem 0 0 0",
        }}>
    <div className='container'>
        
        <div className='mt-3 text-center'>
          <h2 style={{ fontWeight:'700' }}>
            Your Places
          </h2>
        </div>

        <div className='row mt-5'>
            {
              places.map(x => <Place key={x.id} place={x} />)
            }
        </div>
    </div>
    </div>
   </>
  )
}
