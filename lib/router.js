import { HTTP } from 'meteor/http'
import { Session } from 'meteor/session'

FlowRouter.route('/', {
    action: function(params, queryParams) {


        if(queryParams.code!=null){
          xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = function() {
            console.log(this.userId)
// Define a handler, which fires when the request completes
		          if (xhttp.readyState == 4) { // If the request state = 4 (completed)...
			             if (xhttp.status == 200) { // And the status = 200 (OK), then...
				                 var authInfo = JSON.parse(xhttp.responseText); // Parse the JSON response into an object
				                 console.log(authInfo['access_token']); // Retrieve the access_token field, and display it
                         Session.set({'user':authInfo['access_token']})



                         //response=HTTP.call( 'GET', 'https://api.ciscospark.com/v1/people/me', { headers:{ 'Content-type' : 'application/json; charset=utf-8', 'Authorization': 'Bearer NjViZGY4OTctM2EyZi00M2FhLWE3Y2YtNGFmYjBiY2M2YTM0YWEyZDcyZWItMDA2' } } );
                         response=HTTP.call('GET', 'https://api.ciscospark.com/v1/people/me', { headers:{ 'Content-type' : 'application/json; charset=utf-8', 'Authorization': 'Bearer '+authInfo['access_token'] } } , (error, result) => {
                           if (!error) {

                             //successfull Login
                             Session.set('email', result.data.emails[0]);
                                 Accounts.createUser({
                                         email: result.data.emails[0],
                                         password: 'pass'
                                     });

                              Meteor.loginWithPassword(result.data.emails[0],'pass');
                              console.log("logged in");

                             FlowRouter.go('panelRoute');
                            // BlazeLayout.render('panel');
                           }
                         });
                         } else alert('Error requesting access token: ' + xhttp.statusText)
 		                }
	             }

          var appClientId='Cb18b3c7a8b2f2a4f3abe0d8a4bb1947276a6577d3d4b1226ae43ba75d6901d53';
          var appClientSecret='d87a013b1b1153c345c3973e597bdeb5386b1a4d634bf022445077bc1f3e0ec3';
          var appRedirectUri='https://pollbot2.meteorapp.com';

          xhttp.open('POST', 'https://api.ciscospark.com/v1/access_token', true); // Initialize the HTTP request object for POST to the access token URL
          var body = 'grant_type=authorization_code&'+  // This is an OAuth2 Authorization Code request
		      'redirect_uri='+encodeURIComponent(appRedirectUri)+'&'+ // Same custom app Redirect URI
		      'code='+encodeURIComponent(queryParams.code)+'&'+ // User auth code retrieved previously
		      'client_id='+encodeURIComponent(appClientId)+'&'+ // The custom app Client ID
		      'client_secret='+encodeURIComponent(appClientSecret); // The custom app Client Secret
	        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Sending the content as URL-encoded form data
	        xhttp.send(body);
        }
        BlazeLayout.render('login');
    }
});

FlowRouter.route('/create', {
  name: 'createRoute',
  action(params, queryParams) {
    BlazeLayout.render('create');
  }
});

FlowRouter.route('/panel', {
  name: 'panelRoute',
  action(params, queryParams) {
    BlazeLayout.render('panel');
  }
});
