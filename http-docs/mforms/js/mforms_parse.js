function mformInterpolate(aStr, parms) {
    // TODO: Copy Interpolate functionality from GOUtil.
}

function isEOL(charCode) {
    //LF CR
    return (charCode === 0x0A) || (charCode === 0x0D);
}

function isWS(charCode) {
    // tab space
    return (charCode === 0x09) || (charCode === 0x20);
}

function isQuote(charCode) {
    // " '
    return (charCode === 0x22) || (charCode === 0x27);
}

function isOdd(num) { 
    return num & 1;
}

function isValueSet(charCode) {
    // , [ ] { }
    return charCode === 0x2C ||
        charCode === 0x5B ||
        charCode === 0x5D ||
        charCode === 0x7B ||
        charCode === 0x7D;
}

function isAlphaNumeric(str) {
    var code, i, len, dotCnt;
    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if ((code != 46) && (code != 45) && ((code < 48) || (code > 58))) {
            return false;
        }
        if (code == 46) {
            dotCnt += 1;
            if (dotCnt > 1) {
                return false;
            }
        }
    }
    // Add check for multiple "." or "-" anywhere except front of string
    var dashPos = str.indexOf("-");
    if (dashPos > 0) {
        return false;
    }
    return true;
}

// Returns true if string contain only contains
// numbers and a "-"
function isStrInt(str) {
    tres = isAlphaNumeric(str);
    if (tres == false) {
        return false;
    } else {
        dotPos = str.indexOf(".");
        if (dotPos > -1) {
            return false;
        }
    }
    // Add check for DOT and reject.
    return true;
}

function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
}

function countLeadingSpace(astr) {
    return myString.length - myString.trimLeft().length;
}

var pStates = {
    'begin': 0,
    'start_new_def': 1,
    'in_quote': 2,
    'in_json': 3,
    'norm': 4
};

// Convert values to more native types.  EG:
// "true" becomes native true,  "123" becomes
// the integer 123.   "9282.23" becomes the
// float 9282.23
function parseCoerceDataValues(dataVal) {
    if (dataVal == null) {
        return null;
    }
    if (isString(dataVal) == false) {
        return dataVal;
    }
    // "
    if (dataVal.charCodeAt(0) === 0x22 && dataVal.charCodeAt(dataVal.length - 1) === 0x22) {
        dataVal = dataVal.substr(1,dataVal.length -2);
    }
    // '
    if (dataVal.charCodeAt(0) === 0x27 && dataVal.charCodeAt(dataVal.length - 1) === 0x27) {
        dataVal = dataVal.substr(1,dataVal.length -2);
    }
    //console.log("L65: dataVal=" + dataVal);
    trimDataVal = dataVal.trim(dataVal);
    if ((trimDataVal[0] == "{") || (trimDataVal[0] == "[")) {
        // Handle Single line JSON as data value
        try {
            return JSON.parse(trimDataVal);
        } catch (err) {
            //console.log("Error parsing=", err, " trimDataVal=", trimDataVal);
            // This error is OK because in some instances we only have 
            // interpolation braces present that look like JSON but really are not
            return trimDataVal;
        }
    }

    var lcDataVal = dataVal.toLowerCase();
    if ((lcDataVal == "yes") || (lcDataVal == "true")) {
        return true;
    }

    if (lcDataVal == "no" || (lcDataVal == "false")) {
        return false;
    }

    if (isStrInt(dataVal)) {
        var parsed = parseInt(dataVal);
        if (isNaN(parsed) == false) {
            return parsed;
        }
    }

    if (isAlphaNumeric(dataVal)) {
        var parsed = parseFloat(dataVal);
        if (isNaN(parsed) == false) {
            return parsed;
        }
    }

    // TODO: Add Date Parser 
    // TODO: Add DateTime Parser

    return dataVal;
}

