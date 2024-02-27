import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const { user } = useSelector(state => state.users);
    return (
        <div>
            <h1>Home</h1>
            {user && <h1>{user.name}</h1>}
        </div>
    )
}

export default Home