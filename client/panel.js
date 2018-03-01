
Template.panel.helpers({

 emails(){
   // HTTP.call('GET', 'https://api.ciscospark.com/v1/people/me', {
   //   data: { some: 'json', stuff: 1 }
   // }, (error, result) => {
   //   if (!error) {
   //     Session.set('twizzled', true);
   //   }
   // });

   var email=Session.get('email')
   //response=HTTP.call( 'GET', 'https://api.ciscospark.com/v1/people/me', { headers:{ 'Content-type' : 'application/json; charset=utf-8', 'Authorization': 'Bearer NjViZGY4OTctM2EyZi00M2FhLWE3Y2YtNGFmYjBiY2M2YTM0YWEyZDcyZWItMDA2' } } );
   //this.unblock();
   //return response.data.emails[0];
   return email;//FlowRouter.getParam('code')
 },
});
