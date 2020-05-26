/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//var touchtime = 0;
var storage = window.localStorage;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        if(storage.getItem("login") === "true") {
            datgranTrackViews("HomeView");
        } else {
            datgranTrackViews("LoginView");
        }
        document.getElementById("datagranLogout").addEventListener("click", function() {
             datagranButtonOnclick("Logout");
        });
        document.getElementById("datagranOnClick").addEventListener("click", function() {
             datagranButtonOnclick("onClick");
        });
        /*document.getElementById("datagranOnDoubleClick").addEventListener("dblclick", function() {
             datagranOnDoubleClick("Double Click");
        });*/
        /*document.getElementById("datagranOnDoubleClick").addEventListener("click", function() {
            if (touchtime == 0) {
                // set first click
                touchtime = new Date().getTime();
            } else {
                // compare first click to this click and see if they occurred within double click threshold
                if (((new Date().getTime()) - touchtime) < 2000) {
                    // double click occurred
                    //alert("double clicked");
                    datagranOnDoubleClick("Double Click");
                    touchtime = 0;
                } else {
                    // not a double click so set as a new first click
                    touchtime = new Date().getTime();
                }
            }
        });*/
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

        if(storage.getItem("login") === "true")
            document.querySelector('#datagranOnFocusChange').focus();
        else
            document.querySelector('#username').focus();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
    }

};

app.initialize();

function onBackKeyDown(e) {
    e.preventDefault();
}
