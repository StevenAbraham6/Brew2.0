import { HTTP } from 'meteor/http'

FlowRouter.route('/', {
    action: function(params, queryParams) {

        if(queryParams.code!=null){
          xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = function() {  // Define a handler, which fires when the request completes
		          if (xhttp.readyState == 4) { // If the request state = 4 (completed)...
			             if (xhttp.status == 200) { // And the status = 200 (OK), then...
				                 var authInfo = JSON.parse(xhttp.responseText); // Parse the JSON response into an object
				                 console.log(authInfo['access_token']); // Retrieve the access_token field, and display it
                        
			                   } else alert('Error requesting access token: ' + xhttp.statusText)
 		                }
	             }

          var appClientId='Cdf02ee522417a2471f7caf853b064ebe2892d7c2511027d58e8d97ace9dd0bcb';
          var appClientSecret='8baaea8cacc0f044d9fc017a429622c6bee4749ed9897a550749d2984e047e8e';
          var appRedirectUri='http://pollbot2.meteorapp.com';

          xhttp.open('POST', 'https://api.ciscospark.com/v1/access_token', true); // Initialize the HTTP request object for POST to the access token URL
          var body = 'grant_type=authorization_code&'+  // This is an OAuth2 Authorization Code request
		      'redirect_uri='+encodeURIComponent(appRedirectUri)+'&'+ // Same custom app Redirect URI
		      'code='+encodeURIComponent(queryParams.code)+'&'+ // User auth code retrieved previously
		      'client_id='+encodeURIComponent(appClientId)+'&'+ // The custom app Client ID
		      'client_secret='+encodeURIComponent(appClientSecret); // The custom app Client Secret
	        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Sending the content as URL-encoded form data
	        xhttp.send(body);
        }
    }
});
