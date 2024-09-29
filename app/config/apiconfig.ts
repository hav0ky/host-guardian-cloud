import React from "react";
import axios from 'axios';

const baseUrl = 'https://newpanel.cs2hvh.com/api/application'
export const nodesID = process.env.NODE_ID; 

export const apiConfig = {
    urls: {
      getGameServers: '/api/auth/gameserver/allgameserver',
      postLogin: '/api/auth/login',
      createServer: '/api/auth/gameserver/createserver',
      getGamePlaneById: '/api/auth/gameserver/plans/',
      createPanelUserDB: '/api/auth/gameserver/createpaneluser',
    },

    thirdparty:{
      createGameServer: `${baseUrl}/servers`,
      getServer: `${baseUrl}/servers`,
      getAllocation: `${baseUrl}/nodes/${nodesID}/allocations`,
      createAllocation: `${baseUrl}/nodes/${nodesID}/allocations`,
      deleteAllocation: `${baseUrl}/nodes/${nodesID}/allocations/`,
      createUser: `${baseUrl}/users`
    } 
  };




export const createPanelUserTD = async (userData: any) => {
    try {
        const response = await axios.post(apiConfig.thirdparty.createUser, userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`,
            },
        });
        return response; 
    } catch (error: any) {
        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data,
            };
        } else {
            return {
                status: 500,
                message: 'Server error',
            };
        }
    }}