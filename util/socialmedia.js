const Join = require('./join.js')

exports.CountSocialMedia = User => {
    var count = 0; 
    if (User.facebook && User.facebook != "") {
        count++;
    }
    if (User.twitter && User.twitter != "") {
        count++;
    }
    if (User.instagram && User.instagram != "") {
        count++;
    }
    if (User.youtube && User.youtube != "") {
        count++;
    }
    if (User.tiktok && User.tiktok != "") {
        count++;
    }
    if (User.twitch && User.twitch != "") {
        count++;
    }
    if (User.pinterest && User.pinterest != "") {
        count++;
    }
    if (User.tumblr && User.tumblr != "") {
        count++;
    }
    if (User.discord && User.discord != "") {
        count++;
    }
    if (User.linkedin && User.linkedin != "") {
        count++;
    }
    return count; 
}


exports.SocialMediaArray = ["facebook", "twitter", "instagram", "youtube", "tiktok", "twitch", "pinterest", "tumblr", "discord", "linkedin"] 

