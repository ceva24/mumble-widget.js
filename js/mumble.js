function loadMumbleData() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "",
        dataType: "jsonp",
        complete: setTimeout(function() {loadMumbleData()}, 1000),
        timeout: 5000,
        success: function (response) {
            updateWidget(response);
        }
    });
}

function updateWidget(response) {
    // Identify the server name and update the root span if necessary.
    if (!(("&nbsp;" + response.name.toString() + ":") === $("#server-root-name").html())) {
        $("#server-root-name").html("&nbsp;" + response.name.toString() + ":");
    }

    updateChannels(response.root);
}

function updateChannels(response) {
    var mainDiv = document.getElementById("mw-main");

    $.each(response.channels, function() {
        var divChannelId = "mw-channel-" + (this.name).replace(/\W/g, '');
    
        // Check if this channel is in the div; if not, add it with unique id tied to its channel name (with stripped whitespace).
        if (!($("#" + divChannelId).length > 0)) {
            $("#mw-main").append("<span id=\"" + divChannelId + "\" style=\"padding-left: 25px; position: relative;\"><img src=\"icons/channel.png\" />&nbsp;<a href=\"" + this.x_connecturl + "\" style=\"vertical-align: sub;\">" + this.name + "</a><br /></span>");
        }

        // loop through each user in this channel and push them into an array which will subsequently be sorted.
        var users = [];
        $.each(this.users, function() {
            var user = new Object();
            user.name = $('<div/>').text(this.name).html();
            user.bytespersec = this.bytespersec;
            user.session = this.session;
        
            users.push(user);
        });

        // Sort the array alphabetically (case-insensitive).
        users.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

        // loop through all users in the div to remove any that were present but are no longer in the JSON.
        $("#" + divChannelId).find("[id^=\"mw-user-\"]").each(function() {
            var found = 0;
            var thisId = this.getAttribute("id");

            for (var i = 0; i < users.length; i++)
            {
                var user = users[i];
                var formattedUserName = (user.name).replace(/\W/g, '');

                if ((thisId.indexOf("-" + formattedUserName + "-") > -1) && (thisId.indexOf("-" + user.session) > -1))
                {
                    found = 1;
                }
            }

            if (found === 0)
            {
                $("#" + thisId).remove();
            }
        });

        // Loop through each user and add it if it doesn't exist in the div with a unique id tied to name and session, else update their icon.
        for (var i = 0; i < users.length; i++)
        {
            var user = users[i];
            var icon = ((user.bytespersec === 0) ? "icons/user_off.png" : "icons/user_on.png");
            var formattedUserName = (user.name).replace(/\W/g, '');

            var userId = (this.name).replace(/\W/g, '') + "-" + formattedUserName + "-" + user.session;
            var divUserId = "mw-user-" + userId;
            var divUserImgId = "mw-userimg-" + userId;

            if (!($("#" + divUserId).length > 0)) {
                var truncatedName = ((user.name.length > 20) ? user.name.substring(0, 19) + "..." : user.name);
                $("#" + divChannelId).append("<span id=\"" + divUserId + "\" style=\"padding-left: 50px; \"><img id =\"" + divUserImgId+ "\" src=\"" + icon + "\" />&nbsp;<span title=\"" + user.name + "\">" + truncatedName + "</span><br /></span>");
            }
            else
            {
                // Just update their icon if talking/not talking.
                if ( $("#" + divUserImgId).length > 0) {
                    $("#" + divUserImgId).attr("src", icon);
                }
            }
        }
    });
}