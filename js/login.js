var storage = window.localStorage;

var loginCredentials = { username : "", password : "" }

var success = function(message) {
    //alert(message);
}

var loginSuccess = function(message) {
    storage.setItem("login", true);
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    storage.setItem("username", loginCredentials.username);
    storage.setItem("password", loginCredentials.password);
    setupPageHome(1);
}

var failure = function(message) {
    alert(message);
}

function datagranIdentify(userId) {
    //cordova.plugins.datagran.identify(userId, loginSuccess, failure);
    alert(userId);
}

function datagranButtonOnclick(name) {
    datagranOnClick(name);
    if(name == "Logout"){
        datagranLogout();
    }
}

function datagranLogout() {
    cordova.plugins.datagran.resetDGuserid(success, failure);
    storage.setItem("login", false);
    loginCredentials.username = "";
    loginCredentials.password = "";
    storage.setItem("username", "");
    storage.setItem("password", "");
    setupPageHome(2);
}

function datagranOnClick(actName) {
    var trackOnClickEventJson = {eventName: "onClick", name: actName, type: "AppCompatButton"};
    //cordova.plugins.datagran.trackCustom(trackOnClickEventJson, success, failure);
    alert(actName);
}

/*function datagranOnDoubleClick(actName) {
    var trackOnClickEventJson = {eventName: "onDoubleClick", name: actName, type: "AppCompatButton"};
    cordova.plugins.datagran.trackCustom(trackOnClickEventJson, success, failure);
}*/

function datagranDropdownChange(id, menu) {
    var trackDropdownEventJson = {eventName: "DropDown", elementID: id, name: menu};
    //cordova.plugins.datagran.trackCustom(trackDropdownEventJson, success, failure);
    alert(menu);
}

function datgranTrackViews(view) {
    var trackTrackViewJson = {eventName: "Views", viewName: view};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    alert(view);
}

function datagranOnKeyPress(val) {
    var trackTrackViewJson = {eventName: "onKeyPress", value: val};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    alert(val);
}

function datagranOnFocusChange(val) {
    var trackTrackViewJson = {eventName: "onFocusChange", value: val};
    //cordova.plugins.datagran.trackCustom(trackTrackViewJson, success, failure);
    alert(val);
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

function invokeCordova(val) {
    //cordova.plugins.datagran.updateGeoParam(val, loginSuccess, failure);
    alert(val);
}


$(function() {
    $('input:radio[name="radio-choice-h-2"]').change(function() {
        invokeCordova($(this).val());
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