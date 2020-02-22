// client-side-search.js
// Demonstrate client side fast filter & sort for client side search of moderate sized data sets.
// requires splay-search-tree.js

/* Parse the list of certs and build a splay tree with
index back to lines.  The splay tree gives us a fast
way to find all lines that contain a token that matches
the supplied search string. */
function parseCertOfNeedData(context, data) {
    var tout = {};
    tout.rows = [];
    var rout = tout.rows;
    tout.keys = { 'c': {}, l: [] };
    var rows = data.split("\n");
    for (var rowndx in rows) {
        var arow = rows[rowndx]
        var arow = arow.trim().split("^");
        if ((arow.length > 1) && (arow > " ")) {
            rout.push(arow)
            var name = arow[1];
            var tokens = name.split(/\s/);
            for (var tndx in tokens) {
                var atoken = tokens[tndx].toLowerCase().trim();
                updateSplay(tout.keys, rowndx, atoken);
            }
        }
    }
    return tout;
}

// Process message header data received from server
function getListOfCertOnData(data, httpObj, parms) {
    var context = parms.context;
    if (data <= "") {
        console.log("getListOfCert() err=" + httpObj);
        toDiv("ErrorMsg", "Failure getListOfCert\n" + httpObj);
    } else {
        context.isDirty = false;
        context.certList = parseCertOfNeedData(parms.context, data);
        context.lastLoad = curr_time();
        renderFilteredList(parms.divId, context);
    }
}


// Fetch Certificate of Need for a given Cert 
function getListOfCert(divId, context) {
    var parms = {};
    req_uri = "/data/cert-of-need/index.txt"
    parms.req_headers = {
        'Content-Type': "application/json",
        'Authorization': GContext.accessToken
    };
    parms.req_method = "GET";
    parms.context = context;
    parms.divId = divId;
    simpleGet(req_uri, getListOfCertOnData, parms)
}


function renderList(divid, certList, searchStr) {
    var b = new String_builder;
    var rows = certList.rows;
    b.start("div", { "id": "certlist_chars" });
    for (var cndx in certList.keys.c) {
        var achar = certList.keys.c[cndx];
        b.start("div", { "class": "certlist_char_key" })
        b.b(cndx);
        b.b("  ");
        b.b(achar.cnt);
        b.finish("div");
    }

    b.start("div", { "id": "cert_list_search_res" });
    for (var ndx in rows) {
        var row = rows[ndx];
        b.add("<li>" + row[0] + " " +  row[1] + "</li>\n")
    }
    b.finish("div");
    b.toDiv(divid);
}


function renderFilteredList(divId, context) {
    renderList(divId, context.certList, "h");
}

function filterChange(fld, context) {
    var fldVal = fld.value.trim().toLowerCase();
    if ((fldVal <= "") || (fldVal === context.lastSearchStr)) {
        return;
    }
    context.lastSearchStr = fldVal;
    var tkarr = fldVal.split(/\s/);
    var clist = [];
    var tmpContext = { 'rows': clist, 'keys': {} }
    for (var tkndx in tkarr) {
        var atoken = tkarr[tkndx];
        var matchObj = findMatchLevel(context.certList.keys, atoken);
        if (matchObj !== null) {
            for (var xx in matchObj.l) {
                var rowndx = parseInt(matchObj.l[xx]);
                clist.push(context.certList.rows[rowndx]);
            }   
        }
    }
    renderList("certList", tmpContext, fldVal);
}

