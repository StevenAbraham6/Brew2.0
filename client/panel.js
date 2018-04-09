
import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";

Template.panel.helpers({
  name() {
    var username = Session.get('username') //get username of logged in user
    console.log("testing")
    username = 'Ahalya'
    return username;
  },
  userPolls() {
    //var pollOwnerId= this.userId;
    var pollOwnerId = "Th94zGtPEDf29CAqX"
    var query = {
      pollOwnerId: pollOwnerId
    }
    var userPolls = Tasks.find().fetch();
    console.log("Hii",userPolls);
    return userPolls
  },
  isActive(pollState){
    return pollState === 'Running'
  },
  spaceName(pollTargetRoom){
    /*
    HTTP Req to fetch space name 
    */
   console.log(pollTargetRoom)
   return "Space Name Place Holder"
  },
  retrieveDate(createdAt){
    return createdAt.substring(0, 10);
  }
});

Template.panel.events({
  'click .float': function () {
    // implement here the code on click
    console.log("You pressed the button")
    // FlowRouter.go('createRoute');
    //Tasks.insert({ "pollId": "NewTestPoll", "pollTitle": "The Breakfast Poll", "pollOwnerId": "Th94zGtPEDf29CAqX", "pollState": "Complete", "createdAt": "2018-04-03T09:52:19.789Z","pollTargetRoom": "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5", "questions": [{ "text": "do u want Chinese?", "options": ["Yes", "No", "Maybe"], "responses": [0, 3, 1] }, { "text": "do u want Indian?", "options": ["Yes1", "No1"], "responses": [0, 0] }] } )
    //Tasks.remove({ _id: "yAyembwmqwhbnWZiq"})

  },
});
