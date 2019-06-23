import '../imports/ui/body.js';
import '../imports/api/tasks.js';
import { Meteor } from 'meteor/meteor';
import { Tasks } from "../imports/api/tasks";


Meteor.startup(() => {
  // code to run on server at startup
  //WebApp.rawConnectHandlers.use(function(req, res, next) {

  //res.setHeader("Access-Control-Allow-Origin", "*");
  //return next();

  Meteor.methods({
    spaces: function (token) {
      console.log(token);
      const spaces = HTTP.get('https://api.ciscospark.com/v1/rooms', { headers: { "Content-type": "application/json", Authorization: 'Bearer ' + token }, params: { "type": "group", "sortby": "lastactivity", "max": "25" } })
      return spaces;
    },
    members: function () {
      const members = HTTP.get('https://api.ciscospark.com/v1/memberships', { headers: { "Content-type": "application/json", Authorization: 'Bearer ZmI0Njk0NzgtMTg4NC00ZGVlLWJlNTktYWVjYzY3NWI3YWRjZjIwMjUxNWItMDFm' }, params: { "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vZThiNmQzOTAtNGExMy0xMWU4LTgxYjctMjdiZTQwNmRkOGE3" } })
      return members;
    }
  });
  Meteor.startup(() => {
    console.log(Tasks.find().fetch());
  });

});
