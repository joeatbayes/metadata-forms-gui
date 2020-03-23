/* Test mparser.js function using local nodejs.
  intended to make it easier to unit tests javascript
  intended to run in browser.
*/

if (typeof require != "undefined") {
  var mforms = require("./mforms_parse.js");
} else {
  // emulate module variable for browser
  var mforms = {
    "mformsParseMeta": mformsParseMeta
  };
}

var testStrForm1 = `
- widget: 
     id: projectNum
     widget_type: text
     label:
       text: Project #
       place: left
       align: right
     width: 38
     size: 20
     data_context: cert/con_project_number  
     required: true
     max_len: 25
     class: input_field
     data_type: text

- widget:
    id: facilityName
    widget_type: text
    label : Facility Name #
    label_align: left
    size: 30
    data_context: con_project_number  
    required: true
    max_len: 50
    class: input_field
    data_type: text


- form:
  - row:
      col:
        widgets:
         - projectNum
         - FacilityName

`;

var testStrOptArr = `
- option:
       - {"label" : "Admin", "value" : "admin"}
       - {"label" : "Regional", "value": "region"}
       - {"label" : "Full", "value" : "Full"}
       - {"label" : "unknown",  "value": "none",  "default" : true}
`;

var testStrPeople1 = `
- jack:    
    projectNum : 1983
- lingua:
     hasPlane: false
     pets:
       sam:
         living: true
       girtude: 
         living: false
     kids:
      - hacker:
           living: true
      - nancy:
           living: false
`;

var testStrPeople2 = `
- jimmy 
- jack:
    phone : 206-828-2387
    sex: male  
    projectNum : 1983
- lingua:
     phone: 205-686-38383
     yearBorn: 1983
     hourly: 198.24
     taxCred: -1983.21
     hasCar: true
     hasPlane: false
     cars: ["ford", "toyota Tacoma", "subaru"]
     label:
       text: I am text
       align: right
     pets:
       sam:
         living: true
       girtude: 
         living: false
     kids:
      - jack:
           living: true
      - nancy:
           living: false
`;

var testStrPerson3 = `
person:
     id: lingua
     phone: 205-686-38383
     yearBorn: 1983
     hourly: 198.24
     taxCred: -1983.21
     hasCar: true
     hasPlane: false
     cars: ["ford", "toyota Tacoma", "subaru"]
     label:
       text: I am text
       align: right
     pets:
       sam:
         living: true
       girtude: 
         living: false
     kids:
      - jack:
           living: true
      - nancy:
           living: false
`;

var testStrPerson4 = `
     id: lingua
     phone: 205-686-38383
     yearBorn: 1983
     hourly: 198.24
     taxCred: -1983.21
     hasCar: true
     hasPlane: false
     cars: ["ford", "toyota Tacoma", "subaru"]
     label:
       text: I am text
       align: right
     pets:
       sam:
         living: true
       girtude: 
         living: false
     kids:
      - jack:
           living: true
      - nancy:
           living: false
`;
var testMerge1 = `
---
- &CENTER { x: 1, y: 2 }
- &LEFT { x: 0, y: 2 }
- &BIG { r: 10 }
- &SMALL { r: 1 }

# All the following maps are equal:

# Explicit keys
- widget:
    x: 1
    y: 2
    r: 10
    label: center/big

# Merge one map
- widget:
    << : *CENTER
    r: 10
    label: center/big

# Merge multiple maps
- widget:
    << : [ *CENTER, *BIG ]
    label: center/big

# Override
- widget:
    << : [ *BIG, *LEFT, *SMALL ]
    x: 1
    label: center/big
`;

var testMerge2 = `
- validators:
      auth_patern: {0.9}8.\s\w\n
      phone: ^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$
      zip: ^[0-9]{5}(?:-[0-9]{4})?$

- &GENDER widget:
      data_type: text
      type: radio
      label : Gender    
      class: hor_radio
      ignore-case-match: true
      default: M
      option:
         - {"label" : "Male", "value" : "M"}
         - {"label" : "Female", "value": "F"}

- &ANCHOR widget: 
      id: basic_phone
      data_type: text
      type: text
      label: phone
      data_context: empty
      class: input_field
      ignore_case_match: true
      valid_patt: <validators.phone

- widget: 
      << : *ANCHOR
      id: basic_phone_1
      label: Patient Phone
      data_context: claim.patient.phoneNum

- widget: 
      << : *GENDER
      id: gender_1
      data_context: claim.patient.gender

`;

var testInclude = `
- validators:
      auth_patern: {0.9}8.\s\w\n
      phone: ^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$
      zip: ^[0-9]{5}(?:-[0-9]{4})?$

- &GENDER !include gender_test.yaml

- &ANCHOR widget: 
      id: basic_phone
      data_type: text
      type: text
      label: phone
      data_context: empty
      class: input_field
      ignore_case_match: true
      valid_patt: <validators.phone

- widget: 
      << : *ANCHOR
      id: basic_phone_1
      label: Patient Phone
      data_context: claim.patient.phoneNum

- widget: 
      << : *GENDER
      id: gender_1
      data_context: claim.patient.gender

`;


var testStrNestedObj = `
- widget:
  id: procedures
  type: table
  total_col:
     - arrProcFee
  columns: 
    - arrProcDate:
         total: false
         label: Procedure Date        
    - arrProcArea:
         total: false
         label: Area
         title: Procedure Area
     
`;

var testStrObjectCommentOnEOL = `
- widget:
  id: procedures # Code must be unique
  type: table # Type is used to lookup rendering agent
  total_col: # Total Column is used 
    - arrProcFee # One of columns to total
  columns: # List of column objects
    - arrProcDate: # one of my columns
         total: false # whether I should add total on this column
         label: Procedure Date        
    - arrProcArea:
         total: false
         label: 'Area '' #54' # hash in single quotes with escaped single quote
         title: "Procedure Area \\" &" # ampersand in double quotes with escaped double quote
     
`;


// Should produce and array of tab inside the widget.
var testProperArrayDetections = `
- widget:
  id: provMainTabBar
  class: tabbar
  type: tabbar
  content_div: mainTabSubBar
  tabs: 
    - tab:
        label: Summary
        class: tabGood
        form: forms/provider-summary
        active: true
    - tab:
        label: Provider
        icon: none
        form: forms/provider-provider
    - tab:
        label: License
        icon: none
        child:  provLicenseTab
`;

function mParserTest(label, dataStr) {
  var tres = mforms.mformsParseMeta(dataStr, {});
  console.log("L77: mParserTest:", label, " Out=", JSON.stringify(tres, null, 2));
  return tres;
}

if (typeof require != "undefined") {
  mParserTest("test 1 form", testStrForm1);
  mParserTest("test 2 people", testStrPeople1);
  mParserTest("test 3 people", testStrPeople2);
  // Tests to see if an outermost object of 
  // type person gets created with the proper 
  // containment eg {" person" : {}}
  mParserTest("test single person dict object", testStrPerson3);
  mParserTest("test single dict at outer level", testStrPerson4);
  mParserTest("test merge 1", testMerge1);
  mParserTest("test merge 2", testMerge2);
  mParserTest("test include", testInclude);
}