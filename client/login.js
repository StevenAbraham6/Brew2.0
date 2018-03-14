Template.login.events({
  'click #addButton': function (e) {
        // implement here the code on click

        var str = "";
        var range = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < 63; i++) {
          str += range.charAt(Math.floor(Math.random() * range.length));
        }



        var appClientId='Cb18b3c7a8b2f2a4f3abe0d8a4bb1947276a6577d3d4b1226ae43ba75d6901d53';
	      var appRedirectUri='https://pollbot2.meteorapp.com';

        	//Build the request URL.  The base URL and next 4 items are typically always the same for Spark web apps
          var requestUrl = 'https://api.ciscospark.com/v1/authorize?' + 'response_type=code&' + 'scope='+ encodeURIComponent('spark:all') + '&' +'state=' + encodeURIComponent(str) + '&' +	'client_id=' + encodeURIComponent(appClientId) + '&' + 'redirect_uri=' + encodeURIComponent(appRedirectUri);
          		'scope='+ encodeURIComponent('spark:all') + '&' + // Requested permission, i.e. Spark room info
          		// The following items are provided by the developer in the source code/config or generated dynamically at run time
          		'state=' + encodeURIComponent(str) + '&' +	// Random string for OAuth2 nonce replay protection
          		'client_id=' + encodeURIComponent(appClientId) + '&' + // The custom app Client ID
          		'redirect_uri=' + encodeURIComponent(appRedirectUri); // The custom app's Redirect URI
        	window.location.href = requestUrl;


    }
});
