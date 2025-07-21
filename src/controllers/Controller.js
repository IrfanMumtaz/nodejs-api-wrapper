class Controller {
  constructor() {
  }

  handleRequest(req, res) {
    res.send('Handled by base Controller');
  }
}

module.exports = Controller; 