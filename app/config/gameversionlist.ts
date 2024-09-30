export const gameEggsData = [{
    minecraft: {
        docker_image: "ghcr.io/pterodactyl/yolks:java_21",
        startup: "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar server.jar",
        allocation: 1,
        egg: 1,
        environment: {
            SPONGE_VERSION: "1.12.2-7.3.0",
            SERVER_JARFILE: "server.jar",
            STARTUP: "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar server.jar"
        },
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    cs2: {
        egg: 15,
        docker_image: "ghcr.io/1zc/steamrt3-pterodactyl:latest",
        startup: "./game/cs2.sh -dedicated +ip 0.0.0.0 -port {{SERVER_PORT}} +map {{SRCDS_MAP}} -maxplayers {{SRCDS_MAXPLAYERS}} +sv_setsteamaccount {{STEAM_ACC}}",
        environment: {
            "SRCDS_MAP": "de_dust2",
            "SRCDS_APPID": "730",
            "SRCDS_MAXPLAYERS": "64",
            "SRCDS_STOP_UPDATE": "0",
            "SRCDS_VALIDATE": "0",
            "STEAM_ACC": "",
            "STARTUP": "./game/cs2.sh -dedicated +ip 0.0.0.0 -port {{SERVER_PORT}} +map {{SRCDS_MAP}} -maxplayers {{SRCDS_MAXPLAYERS}} +sv_setsteamaccount {{STEAM_ACC}}",
        },
        allocation: 1,
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    ark: {
        docker_image: "quay.io/parkervcp/pterodactyl-images:debian_source",
        startup: "rmv() { echo -e \"stopping server\"; rcon -t rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD} -c saveworld && rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD} -c DoExit; }; trap rmv 15; cd ShooterGame/Binaries/Linux && ./ShooterGameServer {{SERVER_MAP}}?listen?SessionName=\"{{SESSION_NAME}}\"?ServerPassword={{ARK_PASSWORD}}?ServerAdminPassword={{ARK_ADMIN_PASSWORD}}?Port={{SERVER_PORT}}?RCONPort={{RCON_PORT}}?QueryPort={{QUERY_PORT}}?RCONEnabled=True$( [ \"$BATTLE_EYE\" == \"1\" ] || printf %s ' -NoBattlEye' ) -server {{ARGS}} -log & until echo \"waiting for rcon connection...\"; rcon -t rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD}; do sleep 5; done",
        environment: {
            ARK_PASSWORD: "",
            ARK_ADMIN_PASSWORD: "PleaseChangeMe",
            SERVER_MAP: "TheIsland",
            SESSION_NAME: "ARK Server",
            RCON_PORT: "27020",
            QUERY_PORT: "27015",
            AUTO_UPDATE: "0",
            BATTLE_EYE: "1",
            SRCDS_APPID: "376030",
            ARGS: "",
            STARTUP: "rmv() { echo -e \"stopping server\"; rcon -t rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD} -c saveworld && rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD} -c DoExit; }; trap rmv 15; cd ShooterGame/Binaries/Linux && ./ShooterGameServer {{SERVER_MAP}}?listen?SessionName=\"{{SESSION_NAME}}\"?ServerPassword={{ARK_PASSWORD}}?ServerAdminPassword={{ARK_ADMIN_PASSWORD}}?Port={{SERVER_PORT}}?RCONPort={{RCON_PORT}}?QueryPort={{QUERY_PORT}}?RCONEnabled=True$( [ \"$BATTLE_EYE\" == \"1\" ] || printf %s ' -NoBattlEye' ) -server {{ARGS}} -log & until echo \"waiting for rcon connection...\"; rcon -t rcon -a 127.0.0.1:${RCON_PORT} -p ${ARK_ADMIN_PASSWORD}; do sleep 5; done",
        },

        allocation: 1,
        egg: 6,
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    rust: {
        docker_image: "ghcr.io/pterodactyl/games:rust",
        startup: "./RustDedicated -batchmode +server.port {{SERVER_PORT}} +server.queryport {{QUERY_PORT}} +server.identity \"rust\" +rcon.port {{RCON_PORT}} +rcon.web true +server.hostname \\\"{{HOSTNAME}}\\\" +server.level \\\"{{LEVEL}}\\\" +server.description \\\"{{DESCRIPTION}}\\\" +server.url \\\"{{SERVER_URL}}\\\" +server.headerimage \\\"{{SERVER_IMG}}\\\" +server.logoimage \\\"{{SERVER_LOGO}}\\\" +server.maxplayers {{MAX_PLAYERS}} +rcon.password \\\"{{RCON_PASS}}\\\" +server.saveinterval {{SAVEINTERVAL}} +app.port {{APP_PORT}}  $( [ -z ${MAP_URL} ] && printf %s \"+server.worldsize \\\"{{WORLD_SIZE}}\\\" +server.seed \\\"{{WORLD_SEED}}\\\"\" || printf %s \"+server.levelurl {{MAP_URL}}\" ) {{ADDITIONAL_ARGS}}",
        environment: {
            HOSTNAME: "A Rust Server",
            FRAMEWORK: "vanilla",
            LEVEL: "Procedural Map",
            DESCRIPTION: "Powered by Pterodactyl",
            SERVER_URL: "http://pterodactyl.io",
            WORLD_SIZE: "3000",
            WORLD_SEED: "",
            MAX_PLAYERS: "40",
            SERVER_IMG: "",
            QUERY_PORT: "27017",
            RCON_PORT: "28016",
            RCON_PASS: "root",
            SAVEINTERVAL: "60",
            ADDITIONAL_ARGS: "",
            APP_PORT: "28082",
            SERVER_LOGO: "",
            MAP_URL: "",
            STARTUP: "./RustDedicated -batchmode +server.port {{SERVER_PORT}} +server.queryport {{QUERY_PORT}} +server.identity \"rust\" +rcon.port {{RCON_PORT}} +rcon.web true +server.hostname \\\"{{HOSTNAME}}\\\" +server.level \\\"{{LEVEL}}\\\" +server.description \\\"{{DESCRIPTION}}\\\" +server.url \\\"{{SERVER_URL}}\\\" +server.headerimage \\\"{{SERVER_IMG}}\\\" +server.logoimage \\\"{{SERVER_LOGO}}\\\" +server.maxplayers {{MAX_PLAYERS}} +rcon.password \\\"{{RCON_PASS}}\\\" +server.saveinterval {{SAVEINTERVAL}} +app.port {{APP_PORT}}  $( [ -z ${MAP_URL} ] && printf %s \"+server.worldsize \\\"{{WORLD_SIZE}}\\\" +server.seed \\\"{{WORLD_SEED}}\\\"\" || printf %s \"+server.levelurl {{MAP_URL}}\" ) {{ADDITIONAL_ARGS}}",
        },
        allocation: 1,
        egg: 1,
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    csgo: {
        docker_image: "ghcr.io/pterodactyl/games:source",
        startup: "./srcds_run -game csgo -console -port {{SERVER_PORT}} +ip 0.0.0.0 +map {{SRCDS_MAP}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}}",
        environment: {
            "SRCDS_MAP": "de_dust2",
            "STEAM_ACC": "asdfghjklmnbvcxzasdfghjklmnbvcxz",
            "SRCDS_APPID": "740",
            "STARTUP": "./srcds_run -game csgo -console -port {{SERVER_PORT}} +ip 0.0.0.0 +map {{SRCDS_MAP}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}}",
            "P_SERVER_LOCATION": "IN",
            "P_SERVER_UUID": "9bcedc43-dbb2-4319-a7ce-f654edfa3526",
            "P_SERVER_ALLOCATION_LIMIT": 0
        },
        allocation: 1,
        egg: 8,
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    garrys: {
        startup: "./srcds_run -game garrysmod -console -port {{SERVER_PORT}} +ip 0.0.0.0 +host_workshop_collection {{WORKSHOP_ID}} +map {{SRCDS_MAP}} +gamemode {{GAMEMODE}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}} +maxplayers {{MAX_PLAYERS}}  -tickrate {{TICKRATE}}  $( [ \"$LUA_REFRESH\" == \"1\" ] || printf %s '-disableluarefresh' )",
        docker_image: "ghcr.io/pterodactyl/games:source",
        environment: {
            SRCDS_MAP: "gm_flatgrass",
            STEAM_ACC: "",
            SRCDS_APPID: "4020",
            WORKSHOP_ID: "",
            GAMEMODE: "sandbox",
            MAX_PLAYERS: "32",
            TICKRATE: "22",
            LUA_REFRESH: "0",
            STARTUP: "./srcds_run -game garrysmod -console -port {{SERVER_PORT}} +ip 0.0.0.0 +host_workshop_collection {{WORKSHOP_ID}} +map {{SRCDS_MAP}} +gamemode {{GAMEMODE}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}} +maxplayers {{MAX_PLAYERS}}  -tickrate {{TICKRATE}}  $( [ \"$LUA_REFRESH\" == \"1\" ] || printf %s '-disableluarefresh' )",
            P_SERVER_LOCATION: "IN",
            P_SERVER_UUID: "baa4d745-7a76-4395-87ca-cd164b9c4fee",
            P_SERVER_ALLOCATION_LIMIT: 0
        },
        feature_limits: {
            "databases": 0,
            "allocations": 0,
            "backups": 0
        },
        allocation: 1,
        egg: 7
    }

}]