function parseAnchor(input, anchorMap, position, outObj) {
    var c;
    var _position;
    if (typeof input !== 'string' || input == "") {
        return {
            isAnchor: false,
            map: anchorMap
        };
    }
    c = input.charCodeAt(position)
    // &
    if (c !== 0x26) {
        return {
            isAnchor: false,
            map: anchorMap
        };
    }
    c = input.charCodeAt(position++)
    _position = position;
    while (c !== 0 && !isWS(c) && !isEOL(c) && !isValueSet(c) && !isNaN(c)) {
        c = input.charCodeAt(++position);
    }
    var name = input.slice(_position, position);
    c = input.charCodeAt(++position);
    while (c !== 0 && !isWS(c) && !isEOL(c) && !isValueSet(c) && !isNaN(c)) {
        // !
        if (c === 0x21){
            var includeObjectTest = input.slice(position);
            var regex = /!include\s+(\S+\.ya?ml$)/
            var includeObject = includeObjectTest.match(regex);
            if(isArray(includeObject) && includeObject.length > 1 && includeObject[1] != null){
                anchorMap[name.trim()] = mformsParseMeta(simpleGetBlock(includeObject[1]).txt, outObj);
                return {
                    isAnchor: true,
                    map: anchorMap
                };
             }
        }
        c = input.charCodeAt(++position);
    }
    var obj = input.slice(position);
    anchorMap[name.trim()] = mformsParseMeta(obj, outObj);
    return {
        isAnchor: true,
        map: anchorMap
    };
}

function parseAnchorAssign(input, assignMap, position) {
    var c;
    var _position;
    c = input.charCodeAt(position)

    if (isNaN(c)) {
        return assignMap;
    }
    while (c === 0 || isWS(c) || isValueSet(c)) {
        c = input.charCodeAt(++position);
    }
    _position = position;
    while (c !== 0 && (!isWS(c) || !isEOL(c)) && !isValueSet(c) && !isNaN(c)) {
        c = input.charCodeAt(++position);
    }

    var name = input.slice(_position, position);
    var position_end = name.length - 1;
    c = name.charCodeAt(position_end)
    while (isWS(c) || isValueSet(c)) {
        c = name.charCodeAt(--position_end)
    }
    name = name.slice(0, position_end + 1);
    // *
    while (name.charCodeAt(0) === 0x2A) {
        name = name.substr(1);
    }
    if (name === '') {
        return assignMap;
    }
    assignMap.push(name);
    return parseAnchorAssign(input.slice(position), assignMap, 0);
}

function parseStringToObject(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, ''); // strip a leading dot
    var a = s.split('.');
    if (Array.isArray(o)) {
        var val;
        o.forEach(r => val = iterateObject(r, a));
        return val;
    } else {
        return iterateObject(o, a)
    }
}

