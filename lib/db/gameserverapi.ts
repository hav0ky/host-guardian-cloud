import React from 'react'
import query from '.'
import axios from 'axios';

export const getAllGames = async () =>{
    const response = await axios.get("/api/auth/gameserver")

    // const games = await query.gameservers.getAll();
    return response;
}