'use strict';
var GTX = {
    forms: {}, // A list of forms by Id that have been loaded
    formContexts: {},
    filesLoading: {}, // list of files currently being loaded used to avoid duplicate load by uri
    filesLoaded: {}, // list of files already loaded used to avoid reload by uri
    widgets: {}, // list of  widgets already loaded by widget Id
    dataObj: {}, // list of dataObj already loaded by Object Id
    newObIdCnt: 0,
    activeAutoSug: {}, // List of form contexts rendered to 
    formStack: {},
    user: {
        "accessToken": "282872727" // Will need to get a real access token
    }
};

function gattr(ele, name) {
    return ele.getAttribute(name);
}

const safeFiNameExp1 = /[\:\/\\\s\?\@\#\(\)\[\]\<\>\=\|\{\}\%\$\^\+\,\?\"\'\`\~\!]/gi;
const safeFiNameExp2 = /\._/g;
const safeFiNameExp3 = /_\./g;
const safeFiNameExp4 = /_\./g;
const safeFiNameExp5 = /\.\./g
const safeFiNameExp6 = /__/g;
const safeFiNameExp7 = /--/g;
// Modify a given string so it could be used as a safe
// component of a FiName or URI. It must be synchronized
// with makeFiNameSafe() in providers_process_raw.py or
// some search functions will fail. 
function makeSafeFiName(astr) {
    var tout = (astr.toUpperCase().trim()
        .replace(safeFiNameExp1, "_")
        .replace(safeFiNameExp2, "_")
        .replace(safeFiNameExp3, ".")
        .replace(safeFiNameExp4, "_")
        .replace(safeFiNameExp5, ".")
        .replace(safeFiNameExp6, "_")
        .replace(safeFiNameExp7, "-")
    );
    return tout;
}

function mformsAddAjaxSecurityContext(parms, context) {
    if (parms.req_headers == undefined) {
        parms.req_headers = {};
    }
    parms.req_headers.Authorization = context.gbl.user.accessToken;
}

// Cache data with a key alternative to the URI and cache 
// it at the context specified rather than as a gbl.  Intended
// to allow caching by widget ID within a single form.
function cacheQueryRes(context, key, data) {
    if (context.queries == undefined) {
        context.queries = {};
    }
    context.queries[key] = {
        "time": curr_time(),
        "data": data
    };
}
//--------------
//--- INTERACTION / OnClick / EVENTS
//---------------
// TODO: Hide the bottom of the group box when hidden.
function toggleDivEvent(sender, groupId) {
    var contentDivId = groupId + "Content";
    var iconDivId = groupId + "expIcon";
    var tdiv = document.getElementById(contentDivId);

    if ((tdiv !== undefined) && (tdiv !== null)) {
        var lastStyle = tdiv.style.lastStyle;
        if (tdiv.style.display != "none") {
            tdiv.style.lastStyle = tdiv.style.display;
            tdiv.style.display = "none";
            toDiv(iconDivId, "&#8664;");
            //sender.className = "arrow-down";
        } else {
            if (lastStyle != undefined) {
                tdiv.style.display = lastStyle;
            } else {
                tdiv.style.display = "flex";
            }
            //sender.className = "arrow-up";
            toDiv(iconDivId, "&#8662;");
        }
    }
    return tdiv;
}

function mformSaveFormChanges(hwidget) {
    var attr = hwidget.attributes;
    var formId = gattr(hwidget, "form_id");
    var widId = hwidget.id;
    var dataObjId = gattr(hwidget, "dataObjId");
    var context = GTX.formContexts[formId][dataObjId];
    console.log("in save form changes widId=", widId, "formId=", formId, " dataObjId=", dataObjId, "context=", context);
}

/* Recieves callback when the the inut widget looses focus
used mainly to hide auto suggest when visible */
function widgetLooseFocus(hwidget) {
    var widId = hwidget.id.split("-_")[0];
    var widDef = GTX.widgets[widId];
    // Add some logic to cleanup if needed.



    // Note: Can not put auto suggest hide
    // here because text box  loose focus when 
    // selecting from auto suggest.
}

function widgetOnKeyDown(hwidget, event) {
    var keyCode = event.keyCode;
    if (keyCode == 27) {
        var widId = hwidget.id.split("-_")[0];
        //var widDef = GTX.widgets[widId];
        var asugId = widId + "sugCont";
        toDiv(asugId, "");
        hideDiv(asugId);
    }
}

function hideAllAutoSug() {
    var delkey = [];
    for (var widWithAutoSug in GTX.activeAutoSug) {
        var asugId = GTX.activeAutoSug[widWithAutoSug];
        toDiv(asugId, "");
        hideDiv(asugId);
        delkey.push(asugId);
    }
    for (var tndx in delkey) {
        var tid = delkey[tndx];
        delete GTX.activeAutoSug[tid];
    }
}

function widgetGainFocus(hwidget) {
    var widId = hwidget.id.split("-_")[0];
    var widDef = GTX.widgets[widId];
    // hide any other widgets that have
    // auto suggest open
    var delkey = [];
    for (var widWithAutoSug in GTX.activeAutoSug) {
        if (widWithAutoSug != widId) {
            var asugId = GTX.activeAutoSug[widWithAutoSug];
            toDiv(asugId, "");
            hideDiv(asugId);
            delkey.push(asugId);
        }
    }
    for (var tndx in delkey) {
        var tid = delkey[tndx];
        delete GTX.activeAutoSug[tid];
    }
}



function mformValidateFieldValue(context, dataObj, widDef, hwidget, fldVal) {
    var widIdFull = hwidget.id;
    if (isObject(widDef.valid_fun)) {
        widDef.valid_fun = [widDef.valid_fun];
    }
    var statusDiv = widIdFull + "Status";
    // Process Validation RegEx Patterns
    if ("valid_pat" in widDef) {
        var vpat = widDef.valid_pat;
        // If single validation pattern convert to array
        // so we can treat the main logic as an array
        if (isString(vpat.pattern)) {
            vpat.pattern = [vpat.pattern];
        }

        // Walk the Validation patterns and apply them 
        // if needed.
        var numPat = vpat.pattern.length;
        var errMsg = null;
        for (var pndx = 0; pndx < numPat; pndx++) {
            var pat = vpat.pattern[pndx];
            try {
                var compRePat = new RegExp(pat);
                var testRes = compRePat.test(fldVal);
                if (testRes == false) {
                    errMsg = vpat.message;
                } else {
                    errMsg = null; // valid at least one sucess match
                    break;
                }
            } catch (err) {
                console.log("L64: Error trying to apply RE pattern: " + pat + "FldVal=" + fldVal + " err=" + err);
            }
        }
        // Display or hide status message as needed.
        if (errMsg != null) {
            showDiv(statusDiv);
            toDiv(statusDiv, errMsg);
            return false;
        } else {
            toDiv(statusDiv, "");
            hideDiv(statusDiv);
        }
    } // at least one valid_pat to check.
    // Process Validation Functions
}


// Receive the Change events from the individual widgets.
// use metadata encoded in the widget to lookup a context
// use that context to validate data,  reformat the data,
// enable auto suggest and update underlying DOM model
function mformFieldChanged(hwidget) {
    var attr = hwidget.attributes;
    var widIdFull = hwidget.id;
    var widId = widIdFull.split("-_")[0];
    var widDef = GTX.widgets[widId];
    var dataContext = widDef.data_context;
    var dataContextOvr = gattr(hwidget, "data_context");
    if (dataContextOvr > "") {
        // override the widget data context with the 
        // value encoded into the widget if present.
        // needed this to support array elements that 
        // require a differnt data context for every row of every cell.
        dataContext = dataContextOvr;
    }
    var formId = gattr(hwidget, "form_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var context = GTX.formContexts[formId][dataObjId];
    var dataObj = GTX.dataObj[dataObjId];
    var fldVal = null;
    if (widDef.type == "radio") {
        if (hwidget.checked == true) {
            fldVal = hwidget.value;
        } else {
            fldVal = "NULL";
        }
    } else if (widDef.type == "checkbox") {
        if (hwidget.checked == true) {
            fldVal = true;
        } else {
            fldVal = false;
        }
    } else if (hwidget.multiple == true && widDef.type == "dropdown") {
        fldVal = []
        for (var [key, option] of Object.entries(hwidget)) {
            if (option.selected == true) {
                fldVal.push(option.value);
            }
        }
    } else {
        // read value like we do as text field.
        fldVal = hwidget.value.trim();
    }


    // Apply Field Level Transforms as specified in the metadata
    // TODO:  Create a set of wiget types as an object that should not
    //  apply transforms so we can skip them without a complex if here
    if ((widDef.force_upper_case == true) && (fldVal != null) && (widDef.type != "dropdown") && (widDef.type != "radio")) {
        fldVal = fldVal.toUpperCase();
        if (hwidget.value != fldVal) {
            hwidget.value = fldVal;
        }
    }


    var isValdVal = mformValidateFieldValue(context, dataObj, widDef, hwidget, fldVal);
    var oldFldVal = getNested(dataObj, dataContext, null);
    var saveFlg = true;
    if ((fldVal != oldFldVal) && (fldVal != null)) {
        // Data has actually changed so we can upate the domain object
        if ((widDef.type == "dropdown") && (oldFldVal == null) && (fldVal == "NULL")) {
            // Do not save to the tree if we get the speical sentinal NULL
            // when there is no value in the exisitng DOM record. 
            saveFlg = false;
            // TODO:  If user sets to NULL and the value exists then
            // remove it from the DOM tree all together.
        }

        if (saveFlg == true) {
            setNested(dataObj, dataContext, fldVal);
            refreshShowDataObj(context);
        }

        // Process Auto Suggest
        if ("suggest" in widDef) {
            var sug = widDef.suggest;
            var sugContId = widIdFull + "sugCont";
            var dispVal = fldVal.toUpperCase().trim();
            if (dispVal > " ") {
                var extParms = {
                    "wid_value": fldVal.trim(),
                    "auto_sug_value": dispVal
                };
                var suguri = InterpolateStr(sug.uri, [extParms, widDef, context.dataObj, context, context.form_def, context.gContext]);
                var rparms = {
                    "id": sugContId,
                    "widId": widDef.id,
                    "fullWidId": widIdFull,
                    "context": context,
                    "uri": suguri,
                    "widDef": widDef,
                    "dataObj": dataObj,
                    "value": dispVal,
                    "targetDiv": sugContId,
                    "data_context": dataContext
                };
                requestAutoSuggest(rparms);
            } else {
                toDiv(sugContId, "");
                hideDiv(sugContId);
            }
        }
    }
    if (widDef.isCol == true) {
        tableCellChanged(hwidget);
    }
    // console.log("FieldChanged", widId, "fldVal=", fldVal, "formId=", formId,
    //   " dataObjId=", dataObjId, "context=", context, "dataObj", dataObj);
    processOnChangeSpec(hwidget, context, widDef);
    processOnChangeSpec(hwidget, context, context.form);


    //TODO:  Add Field Validation and Error Message Here
    //TODO: Mark field context as dirty
    //TODO: Mark field invalid if any fields fail validation
}


// Process the onchange spec from either the active widget
// or the form.  Call either the direct named function 
// or the function named in the function parameter of the 
// widget specified.
function processOnChangeSpec(hwidget, context, workObj) {
    var onch = workObj.onchange;
    if (onch == undefined) {
        return;
    }
    var gtx = context.gbl;
    if (isString(onch)) {
        onch = [onch];
    }
    for (var ondx in onch) {
        var oncit = onch[ondx];
        var fn = window[oncit];
        if (typeof fn === "function") {
            // value was function name
            fn(hwidget, context, workObj);
            continue;
        }
        var widDef = gtx.widgets[oncit];
        if (widDef == undefined) {
            continue;
        }

        var callFunc = widDef.function;
        if (callFunc == undefined) {
            continue;
        }
        fn = window[callFunc];
        if (typeof fn === "function") {
            fn(hwidget, context, widDef);
        } else {
            console.log("Could not find function named=" + callFunc);
        }
    }
}

function mformFieldInput(hwidget) {
    mformFieldChanged(hwidget);
}

function mformsButtonClicked(hwidget) {
    var attr = hwidget.attributes;
    var widIdFull = hwidget.id;
    var widId = widIdFull.split("-_")[0];
    var widDef = GTX.widgets[widId];
    var dataContext = widDef.data_context;
    var dataContextOvr = gattr(hwidget, "data_context");
    if (dataContextOvr > "") {
        // override the widget data context with the 
        // value encoded into the widget if present.
        // needed this to support array elements that 
        // require a differnt data context for every row of every cell.
        dataContext = dataContextOvr;
    }
    var formId = gattr(hwidget, "form_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var context = GTX.formContexts[formId][dataObjId];
    var dataObj = GTX.dataObj[dataObjId];
    var action = widDef.onclick;
    if (action == undefined) {
        console.log("WARN: No Action defined widId=", widId, " widDef=", widDef);
        return;
    }
    if (isString(action)) {
        action = [action];
    }

    for (var andx in action) {
        var tact = action[andx];
        var intAct = InterpolateStr(tact, [context.dataObj, widDef, context.form, context, context.gbl]);
        // Lookup as function and call if found.

        // Lookup as widget and process like it was called
        // from the onchange event if so. 
        console.log("TODO: buttonClicked Take action on the interpolated string");
    }

}



// When a table column header is clicked default behavior is
// to sort the table on that column. This function receives the
// sort event. 
function mformsColHeadClicked(hwidget) {
    var formId = gattr(hwidget, "form_id");
    var tblId = gattr(hwidget, "table_id");
    var colId = gattr(hwidget, "col_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var widDef = GTX.widgets[tblId];
    var dataContext = widDef.data_context;
    var context = GTX.formContexts[formId][dataObjId];
    var dataObj = GTX.dataObj[dataObjId];
    var dataArr = getNested(dataObj, dataContext);
    // TODO: Set Sort Specification for this column
    widDef.userSortCol = colId;
    var targetDiv = tblId + "Cont";

    // TODO: Set Build The Sort Keys with pointers to data records


    // TODO: Re-Render the HTML for the Table and replace it in the container
    var b = new String_builder();
    mformsRenderEditableTable(widDef, b, context, {
        "skip_container": true
    });
    b.toDiv(targetDiv);

}

// when table cells change we may need to do 
// special things like update totals
function tableCellChanged(hwidget) {
    var widId = hwidget.id.split("-_")[0];
    //var colId = gattr(hwidget, "col_id");
    var widDef = GTX.widgets[widId];
    if ((widDef.isCol == true) && (widDef.total_cell)) {
        var formId = gattr(hwidget, "form_id");
        var tblId = gattr(hwidget, "table_id");
        var tblDef = GTX.widgets[tblId];
        var dataObjId = gattr(hwidget, "dataObjId");
        var eleId = formId + tblId + widId + "total";
        var tblDataContext = tblDef.data_context;
        //var context = GTX.formContexts[formId][dataObjId];
        var dataObj = GTX.dataObj[dataObjId];
        var dataArr = getNested(dataObj, tblDataContext);
        var newTotal = mformsCalcArrTotal(dataArr, widDef.data_context);
        var outStr = newTotal;
        if (widDef.num_dec != undefined) {
            outStr = newTotal.toFixed(widDef.num_dec);
        }
        toDiv(eleId, outStr);
    }
}

function addTableRowButton(hwidget) {
    var formId = gattr(hwidget, "form_id");
    var tblId = gattr(hwidget, "table_id");
    var colId = gattr(hwidget, "col_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var widDef = GTX.widgets[tblId];
    var dataContext = widDef.data_context;
    var context = GTX.formContexts[formId][dataObjId];
    var dataObj = GTX.dataObj[dataObjId];
    var dataArr = getNested(dataObj, dataContext);
    // TODO: Set Sort Specification for this column
    widDef.userSortCol = colId;
    var targetDiv = tblId + "Cont";
    dataArr.push({});

    // TODO: Re-Render the HTML for the Table and replace it in the container
    var b = new String_builder();
    mformsRenderEditableTable(widDef, b, context, {
        "skip_container": true
    });
    b.toDiv(targetDiv);
}


// --------------
// ---- Rendering Support Functions 
// --------------

var widgRenderFuncs = {
    "widgetGroup": mformsRenderGroupWidget,
    "text": mformsRenderTextWidget,
    "textarea": mformsRenderTextWidget,
    "button": mformsRenderButton,
    "dropdown": mformRenderDropdown,
    "radio": mformRenderRadio,
    "checkbox": mformsRenderTextWidget,
    "date": mformsRenderTextWidget,
    "table": mformsRenderEditableTable,
    "simple_search_res": mformsRenderSimpleSearchRes,
    "tabbar": mformsRenderTabBar,
    "emptydiv": mformsRenderEmptyDiv
};
// "col": mformsRenderColumn

var mformTextFieldCopyAttr = {
    "size": true,
    "placeholder": true,
    "maxlength": true,
    "min": true,
    "max": true,
    "step": true,
    "autofocus": true,
    "disabled": true,
    "align": true,
    "pattern": true,
    "rows": true,
    "cols": true,
    "label": true,
    "class": true,
    "form_id": true,
    "dataObjId": true,
    "title": true,
    "jimbo": true
};

// Add a custom rendering function to the set of 
// pre-registered rendering functions. 
function mformAddRenderFunc(widgetType, renderFunc) {
    widgRenderFuncs[widgetType] = renderFunc;
}

// Check widget defenition for missing things like
// class and set them to reasonable defaults
function mformFixupWidget(widDef, context) {
    if (!("id" in widDef)) {
        console.log("ERROR: Widget Defenition must contain a Unique ID widDef=" + JSON.stringify(widDef));
    }
    if (!("class" in widDef)) {
        widDef.class = "input_field";
    }
    if (!("type" in widDef)) {
        widDef.type = "text";
    }
    if (!("data_type" in widDef)) {
        widDef.data_type = "text";
    }

    return widDef;
}

// Copy over the Attributes we are interested in 
// as is.
function mformCopyAttribs(widDef, widAttr, copySpec) {
    for (var atname in widDef) {
        var lcname = atname.toLowerCase();
        if (lcname in copySpec) {
            widAttr[atname] = stripQuotes(widDef[atname]);
        }
    }
}

function getDataValue(dataObj, widDef, context, custParms) {
    var dataPath = makeDataContext(widDef, context, custParms)
    if (dataPath == undefined) {
        alert("ERROR Widget Data Context is not specified " + JSON.stringify(widDef));
    }
    var dataVal = getNested(dataObj, dataPath, null);
    if ((dataVal == null) && (widDef.default != undefined)) {
        dataVal = widDef.default;
        setNested(dataObj, dataPath, dataVal);
    }
    return dataVal;
}

// Compute a data context that is either the simple data context
// specified in the widget or has been adjusted to reflect
// it's location in an array structure.
function makeDataContext(widDef, context, custParms) {
    var pathout = [];
    if ("arrayStack" in custParms) {
        var tarr = custParms.arrayStack;
        for (var sndx in tarr) {
            var sele = tarr[sndx];
            pathout.push(sele.path);
            pathout.push("[" + sele.ndx + "]");
        }
        pathout.push(widDef.data_context);
        custParms.data_context = pathout.join(".");
    } else {
        custParms.data_context = widDef.data_context;
    }
    return custParms.data_context;
}

// Compute a unique Id for a givent widget.  When it is a simple
// widget will just be the ID.  when the widget is part of an
// array it will include the array access path 
function makeId(widDef, context, custParms) {
    if (custParms.arrayStack != undefined) {
        var tarr = custParms.arrayStack;
        var ts = "";
        for (var sndx in tarr) {
            var sele = tarr[sndx];
            ts += "_" + sele.path + "_" + sele.ndx;
        }
        custParms.id = widDef.id + "-" + ts;
    } else {
        custParms.id = widDef.id;
    }
    return custParms.id;
}


function mformBasicWidAttr(widDef, context, custParms) {
    var widId = makeId(widDef, context, custParms);
    var data_context = makeDataContext(widDef, context, custParms);
    var widAttr = {
        'id': widId,
        //'onblur': fieldSpec.onchange + "(" + onChgParms + ")",
        //'onchange': fieldSpec.onchange + "(" + onChgParms + ")",
        'type': widDef.type,
        'onChange': 'mformFieldChanged(this)',
        'onInput': 'mformFieldInput(this)',
        'dataObjId': context.dataObjId,
        'form_id': context.form_id
    };

    if (widId != widDef.id) {
        widAttr.wid_id = widDef.id;
    }

    if (data_context != widDef.data_context) {
        widAttr.data_context = data_context;
        widAttr.isArray = true;
    }
    return widAttr;
}


// Start rendering the widget with common logic
// for label and container. 
function mformStartWidget(widDef, b, context, custParms) {
    var widId = makeId(widDef, context, custParms);
    var cssClass = widDef.class;
    if ("widIdRow" in custParms) {
        widId = custParms.widIdRow;
    }
    if (widDef.force_wrap == true) {
        cssClass = "forceWrap " + cssClass;
    }

    if (custParms.skip_container != true) {
        b.start("div", {
            "id": widId + "Cont",
            "class": cssClass + "Cont"
            //"wid_id": widId,
            //"form_id": context.form_id,
            //"dataObjId": context.dataObjId,
        }).nl();
    }

    var labelClass = widDef.class + "Label";
    if (widDef.label_class != undefined) {
        labelClass = widDef.label_class + " " + labelClass;
    }
    if ("label" in widDef)
        if ((widDef.skip_label != true) && (custParms.skip_label != true)) {
            // Add Div with Label
            b.make("label", {
                "class": labelClass,
                "for": widId,
                "id": widId + "Label"
            }, widDef.label);
        }
    return b;
}

function mformFinishWidget(widDef, b, context, custParms) {
    b.make("div", {
        "class": "fieldStatusMsg",
        "id": custParms.id + "Status"
    }).nl();
    if (custParms.skip_container != true) {
        b.nl().finish("div").nl();
    }
    return b;
}


// --------------------
// --- Primary Rendering Functions
// --------------------

function mformsRenderEmptyDiv(widDef, b, context, custParms) {
    b.make("div", {
        "class": widDef.class,
        "id": widDef.id
    });
}


function mformsRenderButton(widDef, b, context, custParms) {
    b.start("div", {
        "class": widDef.class + "contain"
    });
    var attr = mformBasicWidAttr(widDef, context, custParms);
    mformCopyAttribs(widDef, attr, mformTextFieldCopyAttr);
    copyOverCustParms(attr, widDef, custParms);
    attr.type = "button";
    attr.onClick = "mformsButtonClicked(this)";
    b.make("button", attr, widDef.label);
    b.finish("div");
}

function mformsRenderGroupWidget(widDef, b, context, custParms) {
    var gtx = context.gbl;
    var flds = gtx.widgets;
    var parClass = parent.class;
    var cssClass = widDef.class;
    var widId = makeId(widDef, context, custParms);
    b.start("div", {
        "id": widDef.id + "Cont",
        "class": cssClass + "Cont"
    });

    var rendFieldSet = getNested(widDef, "renderFieldset", true);
    if (rendFieldSet == true) {
        b.start("fieldset", {
            "id": widId + "FS",
            "class": cssClass + "FS"
        });
    }

    var contDivName = widId + "Content";
    var contDivAttr = {
        "id": contDivName,
        "class": "groupContentDiv"
    };
    if ("label" in widDef) {
        b.start("legend", {
            "id": widId + "Legend",
            "class": cssClass + "Leg",
            "onclick": "toggleDivEvent(this, '" + widId + "')"
        });
        b.b(widDef.label);
        var arrowClass = "arrow";
        var arrSymbol = "&#8662;";

        if (widDef.collapsed == true) {
            contDivAttr.style = "display:None;";
            arrowClass = "arrow";
            arrSymbol = "&#8664;";
        }
        b.make("div", {
            "class": arrowClass,
            "id": widId + "expIcon"
        }, arrSymbol);
        b.finish("legend");
    }
    b.start("div", contDivAttr);
    if ("widgets" in widDef) {
        mformsRenderWidgets(widDef, widDef.widgets, b, context, custParms);
    }
    b.finish("div");
    if (rendFieldSet == true) {
        b.finish("fieldset");
    }
    b.finish("div");
}

function mformRenderRadio(widDef, b, context, custParms) {
    var gtx = context.gbl;
    var widId = widDef.id;
    custParms.skip_label = true;
    mformStartWidget(widDef, b, context, custParms);
    // Add the actual Text Widget
    var widAttr = mformBasicWidAttr(widDef, context, custParms);
    mformCopyAttribs(widDef, widAttr, mformTextFieldCopyAttr);
    copyOverCustParms(widAttr, widDef, custParms);
    var fldName = widDef.id + "Name";
    widAttr.name = fldName;
    //widAttr["-webkit-appearance"] = "none";
    delete widAttr.onChange;
    delete widAttr.onInput;
    widAttr.id = widDef.id + "FS";
    if ("label" in widDef) {
        b.make("div", {
            "class": widDef.class + "label",
            "id": widDef.id + "legend",
            "name": fldName,
        }, widDef.label);
    }

    b.start("fieldset", widAttr).nl();

    var matchOptVal = null;

    var dataObj = context.dataObj;
    var dataVal = getDataValue(dataObj, widDef, context, custParms);

    var opt = null;
    var optndx = null;
    if ("option" in widDef) {

        // TODO: Move this to function MatchChoice
        var options = widDef.option;
        if (dataVal != null) {
            // Find the matching option and default
            var dataValMatch = dataVal.trim().toLowerCase();
            // search options to find one that matches the 
            // value. 
            for (optndx in options) {
                opt = options[optndx];
                if ("value" in opt) {
                    var oval = opt.value.trim().toLowerCase();
                    if (oval == dataValMatch) {
                        matchOptVal = opt.value;
                        break;
                    }
                }
            }
        }
        b.start("div", {
            "id": widId + "OptWrap",
            "class": "optWrap"
        });

        var optattr = null;
        for (optndx in options) {
            opt = options[optndx];
            optattr = widAttr;
            optattr.value = opt.value;
            optattr.id = widDef.id + "-_" + optndx;
            optattr.type = "radio";
            optattr.name = fldName;
            optattr.onClick = 'mformFieldInput(this)';
            if ("checked" in optattr) {
                delete optattr.checked;
            }
            if (opt.value == matchOptVal) {
                optattr.checked = true;
            } else if ((matchOptVal == false) && ("default" in opt) && (opt.default == true)) {
                optattr.checked = true;
            }
            b.start("div", {
                "id": optattr.id + "Cont",
                "class": "buttonCont"
            });
            b.make("input", optattr);
            b.b(opt.label).nl();
            b.finish("div").nl();
        }
        b.finish("div").nl();

    } // if options defined
    b.finish("fieldset").nl();
    mformFinishWidget(widDef, b, context, custParms);
    b.nl();
}


function mformDropdownOnData(data, httpObj, parms) {
    if (parms.uri in parms.context.gbl.filesLoading) {
        delete parms.context.gbl.filesLoading[parms.uri];
    }
    if (data <= "") {
        console.log("L5: mformRenderDropdownOnData err=" + httpObj);
        toDiv("ErrorMsg", "Failure mformGetDataObjOnData  uri=" + parms.uri + "\n" + httpObj);
    } else {
        try {
            var context = parms.context;
            var widDef = parms.widDef;
            var custParms = parms.custParms;
            var gtx = parms.context.gbl;
            console.log("L8: mformRenderDropdownOnData get data=", data, " parms=", parms);
            // TODO: Add support for alternative parsers.
            var pdata = null;

            if (parms.parser == "TSV") {
                pdata = parseTSV(data);
            } else if (parms.parser == "JSON") {
                pdata = JSON.parse(data);
            } else {
                console.log("L707: ERROR Unknown Parser widDef=", widDef, " uri=",
                    parms.uri);
                return;
            }

            mformsCacheAjaxData(parms, pdata);

            custParms.send_to_div = true; // will send data direct to div instead of part of larger stream.
            custParms.skip_container = true; // will place data into previously rendered container
            b = new String_builder();
            console.log("L715: parsed dataObj=", pdata, " context=", context);
            mformRenderDropdown(widDef, b, context, custParms);
        } catch (err) {
            console.log("error parsing=", err, " data=", data);
        }
    }
}

function mformRenderDropdown(widDef, b, context, custParms) {
    mformFixupWidget(widDef, context);
    var gtx = context.gbl;
    var widId = makeId(widDef, context, custParms);
    var options = [];
    if ("option_source" in widDef) {
        var opsource = widDef.option_source;
        var beguri = opsource.uri;
        // Load the Options from disk and render latter 
        var req_uri = InterpolateStr(beguri, [widDef, custParms, context.dataObj, context, context.form]);
        // Fetch the List of Options from file on server or service.
        if (context.gbl.filesLoaded[req_uri] != undefined) {
            // data is already cached from prior call
            options = context.gbl.filesLoaded[req_uri].data;
        } else {
            // We are not already trying to load and it is not already
            // loaded so we need to request it.
            var parms = {
                "uri": req_uri,
                "req_method": getNested(opsource, "method", "GET"),
                "widDef": widDef,
                "context": context,
                "custParms": custParms,
                "parser": getNested(opsource, "parse", "TSV").toUpperCase()
            };
            parms.req_headers = {
                'Content-Type': "application/json"
            };
            mformsAddAjaxSecurityContext(parms, context);
            context.gbl.filesLoading[req_uri] = true;
            simpleGet(req_uri, mformDropdownOnData, parms);
        }
    } else if ("option" in widDef) {
        options = widDef.option;
    }

    mformStartWidget(widDef, b, context, custParms);
    // Add the actual Text Widget
    var widAttr = mformBasicWidAttr(widDef, context, custParms);
    mformCopyAttribs(widDef, widAttr, mformTextFieldCopyAttr);
    copyOverCustParms(widAttr, widDef, custParms);
    delete widAttr.onInput; // We do not need this handler for drop down
    if (String(widDef.multiple).toLowerCase() == "true" || widDef.multiple == true) {
        widAttr.multiple = "multiple";
    }
    //widAttr["-webkit-appearance"] = "none";
    b.start("select", widAttr);

    var matchOptVal = []; // set to matched option when match is found
    var dataPath = makeDataContext(widDef, context, custParms);
    var dataVal = getDataValue(context.dataObj, widDef, context, custParms);
    var opt = null;
    var optndx = null;

    if (dataVal != null) {
        // Find the matching option and default
        var dataValMatch = String(dataVal).split(",").map(item => item.trim().toLowerCase());
        // search options to find one that matches the 
        // value. 
        for (optndx in options) {
            opt = options[optndx];
            if ("value" in opt) {
                var oval = String(opt.value).trim().toLowerCase();
                if (dataValMatch.includes(oval)) {
                    matchOptVal.push(opt.value);
                    dataValMatch.splice(dataValMatch.indexOf(oval), 1);
                    if (!(Array.isArray(dataValMatch) && dataValMatch.length)) {
                        break;
                    }
                }
            }
        }
    }

    var optattr = null;
    for (optndx in options) {
        opt = options[optndx];
        optattr = {
            "value": opt.value
        };
        if ("class" in opt) {
            optattr.class = opt.class;
        }
        // TODO: Add Multi-select support here
        //  where every selected value is active.
        if (matchOptVal.includes(opt.value)) {
            optattr.selected = true;
        } else if ((matchOptVal == null) && ("default" in opt) && (opt.default == true)) {
            // Not matching option was found so use the default
            optattr.selected = true;
        }
        b.make("option", optattr, opt.label);
    } // for
    b.finish("select");
    mformFinishWidget(widDef, b, context, custParms);
    if (custParms.send_to_div == true) {
        // Have received the data from Event handler 
        // that sent of the request during rendering
        // We just replace contents of existing dropdown
        // with new one while leaving rest of div untouched.
        delete custParms.send_to_div;
        delete custParms.skip_container;
        var widTargetDivId = widId + "Cont";
        b.toDiv(widTargetDivId);
        b.clear();
    }
}

function copyOverCustParms(widAttr, widDef, custParms) {
    if ("col_Id" in custParms) {
        widAttr.col_id = custParms.colId;
    }
    if ("table_id" in custParms) {
        widAttr.table_id = custParms.table_id;
    }
}


function mformsRenderTextWidget(widDef, b, context, custParms) {
    mformFixupWidget(widDef, context);
    var gtx = context.gbl;
    var dContext = makeDataContext(widDef, context, custParms);
    mformStartWidget(widDef, b, context, custParms);
    // Add the actual Text Widget
    var widAttr = mformBasicWidAttr(widDef, context, custParms);
    var widId = widAttr.id;
    var form = context.form;
    mformCopyAttribs(widDef, widAttr, mformTextFieldCopyAttr);
    copyOverCustParms(widAttr, widDef, custParms);
    var widVal = getDataValue(context.dataObj, widDef, dContext, custParms);

    // Format with fixed decimal points if requested
    // in the metadata
    var numDec = widDef.num_dec;
    if ((numDec != undefined) && (numDec >= 0) && (numDec <= 20) && (widVal != null)) {
        widVal = parseFloat(widVal).toFixed(numDec);
    }

    // If we have a valid value then save to the widget for rendering
    if (widVal != null) {
        widAttr.value = widVal;
    } else {
        widVal = null;
    }

    if ((form.autocomplete == false) && (widVal == null)) {
        widAttr.autocomplete = "IX" + widDef.id;
    }
    widAttr.onblur = "widgetLooseFocus(this);";
    widAttr.onfocus = "widgetGainFocus(this);";
    widAttr.onkeydown = "widgetOnKeyDown(this, event);";

    var makeEleName = "input";
    if (widDef.type == "date") {
        widAttr.class = "input_date " + widAttr.class;
    }
    if (widDef.type == "textarea") {
        b.make("textarea", widAttr, widVal);
    } else {
        if (widDef.type == "checkbox") {
            if (widAttr.value == "true" || widAttr.value == true) {
                widAttr.checked = "checked";
            } else {
                delete widAttr.checked;
            }
        }
        b.make(makeEleName, widAttr);
    }

    if ("suggest" in widDef) {
        var sug = widDef.suggest;
        var sugId = widDef.id + "sugCont";
        var sugClass = sug.class;
        var sugContClass = sugClass + "Cont";

        var sugAttr = {
            "id": sugId,
            "class": sugContClass,
            "widId": widId,
            "display": "hidden"
        };
        b.make("div", sugAttr);
    }
    mformFinishWidget(widDef, b, context, custParms);
}

function mformsActivateTab(hwidget) {
    //var id = hwidget.id;
    var newActiveTabNum = gattr(hwidget, "tab_num");
    var formId = gattr(hwidget, "form_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var parentId = gattr(hwidget, "parent_id");
    var context = GTX.formContexts[formId][dataObjId];
    var gtx = context.gbl;
    var form = context.form;
    var parDef = gtx.widgets[parentId];
    //var dataObj = gtx.dataObj[dataObjId];
    //var dataContext = widDef.data_context;
    var newActiveTab = parDef.tabs[newActiveTabNum].tab;
    // find old tab active
    var oldActive = parDef.active_tab;
    var oldActiveNum = oldActive.tab_num;
    if (newActiveTabNum == oldActiveNum) {
        return;
    }
    // change sub payned defenition to make the child
    // active.
    oldActive.active = false;
    newActiveTab.active = true;
    parDef.activeTab = newActiveTab;
    b = new String_builder();
    var custContext = {
        "skip_container": true
    };
    mformsRenderTabBar(parDef, b, context, custContext);
    var targetDiv = parDef.id + "Cont";
    b.toDiv(targetDiv);
}

function mformsRenderTabBar(widDef, b, context, custParms) {
    mformFixupWidget(widDef, context);
    var gtx = context.gbl;
    //mformsAdjustCustParms(widDef, b, context, custParms);
    var widId = widDef.id;
    var colPath = widDef.data_Context;
    mformStartWidget(widDef, b, context, custParms);
    // Add the actual Text Widget
    var widAttr = mformBasicWidAttr(widDef, context, custParms);
    var form = context.form;
    mformCopyAttribs(widDef, widAttr, mformTextFieldCopyAttr);
    copyOverCustParms(widAttr, widDef, custParms);
    b.start("ul", widAttr);
    var tabs = widDef.tabs;
    var activeTab = null;

    for (var tabndx in tabs) {
        var atab = tabs[tabndx].tab;
        var activeStr = "";
        atab.tab_num = tabndx;
        if (atab.active == true) {
            activeTab = atab;
            activeStr = " active";
            widDef.active_tab = activeTab;
        }
        var tabId = "" + widId + tabndx;
        var tabattr = {
            "id": tabId,
            "tab_num": tabndx,
            "onclick": "mformsActivateTab(this)",
            "form_id": context.form_id,
            "dataObjId": context.dataObjId,
            "parent_id": widId
        };
        if ("class" in atab) {
            tabattr.class = atab.class + activeStr;
        } else if (atab.active == true) {
            tabattr.class = activeStr;
        }
        b.start("li", tabattr);
        if (("href" in atab) && (atab.href > " ")) {
            b.start("a", {
                "href": atab.href
            });
        }
        if ("symbol" in atab) {
            b.start("span", {
                "class": "symbol"
            });
            b.b("&#" + atab.symbol);
            b.finish("span");
        }
        if ("icon" in atab) {
            b.make("img", {
                "class": "icon",
                "src": atab.icon,
                "id": tabId + "Icon"
            });
        }
        b.b(atab.label);
        if (("href" in atab) && (atab.href > " ")) {
            b.finish("a");
        }
        b.finish("li");
    }
    b.finish("ul");

    var contentDivId = widDef.content_div;
    if (contentDivId == undefined) {
        contentDivId = widId + "tabContent";
        b.make("div", {
            "id": contentDivId,
            "class": widDef.class + "tabContent" + " tabContent"
        });
    }
    // Now find our active Tab and cause it to render
    // the child tabs.
    if ((activeTab !== null) && ("child" in activeTab)) {
        var cwid = gtx.widgets[activeTab.child];
        if (cwid != undefined) {
            mformsRenderTabBar(cwid, b, context, custParms);
        }
    }

    mformFinishWidget(widDef, b, context, custParms);


    if ((activeTab != null) && ("form" in activeTab)) {
        var localContext = [];
        for (var akey in context) {
            localContext[akey] = context[akey];
        }
        delete localContext.form;
        delete localContext.form_id;
        localContext = {
            "dataObjId": context.dataObjId,
        };
        display_form(contentDivId, activeTab.form, localContext, context.gbl);
    }

}

//-------------
//-- EDIT TABLE RENDERING
//-------------
// Iterate records in the data array
// build a index by the values of the data field
// sort them and return the sorted index.  Use the Column
// specified data types to determine if we should be 
// converting or padding sort key for proper numeric sort.
function mformsBuildSortKey(widDef, context, custParms) {

}

function mformsCalcArrTotal(dataArr, data_context) {
    var totVal = 0;
    for (var rowndx = 0; rowndx < dataArr.length; rowndx++) {
        var dataRow = dataArr[rowndx];
        var fldVal = getNested(dataRow, data_context, 0);
        fldVal = Number.parseFloat(fldVal);
        totVal += fldVal;
    }
    return totVal;
}





function mformsRenderEditableTable(widDef, b, context, custParms) {
    mformFixupWidget(widDef, context);
    var gtx = context.gbl;
    var flds = gtx.widgets;
    var tblId = makeId(widDef, context, custParms);
    var dataContext = makeDataContext(widDef, context, custParms);
    var cols = widDef.columns;
    var dataObj = context.dataObj;
    var dcontext = widDef.data_context;
    var tableEleType = "table";
    var thEleType = "th";
    var tdEleType = "td";
    var trEleType = "tr";
    var trEleParms = {
        "class": "row"
    };
    var tdEleParms = {
        "class": "cell"
    };
    var thEleParms = {
        "class": "cell head"
    };
    if (widDef.render_as_div == true) {
        tableEleType = "div";
        thEleType = "div";
        tdEleType = "div";
        trEleType = "div";
    }

    if (!("data_context" in widDef)) {
        console.log("ERROR  data_context is mandatory for widget: " + JSON.stringify(widDef));
        return;
    }
    var colndx = null;
    var rowndx = null;
    custParms.skip_label = true; // will render label as part of caption
    mformStartWidget(widDef, b, context, custParms);
    // TODO: determine right or left alignment
    // by column


    //b.make("div", {
    //    "class": widDef.class + "caption"
    //}, widDef.label);

    b.start(tableEleType, {
        "id": tblId + "tbl",
        "class": widDef.class
    });

    if (widDef.label != undefined) {
        if (tableEleType == "table") {
            b.make("caption", widDef.label);
        } else {
            b.make("h3", {}, widDef.label);
        }
    }

    var dataArr = getNested(dataObj, dataContext, []);
    if (dataArr.length == 0) {
        // Create the data array if there is not one.
        dataArr.push({});
        setNested(dataObj, dataContext, dataArr);
    }

    var colId = null;
    var rendFunc = null;
    var colWidDef = null;
    // Render the Rows of the Table
    // We have to render the requested number
    // of rows even if there is not that much data
    var minRowsRender = getNested(widDef, "min_rows", 1);
    var maxRowsRender = getNested(widDef, "max_rows", 1);
    var numRowtoRender = dataArr.length;
    if (numRowtoRender < minRowsRender) {
        numRowtoRender = minRowsRender;
    }
    var tdata = getNested(dataObj, dataContext);

    //----
    //-- Render Column Header
    //----
    if (widDef.skip_col_header != true) {
        b.start(trEleType, {
            "id": tblId + "tblhead",
            "class": widDef.class + "tr row rowHead"
        });
        // -----
        //--- Render Table Header
        //------
        for (var i = 0; i < cols.length; i++) {
            colId = cols[i];
            if (colId in flds) {
                colWidDef = flds[colId];
                b.start(thEleType, {
                    "id": tblId + colId + "id",
                    "class": colWidDef.cell_class + " head",
                    "table_id": tblId,
                    "col_id": colId,
                    "form_id": context.form_id,
                    "dataObjId": context.dataObjId,
                    "onClick": "mformsColHeadClicked(this)"
                });
                b.b(colWidDef.label);
                b.finish(thEleType);
            }
        }
        b.finish(trEleType);
    }

    //------------
    //--- Render Table Body
    //------------
    for (rowndx = 0; rowndx < numRowtoRender; rowndx++) {
        // Render the Data rows
        b.start(trEleType, trEleParms);
        for (colndx = 0; colndx < cols.length; colndx++) {
            colId = cols[colndx];
            if (colId in flds) {
                colWidDef = flds[colId];
                var cellClass = "cell";
                if ("cell_class" in colWidDef) {
                    cellClass = colWidDef.cell_class + " " + cellClass;
                }
                b.start(tdEleType, {
                    "class": cellClass,
                    "id": colWidDef.id + "_cell_" + rowndx + "_" + colndx
                });
                mformFixupWidget(colWidDef, context);
                if (colWidDef.type in widgRenderFuncs) {
                    //var dataContextCell = widDef.data_context + ".[" + rowndx + "]." + colWidDef.data_context;
                    try {
                        var custContext = {
                            "rowNdx": rowndx,
                            "dataArr": dataArr,
                            "table": widDef,
                            "col_id": colId,
                            "table_id": tblId,
                            "id": colWidDef + "-_" + rowndx + "_" + colndx,
                            //"data_context": dataContextCell,
                        };
                        var dcontextEle = {
                            "path": dcontext,
                            "ndx": rowndx
                        };
                        // For each array in a table we must add it to the 
                        // array stack so we can properly handle nested arrays.
                        custContext.arrayStack = [];
                        if ("arrayStack" in custParms) {
                            // clone array stack from parent table
                            // so we can augment it with our portion
                            // for this widget.
                            for (var cpndx in custParms.arrayStack) {
                                var cpele = custParms.arrayStack[cpndx];
                                custContext.arrayStack.push(cpele);
                            }
                        }
                        custContext.arrayStack.push(dcontextEle);

                        if (colWidDef.isCol == true) {
                            // For cells labed as columns we 
                            // will be rendering header in the table
                            // table TH so want to skip the label for
                            // rendering the actual field.
                            custContext.skip_label = true;
                        }
                        rendFunc = widgRenderFuncs[colWidDef.type];
                        if (rendFunc == undefined) {
                            console.log("L1038 ERROR: Widget Not Found rowndx=", rowndx, "colWidDef=", colWidDef, " widDef=", widDef)
                        } else {
                            rendFunc(colWidDef, b, context, custContext);
                        }
                    } catch (err) {
                        console.log("L324: Error rendering=", err, " colWidDef=", colWidDef, " funName", rendFunc);
                        b.b("<h6>Error Rendering See console</h6>");
                    }
                } else {
                    console.log("cound not find rendering func=", colWidDef.Type, "for id=", colId, "colWidNdx=", i, " colWidDef=", colWidDef);
                    b.make("h6", {
                        id: widId
                    }, "Unkown Widget Type " + colWidDef.type + " id=" + colId + " colWidDef=" + JSON.stringify(colWidDef)).nl();
                }
                //b.b("xxx" + tdEleType);
                b.finish(tdEleType);
            } // if col id found
        } // for td cell
        //b.b("yyy" + trEleType);
        b.finish(trEleType);
    } // for row

    if (widDef.total_line == true) {
        // Add the Total Row 
        b.start(trEleType, {
            "id": tblId + "tblTotRow",
            "class": widDef.class + trEleType + " " + widDef.class + "totRow" + " row totRow"
        });
        var numEmptyCellRendered = 0;
        for (colndx = 0; colndx < cols.length; colndx++) {
            colId = cols[colndx];
            if (colId in flds) {
                colWidDef = flds[colId];
                if (colWidDef.total_cell != true) {
                    // just render a empty cell on the total row if not a total cell.
                    var tmpOutStr = "";
                    if (numEmptyCellRendered < 1) {
                        tmpOutStr = "Totals";
                    }
                    b.make(thEleType, {}, tmpOutStr);
                    numEmptyCellRendered++;
                } else {
                    b.start(tdEleType, {
                        "class": colWidDef.cell_class + " " + colWidDef.class + "total" + " cell totCell",
                        "id": context.form_id + tblId + colId + "total"
                    });
                    var totVal = mformsCalcArrTotal(dataArr, colWidDef.data_context);
                    var numDec = colWidDef.numDec;
                    if (numDec == undefined) {
                        numDec = 2;
                    }
                    // TODO: Add formatting of output field.
                    b.b(totVal.toFixed(numDec));
                    b.finish(tdEleType);
                }
            }
        }
        b.finish(trEleType);
    }

    if (widDef.render_as_div != true) {
        // If rendering as a table then we must 
        // finish the table before rendering the 
        // add button.  Otherwise we render the 
        // add row button before closing the table
        // div.
        b.finish(tableEleType);
    }


    //----------
    //--- Render the Table Add Row button
    //----------
    //add_button:
    //    label: Add Special Program
    //    class: addRow
    //    skip: false
    var addrow = widDef.add_button;
    var skipAddRow = getWDef(addrow, "skip", false);
    var addRowLabel = getWDef(addrow, "label", "Add Row");
    var classAdd = getWDef(addrow, "class", "");
    if (skipAddRow != true) {
        b.start("div", {
            "class": (widDef.class + "addRowCont" + " " + classAdd).trim()
        });
        b.start("button", {
            "id": tblId + "-_AddBut",
            "table_id": tblId,
            "form_id": context.form_id,
            "dataObjId": context.dataObjId,
            "class": (widDef.class + "AddBut" + " " + classAdd).trim(),
            "onClick": "addTableRowButton(this)"
        });
        b.make("span", {
            "class": "addRowSymbol"
        }, "&#10009;");
        b.b(addRowLabel);
        b.finish("button");
        b.finish("div");
    }

    if (widDef.render_as_div == true) {
        b.finish(tableEleType);
    }

    mformFinishWidget(widDef, b, context, custParms);
}



// Create a clone of parts of the custom parms object

// to allow retention of the array stack and other things

// we want preserved while allowing other things to varry

// in the stack.

function partialCloneCustParms(custParms) {

    if ((custParms == null) || (custParms == undefined)) {
        return {};
    } else {
        var tout = {};
        if ("arrayStack" in custParms) {
            tout.arrayStack = custParms.arrayStack;
        }
        return tout;
    }

}
//-----
//-- MAIN RENDERING SECTION
//-----
function mformsRenderWidgets(parent, widgets, b, context, custParms) {
    var gtx = context.gbl;
    var flds = gtx.widgets;
    var parClass = parent.class;
    if ("widgets" == undefined) {
        return;
    }
    for (var i = 0; i < widgets.length; i++) {
        var widId = widgets[i];
        if (widId in flds) {
            var widDef = flds[widId];
            mformFixupWidget(widDef, context);
            if (widDef.type in widgRenderFuncs) {

                try {
                    var rendFunc = widgRenderFuncs[widDef.type];
                    var wsCustParms = partialCloneCustParms(custParms);
                    rendFunc(widDef, b, context, wsCustParms);
                } catch (err) {
                    console.log("L324: Error rendering=", err, " widDef=", widDef, " funName", rendFunc);
                    b.b("<h6>Error Rendering See console</h6>");
                }
            } else {
                console.log("cound not find rendering func=", widDef.Type, "for id=", widId, "widNdx=", i, " widDef=", widDef);
                b.make("h6", {
                    id: widId
                }, "Unkown Widget Type " + widDef.type + " id=" + widId + " widDef=" + JSON.stringify(widDef)).nl();
            }
        } else if (widId > ".") {
            // Widget Defenition missing so output error message
            console.log("missing widget id=", widId, "id***" + widId + "***");
            var msg = "Widget ID " + widId + " can not be found";
            b.make("h6", {
                "id": "wid" + widId
            }, msg);
        }
    }
}

function mformsRenderForm(form, context) {
    var gtx = context.gbl;
    var b = new String_builder();
    var flds = gtx.widgets;
    context.form_id = form.id;
    mformSetFormContext(form, context);

    b.start("div", {
        "id": form.id + "Cont",
        "class": form.class
    });

    if ((form.label != undefined) && (form.label > " ")) {
        b.make("h3", {
            "id": form.id + "Head",
            class: form.class + "Head"
        }, form.label);
    }


    var formAttr = {
        "id": form.id
    };

    mformCopyAttribs(form, formAttr, mformTextFieldCopyAttr);
    if (form.autocomplete == false) {
        formAttr.autocomplete = false;
    }


    b.start("form", formAttr);


    mformsRenderWidgets(form, form.widgets, b, context, null);
    /*
    b.addInputField({
        label: "Cert #",
        fldName: "current_operator__operating_certificate_number",
        type: 'text',
        size: 45,
        context: 'GContext'
    }).nl();
    */
    b.finish("form");
    b.finish("div"); // form container
    b.toDiv(context.targetDiv);
    refreshShowDataObj(context);
}

function refreshShowDataObj(context) {
    if ('show_data_obj_div' in context.form) {
        toDiv(context.form.show_data_obj_div, "<pre>" + JSON.stringify(context.dataObj, null, 2) + "</pre>");
    }
}

//------------
//--- Auto Suggest Handlers
//------------
function autoSugClicked(hwidget) {
    var id = hwidget.id;
    var sugVal = gattr(hwidget, "sug_val");
    var widId = gattr(hwidget, "wid_id");
    var fullWidId = gattr(hwidget, "fullWidId");
    var formId = gattr(hwidget, "form_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var context = GTX.formContexts[formId][dataObjId];
    var form = context.form;
    var widDef = GTX.widgets[widId];
    var dataObj = GTX.dataObj[dataObjId];
    var dataContext = gattr(hwidget, "data_context");
    if (dataContext == null) {
        dataContext = widDef.data_context;
    }

    setNested(dataObj, dataContext, sugVal);
    setFormValue(fullWidId, sugVal);
    var targetDiv = widDef.id + "sugCont";
    toDiv(targetDiv, "");
    hideDiv(targetDiv);
    processOnChangeSpec(hwidget, context, widDef);
    processOnChangeSpec(hwidget, context, form);
    refreshShowDataObj(context);
}

function mformsAutoSuggestOnData(data, httpObj, parms) {
    var context = parms.context;
    var widDef = parms.widDef;
    var targetDiv = widDef.id + "sugCont";
    var widId = parms.id;
    if (parms.uri in context.gbl.filesLoading) {
        delete context.gbl.filesLoading[parms.uri];
    }
    if (data <= "") {
        //console.log("L88: mformsAutoSuggestOnData err=" + httpObj);
        //toDiv("ErrorMsg", "Failure mformsAutoSuggestOnData  uri=" + parms.uri + "\n" + httpObj);
        // No Suggestions found or error trying to locate
        // them
        toDiv(targetDiv, "");
        hideDiv(targetDiv);
    } else {
        //console.log("L92: mformsAutoSuggestOnData get data=", data, " parms=", parms);
        var objId = context.dataObjId;
        var gtx = context.gbl;

        // TODO: Add support for alternative parsers.
        var pdata = null;
        try {
            //pdata = tsvParse(data);
            mformsCacheAjaxData(parms, data);
            var sug = widDef.suggest;
            var b = new String_builder();
            var rows = data.split("\n");
            for (var rowndx in rows) {
                if (rowndx > 20) {
                    break;
                }
                var arow = rows[rowndx].trim();
                var flds = arow.split("\t");
                if (flds.length != 2) {
                    continue;
                }
                var sugStr = flds[0];
                var sugCnt = flds[1];
                var sugDispVal = sugStr.replace("_", " ");
                var sugAttr = {
                    "id": widId + "autoSug" + sugStr,
                    "fullWidId": parms.fullWidId,
                    "sug_val": sugDispVal,
                    "wid_id": widDef.id,
                    "form_id": context.form_id,
                    "dataObjId": context.dataObjId,
                    "class": sug.class,
                    "data_context": parms.data_context,
                    "onClick": "autoSugClicked(this);"
                };
                b.make("div", sugAttr, sugDispVal + "<small> - " + sugCnt + "</small>");
            }
            b.toDiv(targetDiv);
            showDiv(targetDiv);
        } catch (err) {
            console.log("error parsing=", err, " data=", data);
            pdata = {};
        }
        /// PUT Proper Processing HERE
    }
}

function requestAutoSuggest(parms) {
    var context = parms.context;
    var req_uri = parms.uri; // ".txt?ti=" + Date.now();
    //req_uri = req_uri.replace("//", "/");
    //console.log("L25: mformsGetDef req_uri=", req_uri);
    parms.req_headers = {
        'Content-Type': "application/json",
    };
    mformsAddAjaxSecurityContext(parms, context);
    parms.req_method = "GET";
    parms.uri = req_uri;
    context.gbl.filesLoading[req_uri] = true;
    context.gbl.activeAutoSug[parms.widId] = parms.id;
    simpleGet(req_uri, mformsAutoSuggestOnData, parms);
}



//-----------------------
//-- Client Side Search Handlers
//-----------------------
function mformsSimpleSearchResRowClick(hwidget) {
    var id = hwidget.id;
    var widId = gattr(hwidget, "wid_id");
    var onchId = gattr(hwidget, "onch_id");
    var formId = gattr(hwidget, "form_id");
    var dataObjId = gattr(hwidget, "dataObjId");
    var rowNum = gattr(hwidget, "row_num");
    rowNum = parseInt(rowNum);
    var context = GTX.formContexts[formId][dataObjId];
    var form = context.form;
    var widDef = GTX.widgets[widId];
    var onchDef = GTX.widgets[onchId];
    var dataObj = GTX.dataObj[dataObjId];
    var dataContext = widDef.data_context;
    var dataContextOvr = gattr(hwidget, "data_context");
    var lastRes = context.queries[widId];
    var dataRow = lastRes.data[rowNum];
    if (dataRow == undefined) {
        return;
    }
    var rowclick = onchDef.rowclick;
    if (rowclick == undefined) {
        console.log("WARN: rowclick undefined widDef=", onchDef);
        return;
    }
    var action = rowclick.action;
    if (action == undefined) {
        return;
    }
    if (action == "display_form") {
        var interpArr = [dataRow, context.dataObj, widDef, onchDef, context, context.form, context.gbl];
        var targForm = rowclick.form_id;
        var targDiv = rowclick.target_div;
        if (targDiv == null) {
            targDiv = "default";
        }
        //var startUri = rowclick.uri;
        //if (startUri == undefined) {
        //    return;
        //}
        var localContext = {
            "_safe": {}
        };
        var clickContext = rowclick.context;
        for (var ckey in clickContext) {
            var constr = clickContext[ckey];
            var intstr = InterpolateStr(constr, interpArr);
            localContext[ckey] = intstr;
            // TODO: Add local interpolation here
            if (isString(intstr)) {
                localContext._safe[ckey] = makeSafeFiName(intstr);
            }
        }
        //var turi = InterpolateStr(startUri, interpArr);
        //var objId = InterpolateStr(onch.rowclick.objId, interpArr);
        var formUri = InterpolateStr(targForm, interpArr);
        display_form(targDiv, formUri, localContext, context.gbl);
        //alert("TODO: display_form data object uri=" + turi + " for " + JSON.stringify(dataRow));
    }

}

function mformsRenderSimpleSearchRes(widDef, b, context, custParms) {
    var gtx = context.gbl;
    var widId = widDef.id;
    var onch = custParms.onch;
    var cols = widDef.columns;
    var dataObj = context.dataObj;
    var searchRes = custParms.searchRes;
    var formId = context.form.id;
    //b.start("div", {
    //    "id": widDef.id + "Cont",
    //    "class": widDef.class + "Cont"
    //});
    b.start("table", {
        "id": widDef.id + "tbl",
        "class": widDef.class + "tbl"
    });
    var frow = searchRes[0];
    var fname = null;
    var rowndx = null;
    searchRes = client_side_search_apply_filter(widDef, context, searchRes);

    // Generate the table header

    // Generate the Table Body
    for (rowndx in searchRes) {
        var row = searchRes[rowndx];
        var rowId = widId + "_" + rowndx;
        if ((rowndx == 0) || ((rowndx % 10) == 0)) {
            b.start("tr", {
                "id": widId + "rowHead",
                "class": widDef.class + "headRow"
                //"onclick": "simpleSearchResRowClick(this)"
            });
            for (fname in frow) {
                var id = widDef.id + "rowHead" + fname;
                b.make("th", {
                    "id": id,
                    "class": widDef.class + "th " + widDef.class + "th" + fname,
                    "fname": fname
                }, fname);
            }
            b.finish("tr");
        } // end header

        var rowAttr = {
            "id": rowId,
            "class": widDef.class + "row",
            "onclick": "mformsSimpleSearchResRowClick(this)",
            "wid_id": widId,
            "onch_id": onch.id,
            "form_id": context.form.id,
            "dataObjId": context.dataObjId,
            "row_num": rowndx
        };

        b.start("tr", rowAttr);
        for (var fname in row) {
            var fval = row[fname];
            var id = rowId + "_" + "fname";
            b.make("td", {
                "id": id,
                "class": widDef.class + "td " + widDef.class + "td" + fname,
                "row": rowndx,
                "fname": fname
            }, fval);
        }
        b.finish("tr");
    }
    b.finish("table");
    //b.finish("div");
}



function mformsClientSideSearchOnData(data, httpObj, parms) {
    var context = parms.context;
    var gbl = context.gbl;
    var form = context.form;
    var widDef = parms.onch;
    var targetDiv = widDef.target_div;
    var targetWidId = widDef.render_widget;
    var targetWid = gbl.widgets[targetWidId];
    var parser = widDef.parser;
    if (parms.uri in context.gbl.filesLoading) {
        delete context.gbl.filesLoading[parms.uri];
    }
    if (data <= "") {
        //console.log("L88: mformsClientSideSearchOnData err=" + httpObj);
        //toDiv("ErrorMsg", "Failure mformsAutoSuggestOnData  uri=" + parms.uri + "\n" + httpObj);
        // No Suggestions found or error trying to locate
        // them
        toDiv(targetDiv, "");
        hideDiv(targetDiv);
    } else {
        //console.log("L92: mformsClientSideSearchOnData get data=", data, " parms=", parms);
        var objId = context.dataObjId;
        var gtx = context.gbl;
        try {
            // TODO: Add support for alternative parsers.
            var b = new String_builder();
            var parsed = null;
            if (parser == "tsv") {
                parsed = parseTSV(data);
            } else if (parser == "json") {
                parsed = JSON.parse(data);
            } else {
                console.log("mformsClientSideSearchOnData  unknown parser type = ", parser);
                return;
            }
            var custParms = {
                "searchRes": parsed,
                "onch": widDef
            };
            // Save the parsed data in this context by the req_uri
            // so we can reload the parsed result to use latter 
            // when we needed it. 
            cacheQueryRes(context, targetWidId, parsed);
            mformsCacheAjaxData(parms, parsed);
            // Now Lookup the widget to do the rendering
            if (targetWid == undefined) {
                b.b("Could not find widget " + targetWidId);
            } else {
                var rendFunc = widgRenderFuncs[targetWid.type];
                if (typeof rendFunc === "function") {
                    rendFunc(targetWid, b, context, custParms);
                } else {
                    console.log("WARN: Cold not find Rendering function for ", targetWid, " widDef=", widDef)
                }
            }
            b.toDiv(targetDiv);
            showDiv(targetDiv);
            setTimeout(hideAllAutoSug, 75);
        } catch (err) {
            console.log("error parsing and rendering=", err, " data=", data);
        }
        /// PUT Proper Processing HERE
    }
}

// Filter rows from data that do not match the 
function client_side_search_apply_filter(spec, context, data) {
    //var gbl = context.gbl;
    //var formId = context.form_id;
    //var dataObjId = context.dataObjId;
    var dataObj = context.dataObj;
    //var form = context.form;
    //var indexes = spec.indexes;
    var filters = spec.filters;
    //var cscache = context.client_side_cache;
    var tout = [];
    for (var rowndx in data) {
        var keepFlg = true;
        var arow = data[rowndx];
        for (var fpos in filters) {
            var filt = filters[fpos];
            var form_context = filt.field.form_context;
            var res_context = filt.field.res_context;
            if ((res_context == undefined) || (form_context == undefined)) {
                console.log("ERROR form_context and res_context must be defined filt=", filt, "spec=", spec);
                return;
            }
            var formVal = getNested(dataObj, form_context, "").trim().toUpperCase();
            if (formVal < " ") {
                continue;
            }
            var rowVal = getNested(arow, res_context, null);
            if (rowVal == null) {
                keepFlg = false;
                break;
            }
            rowVal = rowVal.trim().toUpperCase();
            if ((rowVal.startsWith(formVal)) == false) {
                keepFlg = false;
                break;
            }
        } // for filter
        if (keepFlg == true) {
            tout.push(arow);
        }
    } // for row
    return tout;
} // func()

function client_side_search(hwidget, context, widDef) {
    var widId = hwidget.id.split("-_")[0];
    var formId = context.form_id;
    var dataObjId = context.dataObjId;
    var dataObj = context.dataObj;
    var form = context.form;
    var indexes = widDef.indexes;
    var filters = widDef.filters;
    var gbl = context.gbl;
    var targetDiv = widDef.target_div;
    var targetWidId = widDef.render_widget;
    var targetWid = gbl.widgets[targetWidId];
    var parser = widDef.parser;
    if (targetDiv == undefined) {
        console.log("WARN: target_div is missing", widDef);
        return;
    }
    if (targetWidId == undefined) {
        console.log("WARN: render_widget is missing", widDef);
        return;
    }
    if (targetWid == undefined) {
        console.log("WARN: Could not locate render_widget ",
            targetWidId, " widDef=", widDef);
        return;
    }
    if (indexes == undefined) {
        console.log("WARN: No indexes defined widDef=", widDef);
    }
    if (context.client_side_cache == undefined) {
        context.client_side_cache = {
            "last": {
                "context": "",
                "val": "",
                "result": ""
            },
            "cached": {}
        };
    }
    var cscache = context.client_side_cache;
    if (indexes == undefined) {
        console.log("client_side_search no indexes defined");
        return;
    }
    for (var ipos in indexes) {
        var fld = indexes[ipos].field;
        var dc = fld.data_context;
        var fldVal = getNested(dataObj, dc, null);
        if ((fldVal != null) && (fldVal.trim() > "")) {
            // Found the first Value in named indexes that is 
            // not empty so we either run a new search or apply
            // a client side filter. 
            var safeVal = makeSafeFiName(fldVal);
            var extParms = {
                "safe_value": safeVal,
                "field_value": fldVal.trim()
            };
            var startUri = fld.uri;
            // Compute Query Early because want to use the URI for caching.
            var searchUri = InterpolateStr(startUri, [extParms, widDef, context.dataObj, context, context.form_def, context.gContext]);
            // TODO: Detect a Search Result that is already loaded 
            // And simply call the render function. 
            if (searchUri in gbl.filesLoaded) {
                var b = new String_builder();
                var custParms = {
                    "searchRes": gbl.filesLoaded[searchUri].data,
                    "onch": widDef
                };
                if (targetWid == undefined) {
                    b.b("L1909: Could not find widget " + targetWidId);
                } else {
                    var rendFunc = widgRenderFuncs[targetWid.type];
                    rendFunc(targetWid, b, context, custParms);
                }
                b.toDiv(targetDiv);
                showDiv(targetDiv);
                setTimeout(hideAllAutoSug, 100);
                break;
            } else {
                // Make the Request for new dat with new Data conext.
                // Now Make the Request for search Results
                // TODO: Add Chaching here to avoid search same thing over.
                var parms = {
                    "context": context,
                    "uri": searchUri,
                    "widDef": widDef,
                    "onch": widDef,
                    "req_method": "GET",
                    "req_headers": {
                        "Content-type": "application/json"
                    }
                };
                mformsAddAjaxSecurityContext(parms, context);
                // TODO: Handle POST in-addition to GET
                context.gbl.filesLoading[startUri] = true;
                simpleGet(searchUri, mformsClientSideSearchOnData, parms);
                break;
            } // make AJAX
        } // fld_pos 
    } // for ipos in indexes
} // func

//-------------
//-- Data Save & Retrieval Funcations
//-------------
function saveFormChanges(hwidget) {
    var attr = hwidget.attributes;
    var widId = hwidget.id.split("-_")[0];
    var widDef = GTX.widgets[widId];
    var dataContext = widDef.data_context;
    var dataContextOvr = gattr(hwidget, "data_context");
    if (dataContextOvr > "") {
        // override the widget data context with the 
        // value encoded into the widget if present.
        // needed this to support array elements that 
        // require a differnt data context for every row of every cell.
        dataContext = dataContextOvr;
    }
    var formId = gattr(hwidget, "form_id");
    var formDef = GTX.forms[formId];
    var dataObjId = gattr(hwidget, "dataObjId");
    var context = GTX.formContexts[formId][dataObjId];
    var dataObj = GTX.dataObj[dataObjId];

    var saveSpec = formDef.save;
    if (saveSpec == undefined) {
        alert("Err: No Save Section defined in metadata");
    }

    // TODO: Insert Logic here to produce a different 
    // form of Post body based on transform spec embedded in 
    // the save spec.
    var postString = JSON.stringify(dataObj);

    // Setup the AJAX CAll
    var parms = {};
    var req_uri = InterpolateStr(saveSpec.uri, [context, dataObj, formDef]);
    console.log("L263: saveFormChanges req_uri=", req_uri);
    parms.req_headers = {
        'Content-Type': "application/json"
    };
    mformsAddAjaxSecurityContext(parms, context);
    parms.req_method = saveSpec.verb;
    parms.context = context;
    parms.form_id = formId;
    parms.form_def = formDef;
    parms.dataObjId = context.dataObjId;
    parms.uri = req_uri;
    context.gbl.filesLoading[req_uri] = true;
    // TODO: Call the user specified save start function so they can change GUI state.
    simplePost(req_uri, postString, mformSaveDataObjOnData, parms, saveSpec.verb);
    toDiv(saveSpec.status_div, "AJAX Sending " + saveSpec.method + " uri=" + req_uri + " body=" + postString);
}


// AJAX Event handler to receive data objects requested
// by the form.   Once data has arrived will also 
// trigger rendering of the form which had to be delayed
// until we had data to populate it. 
function mformSaveDataObjOnData(data, httpObj, parms) {
    if (parms.uri in parms.context.gbl.filesLoading) {
        delete parms.context.gbl.filesLoading[parms.uri];
    }
    var objId = parms.context.dataObjId;
    var gtx = parms.context.gbl;
    var formDef = parms.form_def;
    var statDiv = formDef.save.status_div;
    var basicStatStr = " status=" + httpObj.status + " message=" + httpObj.statusText + " dataObjId=" + parms.dataObjId;
    if (httpObj.status != 200) {
        toDiv(statDiv, "Error Saving " + parms.uri + basicStatStr + " uri" + parms.uri);
        // TODO: Call the user specified save error function to indicate save failed.
        return;
    } else {
        toDiv(statDiv, basicStatStr);
        console.log("uri=" + parms.uri + " " + basicStatStr);

        if (data <= "") {
            console.log("L5: mformSaveDataObjOnData err=" + httpObj);
            toDiv(statDiv, "No Data Recieved from save operation uri=" + parms.uri + " verb=" + req_method)
        } else {
            console.log("L991: mformSaveDataObjOnData get data=", data, " uri=", parms.uri);
            toDiv(statDiv, "Success save " + basicStatStr + " body=" + data);
            // TODO: Call the user specified Wait Notification Function to indicate save sucess

            // TODO: Add in some real logic to handle the results 

            /*
            // TODO: Add support for alternative parsers.
            var pdata = null;
            try {
                pdata = JSON.parse(data);
            } catch (err) {
                console.log("error parsing=", err, " data=", data);
                pdata = {};
            }
            /// PUT Proper Processing HERE
            gtx.dataObj[objId] = pdata;
            parms.context.dataObj = pdata;
            parms.context.gbl.filesLoaded[parms.uri] = pdata;
            parms.widVal =
                console.log(" parsed dataObj=", pdata, " context=", parms.context);
            mformsRenderForm(context.form, context);
            refreshShowDataObj(context)
            
            */
        }
    }
}






//-------------
//-- Data & Form Retrieval Event Handlers
//-------------
// save complete context from rendering 
// request so we can retrieve it latter 
// using the combination for form_id
// and data object Id.
function mformSetFormContext(form, context) {
    var gtx = context.gbl;
    var formId = form.id;
    if (!("formContexts" in gtx)) {
        gtx.formContexts = {};
    }
    if (!(formId in gtx.formContexts)) {
        gtx.formContexts[formId] = {};
    }
    gtx.formContexts[formId][context.dataObjId] = context;
}




//------------------------
//-- mforms AJAX support for fetching Data Objects
//------------------------

function mformsCacheAjaxData(parms, data) {
    if (parms.context == undefined) {
        return;
    }
    var context = parms.context;
    var gbl = context.gbl;

    gbl.filesLoaded[parms.uri] = {
        "time": curr_time(),
        "data": data
    };
}

// AJAX Event handler to receive data objects requested
// by the form.   Once data has arrived will also 
// trigger rendering of the form which had to be delayed
// until we had data to populate it. 
function mformGetDataObjOnData(data, httpObj, parms) {
    if (parms.uri in parms.context.gbl.filesLoading) {
        delete parms.context.gbl.filesLoading[parms.uri];
    }
    if (data <= "") {
        console.log("L5: mformGetDataObjOnData err=" + httpObj);
        toDiv("ErrorMsg", "Failure mformGetDataObjOnData  uri=" + parms.uri + "\n" + httpObj);
    } else {
        var context = parms.context;
        var objId = parms.context.dataObjId;
        var gtx = parms.context.gbl;
        console.log("L8: mformsGetDefOnData get data=", data, " parms=", parms);
        // TODO: Add support for alternative parsers.
        var pdata = null;
        try {
            pdata = JSON.parse(data);
        } catch (err) {
            console.log("error parsing=", err, " data=", data);
            pdata = {};
        }
        /// PUT Proper Processing HERE
        gtx.dataObj[objId] = pdata;
        context.dataObj = pdata;
        mformsCacheAjaxData(parms, pdata);
        console.log(" parsed dataObj=", pdata, " context=", context);
        mformsRenderForm(context.form, context);
        refreshShowDataObj(context);
    }
}



// AJAX Request to fetch a User Object based on the
// Fetch specification in the Metadata.  Supports interpolation
// to fill in the request URI: 
// TODO:  Need to allow creation of a POST STRING HERE
function mformGetDataObj(form, context) {
    var parms = {};
    if (context.dataObjId == null) {
        //User did not specify a object so give it a 
        //random data object Id and skip direct to 
        //rendering 
    }
    // Interpolate variables into URI Here
    var req_uri = InterpolateStr(form.fetch.uri, [context, form]);
    console.log("L263: mformGetDataObj req_uri=", req_uri);
    parms.req_headers = {
        'Content-Type': "application/json"
    };
    mformsAddAjaxSecurityContext(parms, context);
    parms.req_method = form.fetch.method;
    parms.context = context;
    parms.uri = req_uri;
    context.gbl.filesLoading[req_uri] = true;
    simpleGet(req_uri, mformGetDataObjOnData, parms);
}


//--------------
//-- mforms AJAX support for fetching Form Spec
//--------------

// Process the forms spec once received from server
// or if needed trigger request for an associated
// data record to render.
function mformsProcessFormSpec(data, context) {
    var gtx = context.gbl;
    for (var i = 0; i < data.length; i++) {
        var tObj = data[i];
        if ("widget" in tObj) {
            var widg = tObj.widget;
            gtx.widgets[widg.id] = widg;
            if ("data_context" in widg) {
                widg.data_context = widg.data_context.trim();
            }
        } else if ("form" in tObj) {
            var form = tObj.form;
            gtx.forms[form.id] = form;
            context.form = form;
            // Check to see if the data object is loaded after
            // we have the form spec and fetch it if not and
            // then render it.  If it is already loaded then
            // simply render the form for that data Object.
            if ((context.dataObjId in gtx.dataObj) || (context.skip_fetch == true) || (form.fetch == undefined) || (form.fetch.uri == undefined)) {
                // Data Object is already loaded so skip to render
                context.dataObj = gtx.dataObj[context.dataObjId];
                mformsRenderForm(context.form, context);
            } else {
                // need to fetch the data object
                mformGetDataObj(form, context);
            }
        }
    }
}

// Event handler to Parse Forms data once received from
// the server. 
function mformsGetDefOnData(data, httpObj, parms) {
    if (parms.uri in parms.context.gbl.filesLoading) {
        delete parms.context.gbl.filesLoading[parms.uri];
    }
    if (data <= "") {
        console.log("L1417: mformsGetDefOnData err=" + httpObj);
        toDiv("ErrorMsg", "Failure mformsGetDefOnData\n" + httpObj);
    } else {
        //console.log("L1420: mformsGetDefOnData get data=", data, " parms=", parms);
        var pdata = mformsParseMeta(data);
        //console.log("L1422 parsed form data=", pdata, " context=", parms.context);
        mformsCacheAjaxData(parms, pdata);
        mformsProcessFormSpec(pdata, parms.context);
    }
}

// Make Ajax Call to Load script file from server
function mformsGetDef(scriptId, context) {
    var parms = {};
    var req_uri = scriptId + ".yaml?ti=" + Date.now();
    req_uri = req_uri.replace("//", "/");
    console.log("L1433: mformsGetDef req_uri=", req_uri);
    parms.req_headers = {
        'Content-Type': "application/json",
    };
    mformsAddAjaxSecurityContext(parms, context);
    parms.req_method = "GET";
    parms.scriptId = scriptId;
    parms.context = context;
    parms.uri = req_uri;
    context.gbl.filesLoading[req_uri] = true;
    simpleGet(req_uri, mformsGetDefOnData, parms);
}

//----------
//-- Main Driver for MForms Interface
//----------
function display_form(targetDiv, formSpecUri, localContext, gContext) {
    //"dataSourceUri": dataSourceUri,
    console.log(" display_form() targetDiv=", targetDiv, " formSpecUri=", formSpecUri, " localContext=", localContext)
    if (((isNum(localContext)) || (isString(localContext)) || (localContext == null))) {
        localContext = {
            "dataObjId": localContext
        };
    } else if (!(isObject(localContext))) {
        console.log("L1719: display_form() ERROR localContext is not a object localContext=", localContext);
        return;
    }

    var dataObjId = localContext.dataObjId;
    if (dataObjId == null) {
        // When dataObjId is set to null it is an indicator
        // that we want the system to auomatically create 
        // a data object on it's behalf.
        //
        // Initialize empty data object with fabricated Id 
        // so we can skip a fetch on the server.  This assumes
        // that all fields have reasonable defaults specified in 
        // their form spec.
        dataObjId = "AUTO" + (0 - curr_time()) + "-" + (Math.floor(Math.random() * 1000)) + "-" + gContext.newObIdCnt;
        localContext.dataObjId = dataObjId;
        var dataObj = {
            "_id": dataObjId,
            "_client_created": true
        };
        if (localContext.skip_fetch == undefined) {
            localContext.skip_fetch = true;
        }
        gContext.newObIdCnt++;
        gContext.dataObj[dataObjId] = dataObj;
    }

    // Upgrade the local context object to include
    // mandatory parameters we will need latter but if the 
    // caller defined them, then use those they specified.
    //if (localContext.targetDiv == undefined) {
    localContext.targetDiv = targetDiv;
    //}
    //if (localContext.formSpec == null) {
    localContext.formSpecUri = formSpecUri;
    //}
    if (localContext.gbl == undefined) {
        localContext.gbl = gContext;
    }
    if (localContext.queries == undefined) {
        localContext.queries = {};
    }
    if (dataObjId != undefined) {
        localContext.dataObjId = dataObjId;
    }

    mformsGetDef(formSpecUri, localContext);

}