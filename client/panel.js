
import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";

Template.panel.helpers({
  name() {
    var username = Session.get('userEmail') //get username of logged in user
    console.log("Username ", username)
    return username;
  },

  userPollsExist() {
    var pollOwnerId = Meteor.userId();
    //var pollOwnerId = "Th94zGtPEDf29CAqX"
    console.log("UserId 1", pollOwnerId)
    var query = {
      'pollOwnerId': pollOwnerId
    }
    var userPolls = Tasks.find(query).fetch();
    console.log('Length', userPolls.length)
    return userPolls.length > 0 ? true : false
  },
  userPollisPoll(poll) {
    return poll.pollType == 'poll' ? true : false;
  },

  userPolls() {
    var pollOwnerId = Meteor.userId();
    //var pollOwnerId = "Th94zGtPEDf29CAqX"
    console.log("UserId 2", pollOwnerId)
    var query = {
      'pollOwnerId': pollOwnerId
    }
    var userPolls = Tasks.find(query).fetch();
    console.log(userPolls);
    return userPolls
  },

  isActive(pollState) {
    return pollState === 'Running'
  },

  retrieveDate(createdAt) {
    if (createdAt) {
      return createdAt.substring(0, 10);
    }
  },

  totalResponse(questions) {
    var total = 0;
    if (questions.length >= 1 && questions[0].responses) {
      var response = questions[0].responses
      for (var i = 0; i < response.length; i++) {
        total += parseInt(response[i])
      }
    }
    return total
  },

  totalResponseSurvey(questions) {
    var total = 0;
    if (questions.length >= 1 && questions[0].responses) {
      var response = questions[questions.length - 1].responses
      for (var i = 0; i < response.length; i++) {
        total += parseInt(response[i])
      }
    }
    console.log("Total", total)
    return total
  },

  percentage(questions) {
    var percentage = 0.0, total = 0;
    if (questions[0]) {
      var max = questions[0].responses[0], response = questions[0].responses
      for (var i = 0; i < response.length; i++) {
        var r = response[i]
        total += parseInt(r);
        if (parseInt(r) > parseInt(max)) {
          max = r
        }
      }
    }
    percentage = max !== 0 ? ((max / total) * 100).toFixed(2) : 0;
    return percentage
  },

  highestOption(questions) {
    var option = -1
    if (questions[0]) {
      var max = questions[0].responses[0], response = questions[0].responses
      for (var i = 0; i < response.length; i++) {
        if (parseInt(response[i]) > parseInt(max)) {
          max = response[i]
          option = i
        }
      }
      if (option !== -1) {
        option = String.fromCharCode('A'.charCodeAt(0) + option)
        return "Option " + option
      }
    }
  }
});

Template.panel.events({
  'click .float-button-text': function () {
    /*Tasks.remove({ '_id': "q457w5C4nN5ofb3kv" })
      Tasks.insert({
      "pollId": "Testing2",
      "pollTitle": "The Lunch Poll The Lunch Poll The Lunch Poll The Lunch Poll The Lunch Poll The Lunch Poll",
      "pollOwnerId": "Th94zGtPEDf29CAqX",
      "pollOwnerEmail": "stevabra@cisco.com",
      "pollState": "Inactive",
      "pollAudience": "Closed",
      "pollType": "Survey",
      "pollTargetRoom": "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5",
      "pollTargetRoomName": "Bots Room",
      "createdAt": "2018-04-03T09:52:19.789Z",
      "questions": [
        {
          "text": "what do we have for lunch?",
          "options": [
            "Indian",
            "Chinese",
            "Mexican",
            "Italian"
          ],
          "responses": [
            0,
            1,
            0,
            0
          ]
        },
        {
          "text": "Do we go out?",
          "options": [
            "Yes",
            "No"
          ],
          "responses": [
            0,
            0
          ]
        }
      ]
    });*/
    /*Tasks.insert({
      "pollId": "Testing3",
      "pollTitle": "Outing Poll",
      "pollOwnerId": "Th94zGtPEDf29CAqX",
      "pollOwnerEmail": "ahmuruga@cisco.com",
      "pollState": "Running",
      "pollAudience": "Closed",
      "pollType": "Poll",
      "pollTargetRoom": "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5",
      "pollTargetRoomName": "Bots Room",
      "createdAt": "2018-04-03T09:52:19.789Z",
      "questions": [
        {
          "text": "Do we go out?",
          "options": [
            "Yes",
            "No"
          ],
          "responses": [
            0,
            0
          ]
        }
      ]
    });*/
    FlowRouter.go('/create')

  },
  'click .card-item': function goToPoll(e) {
    var selectedPollId = e.currentTarget.getAttribute('pollId');
    console.log("Card pressed", selectedPollId);
    Session.set({ 'pollId': selectedPollId });
    FlowRouter.go('/pollDetail')
  }
});
