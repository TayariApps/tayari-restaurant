import React from 'react'
import NavigationBar from '../components/NavigationBar'
import Order from '../components/Order'

export default function OrderStatus() {
  return (
   <>
    <NavigationBar/>
    <div className='container-fluid'  style={{
          background: "#f7f7f7",
          height: "100vh",
          padding: "2rem 0 0 0",
        }}>
    <div className='container'>
        <div className='row'>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
        </div>
    </div>
    </div>
   </>
  )
}
