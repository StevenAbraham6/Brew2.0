import { HTTP } from 'meteor/http'
import { Session } from 'meteor/session'


Router.route('/', {
    template: 'panel'
});

Router.route('/v1/items/add', { where: 'server' })
  .post(function () {
    console.log(this.request.body.device)
    var response = "";
    this.response.setHeader('Content-Type','application/json');
    this.response.end(JSON.stringify(response));
    // POST /webhooks/stripe
  })
