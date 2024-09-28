import React from "react";

const baseUrl = 'https://newpanel.cs2hvh.com/api/application'
export const nodesID = process.env.NODE_ENV; 

export const apiConfig = {
    urls: {
      getGameServers: '/api/auth/gameserver',
      postLogin: '/api/auth/login',
      createServer: '/api/auth/gameserver/createserver',
      getGamePlaneById: '/api/auth/gameserver/plans/'
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