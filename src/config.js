function config() {
  this.serverPort = 3001
  this.clientPort = 3000
  this.host = 'http://localhost:'
  this.itemsEndpoint = '/items'
  this.serverEndpoint = this.host + this.serverPort + this.itemsEndpoint
}

module.exports = config;
