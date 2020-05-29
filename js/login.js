var storage = window.localStorage;

var loginCredentials = { username : "", password : "" }

		document.getElementById("datagranLogout").addEventListener("click", function() {
             datagranButtonOnclick("Logout");
        });
        document.getElementById("datagranOnClick").addEventListener("click", function() {
             datagranButtonOnclick("onClick");
        });
        
        document.getElementById("datagranOnKeyPress").addEventListener("input", function() {
             var str = this.value;
             datagranOnKeyPress(str.charAt(str.length-1));
        });
        document.getElementById("datagranOnFocusChange").addEventListener("focusout", function() {
             datagranOnFocusChange("datagranOnFocusChange");
        });
        document.getElementById("dropdown").addEventListener("change", function() {
            if(this.value != -1)
                datagranDropdownChange(this.id, this.value);
        });

        document.addEventListener("backbutton", onBackKeyDown, false);

var success = function(message) {
    //alert(message);
}

var failure = function(message) {
    //alert(message);
}

function datagranIdentify(userId) {
    //cordova.plugins.datagran.identify(userId, success, failure);
    //_dgTrack('identify', userId);
    dg_tracker.identify(userId); 
    storage.setItem("login", true);
    storage.setItem("username", loginCredentials.username);
    storage.setItem("password", loginCredentials.password);
    setupPageHome(1);
}

function datagranButtonOnclick(name) {
    datagranOnClick(name);
    if(name == "Logout"){
        datagranLogout();
    }
}

function datagranLogout() {
    //cordova.plugins.datagran.resetDGuserid(success, failure);
    //_dgTrack('reset');
    dg_tracker.reset();
    storage.setItem("login", false);
    loginCredentials.username = "";
    loginCredentials.password = "";
    storage.setItem("username", "");
    storage.setItem("password", "");
	document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    setupPageHome(2);
}

function datagranOnClick(actName) {
    var eventJson = {name: actName, type: "AppCompatButton"};
    //cordova.plugins.datagran.trackCustom(trackOnClickEventJson, success, failure);
    //_dgTrack("onClick", eventJson);
    //dg_tracker.trackEvent("onClick", eventJson);
}

/*function datagranOnDoubleClick(actName) {
    var trackOnClickEventJson = {eventName: "onDoubleClick", name: actName, type: "AppCompatButton"};
    cordova.plugins.datagran.trackCustom(trackOnClickEventJson, success, failure);
}*/

function datagranDropdownChange(id, menu) {
    var eventJson = {elementID: id, name: menu};
    //cordova.plugins.datagran.trackCustom(trackDropdownEventJson, success, failure);
    //_dgTrack("DropDown", eventJson);
    dg_tracker.trackEvent("DropDown", eventJson);
}

function datgranTrackViews(view) {
    var eventJson = {viewName: view};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    //_dgTrack("Views", eventJson);
    //dg_tracker.trackEvent("Views", eventJson);
}

function datagranOnKeyPress(val) {
    var eventJson = {value: val};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    //_dgTrack("onKeyPress", eventJson);
    dg_tracker.trackEvent("onKeyPress", eventJson);
}

function datagranOnFocusChange(val) {
    var eventJson = {value: val};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    //_dgTrack("onFocusChange", eventJson);
    dg_tracker.trackEvent("onFocusChange", eventJson);
}


function setupPageLogin(){
    if(storage.getItem("login") === "true") {
        setupPageHome(3);
        return;
    }

    $('#login-button').on('click', function(){
        if($('#username').val().length > 0 && $('#password').val().length > 0){
            loginCredentials.username = $('#username').val();
            loginCredentials.password = $('#password').val();
            datagranIdentify(loginCredentials.username);
            //var outputJSON = JSON.stringify(loginCredentials);
            //loginAuth.login({action : 'login', outputJSON : outputJSON});
        } else {
            alert('Fields must not be empty');
        }
    });

}

function setupPageHome(id) {
    if(id == 1) {
        datgranTrackViews("HomeView");
    } else if(id == 2) {
        datgranTrackViews("LoginView");
    }

    if(storage.getItem("login") === "true") {
        loginCredentials.username = storage.getItem("username");
        loginCredentials.password = storage.getItem("password");
    }

    if(loginCredentials.username.length == 0){
        $.mobile.changePage( "#login", { transition: "slide"} );
        setupPageLogin();
    } else {
        $.mobile.changePage( "#index", { transition: "slide"} );
    }
    //$(this).find('[data-role="header"] h3').append('hi ' + loginCredentials.username);
    //$(this).find('[data-role="header"] h3').append('Tracking');
}

function invokeUpdateGeoParam(val) {
    //cordova.plugins.datagran.updateGeoParam(val, loginSuccess, failure);
    updateGeoParam(val);
}


$(function() {
    $('input:radio[name="radio-choice-h-2"]').change(function() {
        invokeUpdateGeoParam($(this).val());
    });
});

/*var loginAuth = {
    login:function(loginData){
        $.ajax({url: 'http://datagran.io/heartbeat/heartbeatAuth',
            data: loginData,
            async: true,
            beforeSend: function() {
                $.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
            },
            success: function (result) {
                if(result == "true") {
                    $.mobile.changePage( "#index", { transition: "slide"} );
                } else {
                    alert('Login failed. Please try again!');
                }
            },
            error: function (request,error) {
                alert('system or network error. Please try again!');
            }
        });
    }
}*/

$(document).on('pagecreate', '#login', setupPageLogin);
//$(document).on('pagebeforeshow', '#index', setupPageHome);