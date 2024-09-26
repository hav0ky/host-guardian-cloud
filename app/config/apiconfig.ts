import React from "react";

const baseUrl = 'https://newpanel.cs2hvh.com/api/application'

export const apiConfig = {
    urls: {
      getGameServers: '/api/auth/gameserver',
      postLogin: '/api/auth/login',
      createServer: '/api/auth/gameserver/createserver'
    },

    thirdparty:{
      createGameServer: `${baseUrl}/servers`,
      getServer: `${baseUrl}/servers`,
    }
  };