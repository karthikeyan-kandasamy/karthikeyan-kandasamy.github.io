var dg_tracker;
var regexObj = {
    "re_email_etl": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "re_phone_etl": /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
};
(function () {
    function lib() {
    }
    ;
    lib.time_zones = {
        'tz-12': "America/Baker Island",
        'tz-11': "America/Pago Pago",
        'tz-10': "America/Honolulu",
        'tz-9': "America/Juneau",
        'tz-8': "America/Los Angeles",
        'tz-7': "America/Denver",
        'tz-6': "America/San Jose",
        'tz-5': "America/Bogota",
        'tz-4': "America/Port of Spain",
        'tz-3': "America/Buenos Aires",
        'tz-2': "America/King Edward Point",
        'tz-1': "Africa/Praia",
        'tz0': "Europe/London",
        'tz+1': "Europe/Berlin",
        'tz+2': "Europe/Bucharest",
        'tz+3': "Africa/Khartoum",
        'tz+4': "Asia/Baku",
        'tz+5': "Asia/Islamabad",
        'tz+6': "Asia/Dhaka",
        'tz+7': "Asia/Bangkok",
        'tz+8': "Asia/Hong Kong",
        'tz+9': "Asia/Tokyo",
        'tz+10': "Asia/Port Moresby",
        'tz+11': "Asia/Noumea",
        'tz+12': "Oceania/Wellington",
        'tz+13': "Oceania/Apia"
    };

    lib.getUid = function (aid, domain) {
        var lvu = lib.getCookie('_lvu');
        if (lvu === '')
            return lib.setUid(aid, domain);
        return lvu;
    };
    lib.getSessionId = function (domain) {
        var lvs = lib.getCookie('_lvsa');
        if (lvs === '') {
            return lib.setSessionId(domain, true);
        }
        else {
            return lib.setSessionId(domain, false)
        }
        return lvs;
    };


    lib.getVisitStartTime = function () {
        return lib.getCookie('_lvsb');
    };
    lib.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    };
    lib.setCookie = function (cname, cvalue, time, domain) {
        var d = new Date();
        d.setTime(d.getTime() + time);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + domain;
    };
    lib.delCookie = function (name, domain) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;domain=' + domain;
    };

    lib.generateUUID = function (aid) {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx4xxxyxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return aid + uuid;
    };
    lib.setUid = function (aid, domain) {

        var uuid = lib.generateUUID(aid);
        var time = 5 * 365 * 24 * 60 * 60000;
        if (!domain)
            domain = document.location.hostname;
        lib.setCookie('_lvu', uuid, time, domain);
        return uuid;
    };
    lib.setSessionId = function (domain, flag) {
        var sid;
        var time = 30 * 60000;
        if (!domain)
            domain = document.location.hostname;
        if (flag) {
            sid = lib.generateUUID('s');
            lib.setCookie('_lvsa', sid, time, domain);
            lib.setCookie('_lvsb', new Date().getTime(), time, domain);
        }
        else {
            sid = lib.getCookie('_lvsa');
            lib.delCookie('_lvsa', domain);
            lib.setCookie('_lvsa', sid, time, domain);
        }
        return sid;
    };
    lib.urlencode = function (obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    };
    lib.encodeBase64Params = function (params) {
        return Base64.encode(JSON.stringify(params));

    };
    lib.geteveryEventObj = function (aid, wid, internal_name, domain, customData) {
        var uid = lib.getUid(aid, domain);
        var sessionid = lib.getSessionId(domain);
        var br = lib.getBrowserDetails();
        // var tz = "localtimez";
        var vs = lib.getVisitStartTime();
        var dv = "D";
        var qp = lib.getQueryParams();
        if (lib.mobileAndTabletcheck()) {
            dv = "M";
        }
        var version = "13";
        var out = { "ai": aid, "wi": wid, "ui": uid, "si": sessionid, "in": internal_name, "cd": customData, "br": br, "vs": vs, "dv": dv, "qp": qp, "version": version };
        return out;
    };
    lib.getLocalDateTime = function () {

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }
        var ldate = year + '/' + month + '/' + day;
        var ltime = hour + ':' + minute + ':' + second;
        return { d: ldate, t: ltime };
    }
    lib.getBrowserDetails = function () {
        var details, encoding;
        var navigatorObject = window.navigator;
        var plugins = navigatorObject.plugins;
        if (document.characterSet)
            encoding = document.characterSet;
        else
            encoding = document.charset;
        details = {
            'n': navigatorObject.appCodeName,
            'f': navigatorObject.appName,
            'v': navigatorObject.appVersion,
            'l': navigatorObject.language,
            'ac': navigatorObject.cookieEnabled,
            'cd': screen.colorDepth,
            'vw': window.innerWidth,
            'vh': window.innerHeight,
            'ua': navigatorObject.userAgent,
            'ec': encoding
        };

        return Base64.encode(JSON.stringify(details));
    };

    lib.mobileAndTabletcheck = function () {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    lib.getQueryParams = function () {

        var url = window.location + '';

        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return JSON.stringify(params);
    }

    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        }, decode: function (e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        }, _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, "\n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        }, _utf8_decode: function (e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    }

    dg_tracker = (function () {

        var _this = this;
        var aid, wid, internal_name, domain, customData;
        var setAccount = function (a) {
            aid = a;
        };
        var setWorkspace = function (w) {
            wid = w;
        };
        var setInternalName = function (i) {
            internal_name = i;
        };
        var setDomain = function (b) {
            domain = b;
        };
        var setCustomData = function (n) {
            customData = n;
        };
        var resetUser = function () {
			if (window.DatagranWebInterface) {
    			// Call Android interface
    			window.DatagranWebInterface.reset();
  			} else if (window.webkit && window.webkit.messageHandlers) {
    			// Call iOS interface
        		var message = { command: 'reset' };
    			window.webkit.messageHandlers.datagran.postMessage(message);
  			} else {
    			// Call Web interface
    			//alert("web reset");
            	lib.delCookie('_lvsa', domain);
            	lib.delCookie('_lvu', domain);
  			}
        }
        var getIdentityUser = function (arrayFields, form) {
            var userIdentify = null;

            if (customData) {
                if (customData.type === 'form') {
                    for (var x = 0; x < customData.data.length; x++) {
                        var formId = customData.data[x].id;
                        var formField = customData.data[x].field;

                        for (var j = 0; j < arrayFields.length; j++) {
                            if ((formId && formField) && formId === form.name) {
                                userIdentify = formField === arrayFields[j][0] ? arrayFields[j][1] : null;
                            } else if (formField) {
                                userIdentify = formField === arrayFields[j][0] ? arrayFields[j][1] : null;
                            }

                            if (userIdentify) { break; }
                        }
                    }
                } else if (customData.type === 'regex') {
                    for (var x = 0; x < customData.data.length; x++) {
                        var formRegex = customData.data[x].regex;

                        for (var j = 0; j < arrayFields.length; j++) {
                            userIdentify = regexObj[formRegex].test(arrayFields[j][1]) ? arrayFields[j][1] : null;
                            if (userIdentify) { break; }
                        }

                        if (userIdentify) { break; }
                    }
                }
            } else {
                for (j = 0; j < arrayFields.length; j++) {
                    userIdentify = regexObj["re_email_etl"].test(arrayFields[j][1]) ? arrayFields[j][1] : null;
                    if (userIdentify) { break; }
                }
            }

            arrayFields.push(["user_identify", userIdentify]);

            return arrayFields;
        }
        var track = function (params) {
        	//alert(JSON.stringify(params));
        	if(params.et == "ce" && params.p.en == "identify") {
        		if (window.DatagranWebInterface) {
    				// Call Android interface
				    window.DatagranWebInterface.identify(params.p.ep);
  				} else if (window.webkit && window.webkit.messageHandlers) {
    				// Call iOS interface
        			var message = { command: 'identify', userId: params.p.ep };
    				window.webkit.messageHandlers.datagran.postMessage(message);
  				} else {
    				// Call Web interface
    				//alert("web identify");
    				var event_params, core_params;
            		var l = lib.getLocalDateTime();
            		params.d = l.d;
            		params.s = l.t;
            		event_params = lib.encodeBase64Params(params);
            		core_params = lib.geteveryEventObj(aid, wid, internal_name, domain, customData);
            		core_params = lib.urlencode(core_params);
            		var final_event = core_params + '&ev=' + event_params;
            		var end_point = "https://cdn2-dev.datagran.io/pixel.png?";
            		var img = new Image();
            		img.src = end_point + final_event;
  				}
        	} else {
        	    if (window.DatagranWebInterface) {
    				// Call Android interface
    				if(params.p.en == null) 
				    	window.DatagranWebInterface.trackCustom(params.et, JSON.stringify(params));
				    else
				    	window.DatagranWebInterface.trackCustom(params.p.en, JSON.stringify(params));
  				} else if (window.webkit && window.webkit.messageHandlers) {
    				// Call iOS interface
        			var message;
        			if(params.p.en == null)
        				message = { command: 'trackCustom', name: params.et, parameters: params };
        			else
        				message = { command: 'trackCustom', name: params.p.en, parameters: params };    
    				window.webkit.messageHandlers.datagran.postMessage(message);
  				} else {
    				// Call Web interface
    				//alert("web track custom");
    				var event_params, core_params;
            		var l = lib.getLocalDateTime();
            		params.d = l.d;
            		params.s = l.t;
            		event_params = lib.encodeBase64Params(params);
            		core_params = lib.geteveryEventObj(aid, wid, internal_name, domain, customData);
            		core_params = lib.urlencode(core_params);
            		var final_event = core_params + '&ev=' + event_params;
            		var end_point = "https://cdn2-dev.datagran.io/pixel.png?";
            		var img = new Image();
            		img.src = end_point + final_event;
  				}
        	}
        };
        var trackPageView = function () {
            var payload = {
                title: document.title,
                url: window.location.href,
                ref: document.referrer
            };
            var params = {
                et: 'pv',
                p: payload
            };
            track(params);
        };

        var trackFormSubmit = function () {
            var common_call = function (e) {
                e = e || window.event;
                var form = e.target || e.srcElement;

                //get all form elements except password
                var elements = form.elements;
                var el_array = [];

                for (var i = 0, element; element = elements[i++];) {
                    var str = [];
                    if (element.type !== "password") {
                        str[0] = element.name;
                        str[1] = element.value;
                        el_array.push(str);
                    }

                }

                el_array_fields = getIdentityUser(el_array, form);

                var payload = {
                    name: form.name,
                    class: form.className,
                    id: form.id,
                    action: form.action,
                    method: form.method,
                    pu: window.location.href,
                    fieldvals: el_array_fields
                };
                JSON.stringify(payload);
                var params = {
                    et: 'fs',
                    p: payload
                };
                track(params);
            }
            var els = document.querySelectorAll('form');
            for (var i = els.length; i--;) {
                if (document.addEventListener) {
                    els[i].addEventListener('submit', function (e) {
                        common_call(e);
                    });
                } else {
                    els[i].attachEvent('onsubmit', function (e) {//<=IE8
                        common_call(e);
                    });
                }
            }

        };

        var trackElementClick = function () {
            var els = document.querySelectorAll("a,button,select,input, textarea");
            var anchor = "";
            var payload = "";
            var curr_link = "";
            var common_call = function (e) {
                e = e || window.event;
                curr_link = e.currentTarget || e.srcElement;

                if (curr_link.tagName === "A") {

                    var splited_href = curr_link.href.split('#');
                    if (splited_href[1] != undefined) {
                        anchor = splited_href[1];
                    }
                    payload = {
                        tag: "a",
                        class: curr_link.className,
                        id: curr_link.id,
                        text: (e.target || e.srcElement).innerText,
                        anchor: anchor,
                        pu: window.location.href
                    };
                }
                else {
                    payload = {
                        tag: curr_link.tagName,
                        class: curr_link.className,
                        id: curr_link.id,
                        name: curr_link.name,
                        pu: window.location.href
                    };
                }


                var params = {
                    et: 'click',
                    p: payload
                };
                track(params);
            }
            for (var i = els.length; i--;) {
                if (document.addEventListener) {
                    els[i].addEventListener('click', function (e) {

                        common_call(e);
                    });
                } else {
                    els[i].attachEvent('onclick', function (e) { //<=IE8
                        common_call(e);
                    });
                }
            }

        }

        var trackEvent = function (en, params) {

            var ev = {
                'en': en,
                'ep': params,
                'pu': window.location.href
            }
            var params = {
                et: 'ce',
                p: ev,
            };
            track(params);
        }

        return {
            init: function (a, w, i, d, n) {
                setAccount(a);
                setWorkspace(w);
                setDomain(d);
                setInternalName(i);
                setCustomData(n);
                trackPageView();
                trackFormSubmit();
                trackElementClick();
            },
            trackEvent: function (en, params) {
                trackEvent(en, params);
            },
            identify: function (custom_user_id) {
                trackEvent('identify', custom_user_id)
            },
            reset: function () {
                resetUser();
            }
        }
    })();

    dg_tracker.init(
        window.datagran.aid,
        window.datagran.wid,
        window.datagran.internal_name || '',
        window.datagran.domain,
        window.datagran.customData);

    if (window._dgQ && typeof window._dgQ === 'object') {

        if (Object.keys(window._dgQ).length > 0) {
            for (var i = 0; i < window._dgQ.length; i++) {

                qObj = window._dgQ[i];
                fn = 'trackEvent';//qObj[0];
                en = qObj[0];
                params = qObj[1];
                dg_tracker.trackEvent(en, params)
                //dg_tracker[fn](params);
            }
        }
    }
})();

