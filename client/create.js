
import { Template } from 'meteor/templating';
import { Tasks } from "../imports/api/tasks";
import { ReactiveVar } from 'meteor/reactive-var';

Template.create.onCreated(function onCreated() {
    this.optionNum = new ReactiveVar(1);
    
});

Template.create.events({
    'click #addOption': function (e,instance) {
        instance.optionNum.set(instance.optionNum.get()+1);
        var optionNum=instance.optionNum.get();
        params={}
        for(var i=2 ;i<=optionNum && i<=5;i++){
            var optionName = 'option' + i;
            params[optionName] = 'option';
        }
        console.log(params);
        BlazeLayout.render('create', params);

    },

    'click #createPoll': function(e,instance) {
        e.preventDefault();
        var pollTitle = document.getElementsByClassName("pollName")[0].value;
        var question = document.getElementsByClassName("pollQuestion")[0].value;
        var options= document.getElementsByClassName('options');
        var optionLength = options.length, op=[],responses=[],param=[];
        for(var i =0 ;i<optionLength;i++)
        {
            op.push(options[i].value);
            responses.push(0);
        }
    param["pollId"] = pollTitle + new Date().toISOString();
    param["pollTitle"]=pollTitle;
    param["pollOwnerId"] = Session.get('username');
    param[ "pollOwnerEmail"] = Session.get('email');
    param["pollState"] ="Running";
    param["pollType"]= "Poll";
    param["pollTargetRoom"]= "Y2lzY29zcGFyazovL3VzL1JPT00vODEwNWRiYTAtMDAxOC0xMWU4LTliZTMtMGJhN2ZjZjgwNzc5";
    param["pollTargetRoomName"]= "Test Poll";
    param["createdAt"] = new Date().toISOString();
    param["questions"] = [{ text: question, options: op, responses: responses }];
    console.log(param);
    Tasks.insert(param);
    BlazeLayout.render('panel');
    }

});