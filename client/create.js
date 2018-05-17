import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { Tasks } from "../imports/api/tasks";
import { HTTP } from 'meteor/http'

var countOp = 2;
var countQ = 2;
var countFOp = 2;


if (Meteor.isServer) {
  Meteor.methods({
    spaces: function (token) {
      console.log(token);
      const spaces = HTTP.get('https://api.ciscospark.com/v1/rooms', { headers: { "Content-type": "application/json", Authorization: 'Bearer' + token }, params: { "type": "group" } })
      return spaces;
    },

    members: function () {
      var space = Session.get('Space');
      const members = HTTP.get('https://api.ciscospark.com/v1/memberships', { headers: { "Content-type": "application/json", Authorization: 'Bearer ZmI0Njk0NzgtMTg4NC00ZGVlLWJlNTktYWVjYzY3NWI3YWRjZjIwMjUxNWItMDFm' }, params: { "roomId": space } })
      return members;
    }

  });
}

if (Meteor.isClient) {

  Template.spaceDrop.onCreated(function () {
    var userToken = Session.get('user')
    var template = this;
    template.externalData = new ReactiveVar(null);
    Meteor.call('spaces', [userToken], function (err, result) {
      if (err) {
        console.log(err);
        return err;
      }
      else {
        var redata = JSON.parse(result.content);

        console.log(redata["items"]);

        template.externalData.set({ redata: redata["items"] });
      }
    })
  });

  Template.spaceDrop.events({
    'change #spaceSelect': function () {
      var temp = this;
      temp.externalData = new ReactiveVar(null);
      Meteor.call('members', function (err, result) {
        if (err) {
          console.log(err);
          return err;
        }
        else {
          var data = JSON.parse(result.content);

          console.log(data["items"][0]["personEmail"]);

          temp.externalData.set({ data: data["items"] });
        }
      })
    }
  });

  Template.spaceDrop.helpers({

    hello() {

      var template = Template.instance();
      //console.log(template.externalData.get());
      return template.externalData.get();

    },

    members() {
      var temp = Template.instance();
      //console.log(temp.externalData.get());
      return temp.externalData.get();
    },




    getSpaces() {
      var a = Session.get('Result');
      const spaces = HTTP.get('https://api.ciscospark.com/v1/rooms', { headers: { "Content-type": "application/json", Authorization: 'Bearer ZmI0Njk0NzgtMTg4NC00ZGVlLWJlNTktYWVjYzY3NWI3YWRjZjIwMjUxNWItMDFm' } }, (error, result) => {
        if (!error) {
          Session.set('Spaces Filled', true)
          //console.log("))))))))" + result);
          //return JSON.parse(this.result).uri;
          //console.log(result.data["items"])
          //console.log(")()())()()" + spaces);
          //return result.data["items"][0].title;
          //a = result;

          //  if(Session.get('Result')===undefined){
          //  console.log("Unset");
          //  Meteor.call('spaces', function(err, result){
          //  if(err){
          //  console.log(err);
          //return err;
          //  }
          //else {
          //console.log(result);

          //return Session.set('Result',result);
          //}

          //  });
          //}

          console.log(result);
          return result;
        }
        else {
          return error;
          console.log(error);
        }

      })
      console.log(Session.get('Return'));
      return Session.get('Return');
      //console.log("#@#$" + spaces);
      //a : result;
    }
  });


  Template.Feedback.rendered = function () {

    $(function () {
      //location.reload();
      var addFormGroup = function (event) {
        event.preventDefault();

        countFOp = countFOp + 1;
        var $formGroup = $(this).closest('.form-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
        var $formGroupClone = $formGroup.clone();
        var newFOp = `<div class="form-group input-group">
        <label class="form-option">Option ` + countFOp + `</label>
        <input type="text" name="multiple[]" class="form-control options" id = "option" value="">
        <span class="input-group-btn">
          <button type="button" class="optionBtn btn-default F-btn-add">+</button>
        </span>
        </div>`;
        $(this)
          .toggleClass('btn-default F-btn-add btn-danger F-btn-remove')
          .html('–');

        $formGroupClone.find('input').val('');
        $(newFOp).insertAfter($formGroup);

        var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
        console.log($lastFormGroupLast);
        if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
          $lastFormGroupLast.find('.F-btn-add').attr('disabled', true);
        }
      };
      var removeFormGroup = function (event) {
        event.preventDefault();

        var $formGroup = $(this).closest('.form-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

        var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');

        if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
          $lastFormGroupLast.find('.F-btn-add').attr('disabled', false);
        }

        $formGroup.remove();
      };

      var countFormGroup = function ($form) {
        return $form.find('.form-group').length;
      };
      $(document).on('click', '.F-btn-add', addFormGroup);
      $(document).on('click', '.F-btn-remove', removeFormGroup);
    });
  }


  Template.Poll.rendered = function () {

    $(function () {
      //location.reload();
      var addFormGroup = function (event) {
        event.preventDefault();
        if (countOp > 4) {
          countOp = 2;
        }
        countOp = countOp + 1;
        var $formGroup = $(this).closest('.form-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
        var $formGroupClone = $formGroup.clone();
        var newOp = `
        <div class="form-group input-group">
          <label class="form-option">Option ` + countOp + `</label>
          <input type="text" name="multiple[]" class="form-control options" id = "option" value="">
          <span class="input-group-btn">
            <button type="button" class="optionBtn btn-default btn-add">
            +</button>
          </span>
        </div>`;
        $(this)
          .toggleClass('btn-default btn-add btn-danger btn-remove')
          .html('–');

        $formGroupClone.find('input').val('');
        $(newOp).insertAfter($formGroup);

        var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
        console.log($lastFormGroupLast);
        console.log(countFormGroup($multipleFormGroup));
        if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
          $lastFormGroupLast.find('.btn-add').attr('disabled', true);
        }
      };
      var removeFormGroup = function (event) {
        event.preventDefault();

        var $formGroup = $(this).closest('.form-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

        var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');

        if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
          $lastFormGroupLast.find('.btn-add').attr('disabled', false);
        }

        $formGroup.remove();
      };

      var countFormGroup = function ($form) {
        return $form.find('.form-group').length;
      };
      $(document).on('click', '.btn-add', addFormGroup);
      $(document).on('click', '.btn-remove', removeFormGroup);
    });
  }


  Template.Survey.rendered = function () {

    $(function () {
      //location.reload();
      var addQGroup = function (event) {
        event.preventDefault();
        countQ = countQ + 1;

        var $formGroup = $(this).closest('.q-group');
        var $multipleFormGroup = $formGroup.closest('.question-container');
        var $formGroupClone = $formGroup.clone();
        var newQ = `<div class = "q-group multiple-question-group data-max=2">
        <div class ="jumbotron data-max=2">
        <div class="form-group input-group">
        <label class="form-question">Question ` + countQ + `</label>
          <input type="text" name="squestion1" class="form-control squestion1" id = "squestion1" value="">
          </div>
        <div class ="question-group">
        <div class="form-group multiple-form-group" data-max=5>
          <div class="form-group input-group">
            <label class="form-option">Option 1</label>
            <input type="text" id = "option" name="multiple[]" class="form-control options" value="">
          </div>
          <div class="form-group input-group">
          <label class="form-option">Option 2</label>
          <input type="text" name="multiple[]" class="form-control options" id="" value="">
          <span class="input-group-btn">
            <button type="button" class="optionBtn btn-default btn-add">+</button>
          </span>
          </div>
          </div>
          </div>
          <span class="Q-input-group-btn">
            <button type="button" class="QBtn btn-default Q-btn-add">+</button>
            </span>
          </div>
        </div>
        </div>`;
        $(this)
          .toggleClass('btn-default Q-btn-add btn-danger Q-btn-remove')
          .html('–');

        console.log($formGroupClone.find('input').val(''));
        $(newQ).insertAfter($formGroup);


        var $lastFormGroupLast = $multipleFormGroup.find('.multiple-question-group:last');
        console.log(countQGroup($multipleFormGroup));
        console.log($lastFormGroupLast);
        console.log($multipleFormGroup.data);

        if ($multipleFormGroup.data('max') <= countQGroup($multipleFormGroup)) {

          $lastFormGroupLast.find('.Q-btn-add').attr('disabled', true);
        }
      };
      var removeQGroup = function (event) {
        event.preventDefault();

        var $formGroup = $(this).closest('.q-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-question-group');

        var $lastFormGroupLast = $multipleFormGroup.find('.jumbotron:last');
        if ($multipleFormGroup.data('max') >= countQGroup($multipleFormGroup)) {
          $lastFormGroupLast.find('.Q-btn-add').attr('disabled', false);
        }

        $formGroup.remove();
      };

      var countQGroup = function ($form) {
        return $form.find('.q-group').length;
      };
      $(document).on('click', '.Q-btn-add', addQGroup);
      $(document).on('click', '.Q-btn-remove', removeQGroup);
    });
  }


  Template.Feedback.events({

    'click .validateBtn': function (e) {
      e.preventDefault();
      var hash = document.getElementsByClassName("pollName")[0].value;
      console.log(hash);
      var query = {
        'pollTargetRoomName': hash
      }
      //Tasks.insert(query);
      var Hash = Tasks.find(query).fetch();
      console.log('Length', Hash.length)
      //return Hash.length > 0 ? true : false
      if (Hash.length > 0) {
        console.log("FOUND");
      }
      else {
        console.log("Name can be Taken");
      }
      //Tasks.find({hash: hash}).fetch();

    },
  });



  Template.create.events({


    'click .pollBtn': function (e, instance) {
      e.preventDefault();
      var pollTitle = document.getElementsByClassName("pollName")[0].value;
      var question = document.getElementsByClassName("squestion1")[0].value;
      var options = document.getElementsByClassName('options');
      var spaceId = document.getElementsByClassName('spaceSelect')[0].value;
      //var spaceName = document.getElementsByClassName('spaceSelect')[0].value[name];
      console.log(spaceId);
      // console.log(spaceName);

      Session.set('Space', spaceId);
      var optionLength = options.length, op = [], responses = [], param = [], post = [];
      for (var i = 0; i < optionLength; i++) {
        if (options[i].value) {
          op.push(options[i].value);
          responses.push(0);
        }
      }
      param["pollId"] = pollTitle + new Date().toISOString();
      param["pollTitle"] = pollTitle;
      param["pollOwnerId"] = Session.get('username');
      param["pollOwnerEmail"] = Session.get('email');
      param["pollState"] = "Running";
      param["pollType"] = "Poll";
      param["pollTargetRoom"] = spaceId;
      param["pollTargetRoomName"] = "Test Poll";
      param["createdAt"] = new Date().toISOString();
      param["questions"] = [{ text: question, options: op, responses: responses }];
      console.log(param);
      Tasks.insert(param);
      //BlazeLayout.render('panel');

      post["pollId"] = pollTitle + new Date().toISOString();
      post["personId"] = Session.get('username');
      post["roomId"] = spaceId;
      post["type"] = "Poll";
      post["title"] = pollTitle;
      post["question"] = question;
      post["options"] = op;


      var postData = {


        "pollId": "TestPoll",
        "personId": "NjViZGY4OTctM2EyZi00M2FhLWE3Y2YtNGFmYjBiY2M2YTM0YWEyZDcyZWItMDA2",
        "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5",
        "type": "survey",
        "title": "Test Poll",
        "question": "what do we have for lunch?",
        "options": ["Indian", "Chinese", "Mexican"]


      }

      const postPoll = HTTP.call('POST', 'https://tjqvohkag8.execute-api.us-west-2.amazonaws.com/Dev/', { data: post }, (error, result) => {
        if (!error) {
          console.log("))))))))" + result);
          //return JSON.parse(this.result).uri;
          return result;
        }
        else {
          return error;
          console.log(error);
        }

      })

    },

    'click .surveyBtn': function (e) {
      e.preventDefault();
      var i = 0, j = 0;
      var pollTitle = document.getElementsByClassName("pollName")[0].value;
      var question = document.getElementsByClassName("squestion1");
      var spaceId = document.getElementsByClassName('spaceSelect')[0].value;
      var quesLength = question.length;

      var param = [], ques = [], op = [], responses = [], post = [];
      for (i = 0; i < quesLength; i++) {
        if (question[i].value) {
          //ques.push({"text":question[i].value});
          op = [];
          responses = [];
          console.log("i=", i)
          options = document.getElementsByClassName('question-group')[i].getElementsByClassName('options');
          console.log(document.getElementsByClassName('question-group')[i])
          console.log(options.length);
          for (j = 0; j < options.length; j++) {
            console.log()
            if (options[j].value) {
              //console.log(j);
              op.push(options[j].value);
              responses.push(0);

            }
          }
          ques.push(
            {
              "text": question[i].value,
              "options": op,
              "responses": responses
            }
          );


        }
      }

      console.log(ques)

      post["pollId"] = pollTitle + new Date().toISOString();
      post["personId"] = Session.get('username');
      post["roomId"] = spaceId;
      post["type"] = "Survey";
      post["title"] = pollTitle;
      post["question"] = ques["text"][0];
      post["options"] = ques["options"][0];




      param["pollId"] = pollTitle + new Date().toISOString();
      param["pollTitle"] = pollTitle;
      param["pollOwnerId"] = Session.get('username');
      param["pollOwnerEmail"] = Session.get('email');
      param["pollState"] = "Running";
      param["pollType"] = "Survey";
      param["pollTargetRoom"] = "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5";
      param["pollTargetRoomName"] = "Test Poll";
      param["createdAt"] = new Date().toISOString();
      param["questions"] = ques;
      console.log(param);
      Tasks.insert(param);


      const postSurvey = HTTP.call('POST', 'https://tjqvohkag8.execute-api.us-west-2.amazonaws.com/Dev/', { data: post }, (error, result) => {
        if (!error) {
          console.log("))))))))" + result);
          //return JSON.parse(this.result).uri;
          return result;
        }
        else {
          return error;
          console.log(error);
        }

      })

    },

    'click .feedbackBtn': function (e, instance) {

      var postData = {

        "pollId": "Steven",

      }

      const postFeedback = HTTP.call('POST', 'https://5c0zukbo6a.execute-api.ap-south-1.amazonaws.com/Dev/', { data: postData }, (error, result) => {
        if (!error) {
          console.log("))))))))" + result);
          //return JSON.parse(this.result).uri;
          return result;
        }
        else {
          return error;
          console.log(error);
        }

      })

      e.preventDefault();
      var pollTitle = document.getElementsByClassName("pollName")[0].value;
      var question = document.getElementsByClassName("squestion1")[0].value;
      var options = document.getElementsByClassName('options');
      //var spaceId = document.getElementsByClassName('spaceSelect')[0].value;
      //var spaceName = document.getElementsByClassName('spaceSelect')[0].value[name];
      //console.log(spaceId);
      // console.log(spaceName);

      //Session.set('Space',spaceId);
      var optionLength = options.length, op = [], responses = [], param = [], post = [];
      for (var i = 0; i < optionLength; i++) {
        if (options[i].value) {
          op.push(options[i].value);
          responses.push(0);
        }
      }
      param["pollId"] = pollTitle + new Date().toISOString();
      param["pollTitle"] = pollTitle;
      param["pollOwnerId"] = Session.get('username');
      param["pollOwnerEmail"] = Session.get('email');
      param["pollState"] = "Running";
      param["pollType"] = "feedback";
      param["pollTargetRoom"] = "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5";
      param["pollTargetRoomName"] = "Test Poll";
      param["createdAt"] = new Date().toISOString();
      param["questions"] = [{ text: question, options: op, responses: responses }];
      console.log(param);
      Tasks.insert(param);
      //BlazeLayout.render('panel');

      post["pollId"] = pollTitle + new Date().toISOString();
      post["personId"] = Session.get('username');
      post["roomId"] = pollTitle;
      post["type"] = "feedback";
      post["title"] = pollTitle;
      post["question"] = question;
      post["options"] = op;


    }

  });

}

