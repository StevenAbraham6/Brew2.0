FlowRouter.route('/', {
    action: function(params, queryParams) {
        console.log("Yeah! code ", queryParams.code);
        console.log("Yeah: state", queryParams.state);
    }
});
