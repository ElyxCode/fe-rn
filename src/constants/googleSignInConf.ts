export const googleSingInConf = {
    scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '459778211715-gbhibvbosi920pr36ms8pjkdcl2qc8bp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  }