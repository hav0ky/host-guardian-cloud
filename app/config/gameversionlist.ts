export const gameEggsData = [{
    minecraft: {
        docker_image: "ghcr.io/pterodactyl/yolks:java_21",
        startup: "java -Xms128M -XX:MaxRAMPercentage=95.0 -jar server.jar",
        // node: 1,
        allocation: 1,
        // nest: 1,
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
        egg: 1,
        feature_limits: {
            databases: 0,
            backups: 0
        },
    },
    cs2: {
        docker_image: "ghcr.io/pterodactyl/games:source",
        startup: "./srcds_run -game csgo -console -port {{SERVER_PORT}} +ip 0.0.0.0 +map {{SRCDS_MAP}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}}",
        environment: {
            SRCDS_MAP: "de_dust2",
            STEAM_ACC: "asdfghjklmnbvcxzasdfghjklmnbvcxz",
            SRCDS_APPID: "740",
            STARTUP: "./srcds_run -game csgo -console -port {{SERVER_PORT}} +ip 0.0.0.0 +map {{SRCDS_MAP}} -strictportbind -norestart +sv_setsteamaccount {{STEAM_ACC}}",
        },
        allocation: 1,
        egg: 1,
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
    }
}]

