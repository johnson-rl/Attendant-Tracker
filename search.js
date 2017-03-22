User.findOne().then(function (user) {
    console.log(user.get('firstName'));
});