Template.form.onCreated(function () {
  this.currentTab = new ReactiveVar("Poll");
});



Template.form.events({
  'click .nav-pills li': function (event, template) {
    var currentTab = $(event.target).closest("li");

    currentTab.addClass("active");
    $(".nav-pills li").not(currentTab).removeClass("active");

    template.currentTab.set(currentTab.data("template"));
  }
});

Template.form.helpers({
  form() {
    return Template.instance().currentTab.get();
  }
});



Template.Poll.helpers({
  inputs: function () {
    return Session.get('inputs');
  }
});
Template.Poll.onCreated(function () {
  Session.set('inputs', []);
})









/*Template.create.rendered = function () {

  $(function () {


    var createSurvey = function (event) {
      event.preventDefault();
      countOp = 1;
      countQ = 2;
      var $vacant = $(this).closest('.vacant');
      if ((this).checked == true) {
        $('.form1').remove();
        $('.poll').remove();
        var survey = "<form role=\"survey\" class=\"CreateForm\" autocomplete=\"off\"><div class=\"vacant\"><div class=\"surveyForm\"><div class=\"form-group col-lg-8\"><label>Space</label><div class=\"form-group Space\"><div class=\"form-group input-group\"><select name=\"multiple[]\" class=\"form-control\">{{#each spaces in getSpaces}}<option value=\"\">{{item[0].title}}</option>{{/each}}</select></div></div></div><div class=\"jumbotron col-lg-8\"><div class=\"form-group col-lg-8\"><label>Question 1</label><input type=\"text\" name=\"squestion1\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option 1</label><input type=\"text\" name=\"option1\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option 2</label><div class=\"form-group multiple-form-group\" data-max=6><div class=\"form-group input-group\"><input type=\"text\" name=\"option1\" class=\"form-control\" id=\"\" value=\"\"><span class=\"input-group-btn\"><button type=\"button\" class=\"optionBtn btn-default btn-add\">+</button></span></div></div></div></div><div class=\"question-group multiple-question-group\" data-max=6><div class=\"question-group input-group\"><div class=\"jumbotron col-lg-8\"><div class=\"form-group col-lg-8\"><label>Question 2</label><input type=\"text\" name=\"squestion2\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option </label><input type=\"text\" name=\"option2\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option </label><div class=\"form-group multiple-form-group\" data-max=6><div class=\"form-group input-group\"><input type=\"text\" name=\"option2\" class=\"form-control\" id=\"\" value=\"\"><span class=\"input-group-btn\"><button type=\"button\" class=\"optionBtn btn-default btn-add\">+</button></span></div></div></div></div><div class=\"addQuestion\"><span class=\"Q-input-group-btn\"><button type=\"button\" class=\"QBtn Q-btn-default Q-btn-add\">+</button></span></div></div></div></div></div></div></div></form>";

        $(survey).insertAfter('.slider1');
      }
      else {
        countOp = 1;
        countQ = 1;
        $('.vacant').remove();
        var poll = "<div class=\"poll\"><div class=\"surveyForm\"><div class=\"form-group col-lg-8\"><label>Space</label><div class=\"form-group Space\"><div class=\"form-group input-group\"><select name=\"multiple[]\" class=\"form-control\">{{#each spaces in getSpaces}}<option value=\"\">{{item[0].title}}</option>{{/each}}</select></div></div></div><div class=\"question-group multiple-question-group\" data-max=6><div class=\"question-group input-group\"><div class=\"jumbotron col-lg-8\"><div class=\"form-group col-lg-8\"><label>Question 1</label><input type=\"text\" name=\"question\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option 1</label><input type=\"text\" name=\"option1\" class=\"form-control\" id=\"\" value=\"\"></div><div class=\"form-group col-lg-6\"><label>Option 2</label><div class=\"form-group multiple-form-group\" data-max=6><div class=\"form-group input-group\"><input type=\"text\" name=\"option1\" class=\"form-control\" id=\"\" value=\"\"><span class=\"input-group-btn\"><button type=\"button\" class=\"optionBtn btn-default btn-add\">+</button></span></div></div></div></div></div></div></div></div>";

        $(poll).insertAfter('.slider1');
      }
    }


    var addFormGroup = function (event) {
      event.preventDefault();
      countOp = countOp + 1;
      var $formGroup = $(this).closest('.form-group');
      var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
      var $formGroupClone = $formGroup.clone();

      $(this)
        .toggleClass('btn-default btn-add btn-danger btn-remove')
        .html('–');
      var newOp = `<div class="form-group multiple-form-group" data-max=3>
      <div class="form-group input-group">
        <label class="form-option">Option</label>
          <input type="text" name="multiple[]" class="form-control options" id="option" value="">
          <span class="input-group-btn">
                <button type="button" class="optionBtn btn-default btn-add">+
                </button>
          </span>
        </div>
      </div>`;
  

      $formGroupClone.find('input').val('');
      //$(newOp).insertAfter($formGroup);
      $formGroupClone.insertAfter($formGroup);

      var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
      if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
        $lastFormGroupLast.find('.btn-add').attr('disabled', true);
      }
    };

    var removeFormGroup = function (event) {
      event.preventDefault();
      countOp = countOp - 1;
      var $formGroup = $(this).closest('.form-group');
      var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

      var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
      if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
        $lastFormGroupLast.find('.btn-add').attr('disabled', false);
      }

      $formGroup.remove();
    };

    var countFormGroup = function ($form) {
      return $form.find('.form-group').length;
    };

    //$(document).on('click', '.btn-add', addFormGroup);
    //$(document).on('click', '.btn-remove', removeFormGroup);
    //$(document).on('change', '.check1', createSurvey);
  });

  $(function () {

    var addQGroup = function (event) {
      event.preventDefault();
      countQ = countQ + 1;
      var $qGroup = $(this).closest('.squestion1');
      var $multipleQGroup = $qGroup.closest('.multiple-question-group');
      //var $qGroupClone = $qGroup.clone();

      //  $(this)
      //    .toggleClass('Q-btn-default Q-btn-add btn-danger Q-btn-remove')
      //  .html('–');
      console.log("button");

      //$QGroupClone.find('input').val('');
      //$qGroupClone.insertAfter($qGroup);
      //var newQ = '<div class="question-group multiple-question-group" data-max=3><div class="question-group input-group"><div class=\"jumbotron col-lg-8\"><div class=\"form-group col-lg-8\"><label>Question ' + countQ + '</label><input type=\"text\" name="squestion'+ countQ +'" class="form-control" id="" value=""></div><div class="form-group col-lg-6"><label>Option 1</label><input type="text" name="option'+ countQ + '" class="form-control" id="" value=""></div><div class="form-group col-lg-6"><label>Option 2</label><div class="form-group multiple-form-group" data-max=6><div class="form-group input-group"><input type="text" name="option '+ countQ + '" class="form-control" id="" value=""><span class="input-group-btn"><button type="button" class="optionBtn btn-default btn-add">+</button></span></div></div></div></div><div class="addQuestion"><span class="Q-input-group-btn"><button type="button" class="QBtn Q-btn-default Q-btn-add">+</button></span></div></div></div>';

      var newQ = '<div class = "jumbotron"><div class="form-group col-lg-8"><label>Question 2</label><input type="text" name="squestion1" class="form-control squestion1" id = "squestion1" value=""></div><div class="question-group input-group col-lg-12">{{>option1}}{{>option2}}{{>option3}}{{>option4}}{{>option5}}</div></div>}';
      //$qGroup.append(newQ);
      $(newQ).insertAfter($qGroup);

      var $lastQGroupLast = $multipleQGroup.find('.question-group:last');
      if ($multipleQGroup.data('max') <= countFormGroup($multipleQGroup)) {
        $lastQGroupLast.find('.Q-btn-add').attr('disabled', true);
      }
    };

    var removeQGroup = function (event) {
      event.preventDefault();
      countQ = countQ - 1;
      var $qGroup = $(this).closest('.question-group');
      var $multipleQGroup = $qGroup.closest('.multiple-question-group');

      var $lastQGroupLast = $multipleQGroup.find('.question-group:last');
      if ($multipleQGroup.data('max') >= countFormGroup($multipleQGroup)) {
        $lastQGroupLast.find('.Q-btn-add').attr('disabled', false);
      }

      $qGroup.remove();
    };

    var countFormGroup = function ($form) {
      return $form.find('.question-group').length;
    };

    //  $(document).on('click', '.Q-btn-add', addQGroup);
    //  $(document).on('click', '.Q-btn-remove', removeQGroup);

  });

}*/
