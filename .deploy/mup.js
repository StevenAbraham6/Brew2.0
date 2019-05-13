module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '159.89.164.250',
      username: 'root',
      // pem: './path/to/pem'
      password: 'brewpassword123'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'brew',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://www.mybrew.xyz',
      MONGO_URL: 'mongodb://user:password@ds233208.mlab.com:33208/tasks',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true

  }



  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mybrew.xyz,www.mybrew.xyz',
  //
  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'steven4abraham@gmail.com'
  //   }
  // }
};
