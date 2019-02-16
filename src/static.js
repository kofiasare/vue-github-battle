export default {
    player: function(username = '', avatar = '') {
        this.username = username;
        this.avatar = avatar;
        this.submitted = false;
    },

    errors: {
        errorMsg: 'Looks like there was error. Check that user exist on Github'
    },

    languages: [
        "All",
        "C",
        "C++",
        "Javascript",
        "Ruby",
        "Java",
        "CSS",
        "Python",
        "Vue",
        "PHP",
    ],
};