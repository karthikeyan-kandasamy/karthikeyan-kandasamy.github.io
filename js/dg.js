(function (w,d,e,o) {
    var l = d.createElement("script");
    _dgQ = [];
    l.type = "text/javascript";
    l.async = 1;
    l.src = e;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(l, s);
    w[o] = window[o] || [];
    w[o].aid = "5edef365368cd52c35c70eb1";
    w[o].wid = "5e70d08e3bf4f2a57966afca";
    w[o].domain = "karthikeyan-kandasamy.github.io";
    w[o].internal_name = "Karthik_Test_1";
})(
  window, document,
  "js/datagran.js",
  "datagran"
);
_dgTrack = function (n, p) {
  if (window.dg_tracker && typeof window.dg_tracker === 'object') {
      window.dg_tracker.trackEvent(n, p)
  }
  else {
      _dgQ.push([n, p]);
  }
}