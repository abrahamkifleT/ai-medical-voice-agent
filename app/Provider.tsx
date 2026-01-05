'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
 
const Provider = ({children}: Readonly<{children: React.ReactNode}>) => {

const user = useUser()

useEffect(() => {
   user && CreateNewUser()
}, [user])

const CreateNewUser = async () => {
const result = await axios.post("/api/users")
console.log(result.data)
}

  return (
    <div>
        <Provider>
            {children}
        </Provider>
    </div>
  )
}

export default Provider