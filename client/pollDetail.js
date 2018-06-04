import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'


Template.pollDetail.onCreated(function onCreated() {
  this.hoverQuestion = new ReactiveVar(0);
  this.hoverChar = new ReactiveVar(null);
});

Template.pollDetail.helpers({
  selectedPoll() {
    var pollId = Session.get('pollId');
    var p = Tasks.find({ 'pollId': pollId }).fetch()
    console.log('Fetched poll', p)
    return p;
  },
  pollQuestion(poll) {
    var question = poll.questions[0].text;
    console.log('Question', question);
    return question;
  },

  pollisSurvey(poll){
    console.log('Type',poll.pollType);
    return poll.pollType !== 'poll'?true:false;
  },

  options(question) {
    var o = question.options, options = [];
    for (var i = 0; i < o.length; i++) {
      options.push(
        {
          "optionChar": String.fromCharCode('A'.charCodeAt(0) + i),
          "optionText": o[i]

        }
      );
    }
    console.log("Options", options);
    return options;
  },
  responsesCalc(question) {
    var options = question.options,
    response= question.responses,
    totalResponses = 0;
    for (var i = 0; i < response.length; i++) {
      totalResponses += parseInt(response[i])
    }
    var responses = [];
    for (var i = 0; i < response.length; i++) {
      responses.push(
        {
          "percentage": (totalResponses !== 0) ? (parseInt(response[i]) / totalResponses) * 100 : 0,
          "total": response[i],
          "optionChar": String.fromCharCode('A'.charCodeAt(0) + i),
          "optionText": options[i]
        });
    }
    return responses;
  },

  responseTotaNotZero(total) {
    return total !== 0 ? true : false;
  },
  retrieveDate(createdAt) {
    if (createdAt)
      return createdAt.substring(0, 10);
  },
  totalResponse(questions) {
    var total = 0;
    if (questions.length >= 1) {
      var response = questions[0].responses
      for (var i = 0; i < response.length; i++) {
        total += parseInt(response[i])
      }
    }
    return total
  },
  hoverQuestion(quesNum){
    var num = parseInt(quesNum.slice(-1));
    return((Template.instance().hoverQuestion.get() ===num)?true:false);
  },

  hoverOption(optionChar) {
    return ((Template.instance().hoverChar.get() === optionChar) ? true : false);
  },
  showhighestPoll(quesNum){
    var num = parseInt(quesNum.slice(-1));
    if (Template.instance().hoverChar.get()!== null  && Template.instance().hoverQuestion.get()===num)
    return false
    else
    return true
  },
  highestPollPercentage(question) {
    var response = question.responses,
      options = question.options
    totalResponses = 0;
    for (var i = 0; i < response.length; i++) {
      totalResponses += parseInt(response[i])
    }
    var highestPollPercentage = parseInt(response[0]) / totalResponses, index = 0, result = [];
    for (var i = 1; i < response.length; i++) {
      var percent = (parseInt(response[i]) / totalResponses)
      if (highestPollPercentage < percent) {
        highestPollPercentage = percent;
        index = i;
      }
    }
    result.push({
      "percentage": (highestPollPercentage) ? (highestPollPercentage * 100).toFixed(2) : 0,
      "option": options[index],
      "optionChar": String.fromCharCode('A'.charCodeAt(0) + index),
      "totalResponse": response[index]
    });
    return result;
  },

  pollQuestionsNav(poll) {
    var questionNum= poll.questions.length,
    ques= poll.questions;
    questions=[];
    for(var i=1;i<=questionNum;i++) {
      questions.push({
        'section': 'section'+i,
        'num': 'Question '+ i,
        'ques': ques[i-1] 
      });
    }
    return questions;
  }
});

Template.pollDetail.events({
  'mouseenter section'(e,instance) {
    var quesNum= parseInt(e.currentTarget.getAttribute('id').slice(-1));
    instance.hoverQuestion.set(quesNum);
  },
  'mouseenter .responses'(e, instance) {
    var hoverChar = e.currentTarget.getElementsByClassName("option-char")[0].innerText;
    instance.hoverChar.set(hoverChar);
  },
  'mouseleave .responses'(event, instance) {
    instance.hoverChar.set(null);
  },
  'click .fa-trash': function endPollModal(e) {
    Modal.show('endPollModal');
  },
  'click .fa-envelope': function emailPollModal(params) {
    Modal.show('emailPollModal');
  },
  'click .nav-button': function activeButton(e) {
   e.currentTarget.addClass("active");
    $(this).siblings().removeClass("active");
  },
  'click .home': function home(e) {
    FlowRouter.go('/panel')
  }

});

Template.endPollModal.events({
  'click .active-button': function endPoll(e) {
    console.log('End modal', Session.get('pollId'));
    var params = { "pollId": Session.get('pollId') };
    HTTP.post('https://ub4wybtsa7.execute-api.us-west-2.amazonaws.com/Dev/', { data: params }, (error, result) => {
      if (!error) {
        console.log("Run Successfully")
        return;
      }
      else {
        return error;
        console.log(error);
      }
    }
    );

  }
});

Template.emailPollModal.events({
  'click .active-button': function emailPoll(e) {
    console.log('Email results', Session.get('pollId'));
    var params = { "pollId": Session.get('pollId') };
    HTTP.post('https://5c0zukbo6a.execute-api.ap-south-1.amazonaws.com/Dev/', { data: params }, (error, result) => {
      if (!error) {
        console.log("Run Successfully")
        return;
      }
      else {
        return error;
        console.log(error);
      }
    }
    );

  }
});