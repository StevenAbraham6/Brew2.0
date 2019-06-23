
import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";

Template.panel.helpers({
  name() {
    var username = Session.get('userEmail') //get username of logged in user
    console.log("Username ", username)
    return username;
  },

  userPollsExist() {
    var userPolls = Tasks.find().fetch();
    return userPolls.length > 0 ? true : false
  },
  userPollisPoll(poll) {
    return poll.pollType == 'poll' ? true : false;
  },

  userPolls() {
    var query = {}
    var userPolls = Tasks.find(query).fetch();
    //console.log(userPolls);
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
