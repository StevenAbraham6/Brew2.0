Template.panel.helpers({
  'click .float': function () {
        // implement here the code on click
        console.log("You pressed the button")
       // FlowRouter.go('createRoute');
  },
 emails(){
   var email=Session.get('email')
   console.log("testing")
   return email;
 }
});
