import { HTTP } from 'meteor/http'
import { Session } from 'meteor/session'
import { Tasks } from "../imports/api/tasks";
import { Logs } from "../imports/api/tasks";



Router.route('/', {
    template: 'panel'
});

Router.route('/v1/items/add', { where: 'server' })
  .post(function () {

    var roomName = this.request.body.roomName;
    var itemName = this.request.body.itemName;
    var query = {"roomName": roomName}
    if(Tasks.find(query).fetch().length==0){
      switch(itemName){
        case "masalaChai": Tasks.insert({"roomName": roomName, "masalaChai": 1, "pollState": "Running"})
                          break;
        case "tea": Tasks.insert({"roomName": roomName, "tea": 1, "pollState": "Running"})
                          break;
        case "greenTea": Tasks.insert({"roomName": roomName, "greenTea": 1, "pollState": "Running"})
                          break;
        case "cafeLatte": Tasks.insert({"roomName": roomName, "cafeLatte": 1, "pollState": "Running"})
                          break;
        case "cappuccino": Tasks.insert({"roomName": roomName, "cappuccino": 1, "pollState": "Running"})
                          break;
        case "espresso": Tasks.insert({"roomName": roomName, "espresso": 1, "pollState": "Running"})
                          break;
      }
    }
    else{
      switch(itemName){
        case "masalaChai": Tasks.update(query, {$inc: { masalaChai: 1 }})
                          break;
        case "tea": Tasks.update(query, {$inc: { tea: 1 }})
                          break;
        case "greenTea": Tasks.update(query, {$inc: { greenTea: 1 }})
                          break;
        case "cafeLatte": Tasks.update(query, {$inc: { cafeLatte: 1 }})
                          break;
        case "cappuccino": Tasks.update(query, {$inc: { cappuccino: 1 }})
                          break;
        case "espresso": Tasks.update(query, {$inc: { espresso: 1 }})
                          break;
      }
    }

    var response = "Successfully Added Item";
    this.response.setHeader('Content-Type','application/json');
    this.response.end(JSON.stringify(response));
    // POST /webhooks/stripe
  })



Router.route('/v1/items/delete', { where: 'server' })
    .post(function () {

      var roomName = this.request.body.roomName;
      var itemName = this.request.body.itemName;
      var query = {"roomName": roomName}


      var record = Tasks.find(query).fetch()
      switch(itemName){
          case "masalaChai": Tasks.update(query, {$inc: { masalaChai: -1 }})
                            break;
          case "tea": Tasks.update(query, {$inc: { tea: -1 }})
                            break;
          case "greenTea": Tasks.update(query, {$inc: { greenTea: -1 }})
                            break;
          case "cafeLatte": Tasks.update(query, {$inc: { cafeLatte: -1 }})
                            break;
          case "cappuccino": Tasks.update(query, {$inc: { cappuccino: -1 }})
                            break;
          case "espresso": Tasks.update(query, {$inc: { espresso: -1 }})
                            break;

      }

      var response = "Successfully Deleted Item";
      this.response.setHeader('Content-Type','application/json');
      this.response.end(JSON.stringify(response));
      // POST /webhooks/stripe
    })


Router.route('/v1/items/deleteall', { where: 'server' })
      .post(function () {

        var roomName = this.request.body.roomName;
        var query = {"roomName": roomName}

        Tasks.remove(query)

        var response = "Successfully Deleted Item Completely";
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
        // POST /webhooks/stripe
      })

Router.route('/v1/items/toggle', { where: 'server' })
        .post(function () {

          var roomName = this.request.body.roomName;
          var query = {"roomName": roomName}
          var record = Tasks.find(query).fetch()
          if(record.length==0){
            Tasks.insert({"roomName": roomName, "pollState": "Inactive"})
          }
          else{
            if(record[0].pollState=="Running")
              Tasks.update(query, {$set: { pollState: "Inactive" }})
            else {
              Tasks.update(query, {$set: { pollState: "Running" }})
            }
          }

          var response = "Successfully toggled item";
          this.response.setHeader('Content-Type','application/json');
          this.response.end(JSON.stringify(response));
          // POST /webhooks/stripe
          })

Router.route('/v1/logs/add', { where: 'server' })
                  .post(function () {

                    var roomName = this.request.body.roomName;
                    var demoName = this.request.body.demoName;

                    var time = new Date().toUTCString()

                    if(demoName=="rfid"){
                      var presenterId = this.request.body.presenterId;
                      Logs.insert({"timeStamp": time,"demoName": demoName, "roomName": roomName, "presenterId": presenterId})
                    }

                    var response = "Successfully logged";
                    this.response.setHeader('Content-Type','application/json');
                    this.response.end(JSON.stringify(response));
                    // POST /webhooks/stripe
          })
