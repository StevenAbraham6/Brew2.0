import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http'

Template.pollDetail.onCreated(function onCreated() {
  this.defaultHighestPercentage = new ReactiveVar(true);
  console.log("defaultHighestPercentage", this.defaultHighestPercentage.get());
  this.hoverChar = new ReactiveVar(null);
});

Template.pollDetail.helpers({
  selectedPoll() {
    var pollId = Session.get('pollId');
    var p = Tasks.find({'pollId': pollId}).fetch()
    console.log('Fetched poll',p)
    return p;
  },
  pollQuestion(poll) {
    var question= poll.questions[0].text;
    console.log('Question',question);
    return question;
  },
  options(poll){
    var o = poll.questions[0].options, options =[];
    for(var i = 0;i< o.length;i++) {
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
  responsesCalc(poll) {
    var response = poll.questions[0].responses,
      options = poll.questions[0].options
     totalResponses=0;
    for (var i = 0; i < response.length; i++) {
      totalResponses += parseInt(response[i])
    }
    var responses = [];
    for (var i = 0; i < response.length; i++) {
      responses.push(
        { "percentage": (totalResponses!== 0)?(parseInt(response[i])/totalResponses)*100:0,
        "total": response[i],
        "optionChar": String.fromCharCode('A'.charCodeAt(0) + i),
        "optionText" :options[i]
        });
    }
    console.log('Final', responses);
    return responses;
  },
  responseTotaNotZero(total){
    return total!==0? true:false;
  },
  retrieveDate(createdAt) {
    if(createdAt)
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
  defaultHighestPercentage(){
    return Template.instance().defaultHighestPercentage.get();
  },
  hoverOption(optionChar) {
    return ((Template.instance().hoverChar.get() === optionChar)?true:false);
  },
  highestPollPercentage(poll){
    var response = poll.questions[0].responses,
      options = poll.questions[0].options
    totalResponses = 0;
    for (var i = 0; i < response.length; i++) {
      totalResponses += parseInt(response[i])
    }
    var highestPollPercentage = parseInt(response[0])/totalResponses,index=0,result =[];
    for (var i = 1; i < response.length; i++) {
      var percent = (parseInt(response[i]) / totalResponses)
      if (highestPollPercentage < percent) {
        highestPollPercentage=percent;
        index=i;
      }
    }
    result.push({
      "percentage": (highestPollPercentage) ? (highestPollPercentage * 100).toFixed(2):0,
      "option": options[index],
      "optionChar": String.fromCharCode('A'.charCodeAt(0) + index),
      "totalResponse":response[index]
    });
    return result;
  }
});

Template.pollDetail.events({
  'mouseenter .responses'(e, instance) {
    instance.defaultHighestPercentage.set(false);
    var hoverChar = e.currentTarget.getElementsByClassName("option-char")[0].innerText;
    console.log(hoverChar);
    instance.hoverChar.set(hoverChar);
  },
  'mouseleave .responses'(event, instance) {
    instance.defaultHighestPercentage.set(true);
    instance.hoverChar.set(null);
  },
  'click .fa-trash': function endPollModal(e) {
    Modal.show('endPollModal');
  },
  'click .fa-envelope': function emailPollModal(params) {
    Modal.show('emailPollModal');
  }

});

Template.endPollModal.events({
  'click .active-button': function endPoll(e) {
    console.log('End modal', Session.get('pollId'));
    var params = { "pollId": Session.get('pollId') };
    HTTP.post('https://ub4wybtsa7.execute-api.us-west-2.amazonaws.com/Dev/', { data: params},(error,result)=>{
   if (!error) {
      console.log("Run Successfully")
      return;
    }
    else {
      return error;
      console.log(error);
    }}
  );

  }
});

Template.emailPollModal.events({
  'click .active-button': function emailPoll(e) {
    console.log('Email results', Session.get('pollId'));
    var params = {"pollId" : Session.get('pollId')};
    HTTP.post('https://5c0zukbo6a.execute-api.ap-south-1.amazonaws.com/Dev/',  {data: params}, (error, result) => {
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