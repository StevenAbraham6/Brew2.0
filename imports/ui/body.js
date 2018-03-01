import { Template } from 'meteor/templating';

// import { Tasks } from '../api/tasks.js';

import { HTTP } from 'meteor/http'

import './body.html';
//
// Template.body.helpers({
//   tasks() {
//     return Tasks.find({});
//   },
// });
//
// Template.body.events({
//   'click #addButton': function (e) {
//         // implement here the code on click
//
//         var str = "";
//         var range = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//         for(var i = 0; i < 63; i++) {
//           str += range.charAt(Math.floor(Math.random() * range.length));
//         }
//
//
//
//         var appClientId='Cdf02ee522417a2471f7caf853b064ebe2892d7c2511027d58e8d97ace9dd0bcb';
// 	      var appRedirectUri='http://pollbot2.meteorapp.com';
//
//         	//Build the request URL.  The base URL and next 4 items are typically always the same for Spark web apps
//           var requestUrl = 'https://api.ciscospark.com/v1/authorize?' + 'response_type=code&' + 'scope='+ encodeURIComponent('spark:all') + '&' +'state=' + encodeURIComponent(str) + '&' +	'client_id=' + encodeURIComponent(appClientId) + '&' + 'redirect_uri=' + encodeURIComponent(appRedirectUri);
//           		'scope='+ encodeURIComponent('spark:all') + '&' + // Requested permission, i.e. Spark room info
//           		// The following items are provided by the developer in the source code/config or generated dynamically at run time
//           		'state=' + encodeURIComponent(str) + '&' +	// Random string for OAuth2 nonce replay protection
//           		'client_id=' + encodeURIComponent(appClientId) + '&' + // The custom app Client ID
//           		'redirect_uri=' + encodeURIComponent(appRedirectUri); // The custom app's Redirect URI
//         	window.location.href = requestUrl;
//
//
//     }
// });

//
// Template.body.helpers({
//  tasks() {
//    // Show newest tasks at the top
//    return Tasks.find({}, { sort: { createdAt: -1 } });
//  },
//
//  emails(){
//    // HTTP.call('GET', 'https://api.ciscospark.com/v1/people/me', {
//    //   data: { some: 'json', stuff: 1 }
//    // }, (error, result) => {
//    //   if (!error) {
//    //     Session.set('twizzled', true);
//    //   }
//    // });
//
//    var email=Session.get('email')
//    //response=HTTP.call( 'GET', 'https://api.ciscospark.com/v1/people/me', { headers:{ 'Content-type' : 'application/json; charset=utf-8', 'Authorization': 'Bearer NjViZGY4OTctM2EyZi00M2FhLWE3Y2YtNGFmYjBiY2M2YTM0YWEyZDcyZWItMDA2' } } );
//    //this.unblock();
//    //return response.data.emails[0];
//    return email;//FlowRouter.getParam('code')
//  },
// });