function iterateObject(o, a) {
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

/* Parse a YAML like script returning a nested object 
  expand any interpolated values found from parms.
..Note this parser does not attempt to provide full
..full Yaml capabilities but it's data set would 
..likely suceed to be parsed by a YAML parser.

  Design Note:  Internally manipulate stack for descent unwiding 
    to avoid overhead of recursive javascript calls.
*/
function mformsParseMeta(aStr, refObj) {
    // Make a general state object
    var outObj = null; // leave as null until we know what kind of object we are parsing
    var state = pStates.begin;
    var objStack = [];
    var tarr = aStr.split("\n");
    var lastObj = null;
    var lastKey = "";
    var currObj = null;
    var currSpaceCnt = 0;
    var currKey = null;
    var stackObj = {};

    anchorMap = [];
    outerloop:
        for (var i = 0; i < tarr.length; i++) {
            var tline = tarr[i].trimRight();
            if (tline.length < 1) {
                continue;
            }
            // start of document
            if (tline == "---") {
                continue;
            }
            // end of document
            if (tline == "...") {
                continue;
            }
            var tleft = tline.trimLeft();
            if (tleft.length < 1) {
                continue; // empty line detected
            }
            if (tleft[0] == "#") {
                continue; // comment line detected
            }
            var position = 0;
            var doubleQuote = 0;
            var singleQuote = 0;
            var c = tline.charCodeAt(position);
            while (c !== 0 && !isNaN(c)) {
                c = tline.charCodeAt(++position);
                if (isQuote(c)){
                    switch (c) {
                        // "
                        case 0x22:
                            // \ escaped
                            if(tline.charCodeAt(position - 1) === 0x5C){
                                tline = setCharAt(tline,position - 1,'');
                                --position;
                            } else {
                                ++doubleQuote;
                            }
                        break;
                        // '
                        case 0x27:
                            // ' escaped
                            if(tline.charCodeAt(position + 1) === 0x27){
                                tline = setCharAt(tline,position + 1,'');
                            } else {
                                ++singleQuote;
                            }
                        break;
                    }
                }
                // #
                if (c === 0x23 && !isOdd(doubleQuote) && !isOdd(singleQuote)) {
                    //_position = position;
                    //do { c = tline.charCodeAt(++position); }
                    //while (c !== 0 && !isEOL(c) && !isNaN(c));
                    tline = tline.slice(0, position).trimRight();
                    tleft = tline.trimLeft();
                }
                // &
                if (c == 0x26 && !isOdd(doubleQuote) && !isOdd(singleQuote)) {
                    var endOfElement = tarr.slice(i).length;
                    for (j = 1; j < tarr.slice(i).length; j++) {
                        var _position = 0;
                        var line = tarr.slice(i)[j];
                        c = line.charCodeAt(_position)
                        while (isWS(c)) {
                            c = line.charCodeAt(++_position)
                        }
                        if (_position <= position) {
                            endOfElement = i + j;
                            break;
                        }
                    }
                    const {
                        isAnchor,
                        map
                    } = parseAnchor(tarr.slice(i, endOfElement).join('\n'), anchorMap, position, JSON.parse(JSON.stringify(outObj)));
                    if (isAnchor) {
                        anchorMap = map;
                        i = endOfElement - 1;
                        continue outerloop;
                    }
                }
            }

            var leadSpace = tline.length - tleft.length;
            var firstChar = tleft[0];
            var lastChar = tleft[tleft.length - 1];
            var varName = null;
            var dataVal = null;
            var firstColon = tleft.indexOf(":");
            var remainAfterFirstChar = tleft.slice(1).trim();
            var secondChar = remainAfterFirstChar[0];
            if (lastChar == ':') {
                varName = tleft.slice(0, -1);
            } else if ((firstChar == "-") && ((secondChar == "{") || (secondChar == "["))) {
                // array element starting with dash immediatly followed
                // by '{'            
                dataVal = remainAfterFirstChar;
            } else if ((firstChar == "{") || (firstChar == "[")) {
                dataVal = JSON.stringify(eval("(" + tleft.trim() + ")"));
            } else if (firstColon != -1) {
                varName = tleft.slice(0, firstColon).trim();
                dataVal = tleft.slice(firstColon + 1).trim();
            } else {
                if (tleft[0] == '-') {
                    dataVal = tleft.slice(1).trim();
                } else {
                    dataVal = tleft.trim();
                }
            }
            if ((varName != null) && (varName[0] == "-")) {
                varName = varName.slice(1).trim();
            }

            dataVal = parseCoerceDataValues(dataVal);
            //console.log("L149: tline=", tline, "leadSpace=", leadSpace, 'firstChar=', firstChar, 'lastChar=', lastChar, "varName=", varName, "dataVal=", dataVal);

            // unwind the stack until we find a object
            // at equal level of indent.
            while (leadSpace <= currSpaceCnt) {
                if ((objStack.length == 0) || (currSpaceCnt <= 0)) {
                    currSpaceCnt = 0;
                    currObj = outObj;
                    currKey = varName;
                    break;
                } else {
                    //console.log("L158: dedent prePop leadSpace=", leadSpace, " currSpaceCnt=", currSpaceCnt, "currKey=", currKey, "currObj=", JSON.stringify(currObj), "objStack=", JSON.stringify(objStack));
                    stackObj = objStack.pop();
                    currObj = stackObj.obj;
                    currKey = stackObj.key;
                    currSpaceCnt = stackObj.indent;
                    //console.log("L165: dedent popped stackObj=", JSON.stringify(stackObj));
                }
            }
            //console.log("L174: leadSpace=", leadSpace, " currSpaceCnt=", currSpaceCnt, "currKey=", currKey, "currObj=", JSON.stringify(currObj), "objStack=", JSON.stringify(objStack));

            // If currObj is null it is because we do not yet know the type of the 
            // current object because it is either as the first of the file
            // the last item encountered was a object defenition.
            // At this point we are essentially looking at the next line 
            // and can properly assign it based on whether it is declared
            // as an array. 
            if (currObj == null) {
                var tmpObj = {};
                if (firstChar == "-") {
                    tmpObj = [];
                }
                // Set the main output object if it has not already been         
                if (outObj == null) {
                    outObj = tmpObj;
                    stackObj = {
                        'obj': outObj,
                        'key': currKey,
                        "indent": currSpaceCnt
                    };
                    //--NNobjStack.push(stackObj);
                    //--NNconsole.log("L185: indent set mainObj objStack=", JSON.stringify(objStack));
                }
                //console.log("L95: lastObj=", lastObj, "lastKey=", lastKey, "tmpObj=", tmpObj);

                currObj = tmpObj;
                // Add Current Object to Last Object
                if (lastObj != null) {
                    // Add current content to the existing object 
                    // either as an array element or as a hash element
                    if (Array.isArray(lastObj)) {
                        if (lastKey != null) {
                            // when adding a named object to an array must
                            // nest it to retain the name
                            xx = {}
                            xx[lastKey] = tmpObj;
                            lastObj.push(xx);
                            //tmpObj = xx;
                        } else {
                            // Adding an array element to an existing object
                            lastObj.push(tmpObj);
                        }
                    } else {
                        // Adding named element to current object hash
                        lastObj[lastKey] = tmpObj;
                    }
                }
                //console.log("L103: currObj=", JSON.stringify(currObj) + " lastObj=", JSON.stringify(lastObj), " lastKey=", lastKey);
            }



            if (lastChar == ":") {
                // Starting a new defenition so 
                // need to setup conditions so the next line
                // when we find out what kind of object we are 
                // defining we can detect the need.
                stackObj = {
                    'obj': currObj,
                    'key': varName,
                    "indent": currSpaceCnt
                };
                objStack.push(stackObj);
                //console.log("L221: indent needed stackObj=", JSON.stringify(stackObj), " objStack=", JSON.stringify(objStack));
                lastObj = currObj;
                lastKey = varName;
                // Setup next object for the index.
                currObj = null;
                currKey = null;
                currSpaceCnt = leadSpace;
                state = pStates.start_new_def;
                //console.log("L119: lastObj=", JSON.stringify(lastObj), "lastKey=", lastKey, "stackObj=", JSON.stringify(stackObj));
                continue;
            }

            // Save values at current level
            if (Array.isArray(currObj)) {
                currObj.push(dataVal);
            } else {
                // <
                if (typeof dataVal === 'string' && dataVal.charCodeAt(0) === 0x3C) {
                    dataVal = dataVal.substr(1);
                    Object.assign(refObj, outObj, currObj);
                    dataVal = parseStringToObject(refObj, dataVal);
                }
                if (varName == '<<') {
                    var assign_keys = parseAnchorAssign(dataVal, [], 0);
                    var merged_values = [];
                    assign_keys.reverse().forEach(element => Object.assign(merged_values, anchorMap[element]));
                    Object.assign(currObj, merged_values);
                } else if (((firstChar == "{") || (firstChar == "["))) {
                    Object.assign(currObj, dataVal);
                } else {
                    currObj[varName] = dataVal;
                }
            }
            // }

            // TODO: Add Variable Subsitution from previously parsed values or passed in context.
            //     Note Interpolation is a function already avaialble in cacre
            //  TODO: Add support for escaping in quoted values.
            //  TODO: Adding Removing string to right of # when outside of quoted string
            //  TODO: Parsing JSON as data value when string starts with "[" or "{"
            //  TODO: Parsing Quoted String
            //  Parsing a Space consolidate multi-line String
            //  Parsing a Space retained multi-line string.
            // TODO: Add support for flow sytle format which is not exactly JSON
            // TODO: Handle multi-line constants that contain JSON.  Current version only
            //   processes JSON if it is single line. 

            //console.log(" tout=", JSON.stringify(outObj, null, 2));
        } // for lines

    return outObj;
} // func

if (typeof module != "undefined") {
    // more node.js to allow local testing but doesn't hurt anything when 
    // ran in browser
    module.exports = {
        'mformsParseMeta': mformsParseMeta
    };
}