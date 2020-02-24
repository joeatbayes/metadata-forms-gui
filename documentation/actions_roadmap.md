Actions & Roadmap for Metadata Forms Engine

# Rank Ordered Feature Work

* When displaying dental claim on phone in portrait the text widgets are indented but radio buttons are not.  None should be indented on mobile devices. 

* Languages & Accommodations on provider detail page should be Multi-select.  Also should default to unset if no matches are found and no default specified in form spec.

* Support Checkbox Widget

* Credentialing / Educations tab.

* Provider detail Missing some fields such as  Middle Name, Prefix, Suffix, SSN, Type1 NPI Numbers, Ethnicity, DOB, Degrees.

* Prevent Lookup, formload and autosuggest  from being fired twice because the on-change and on-update are both hitting autosuggest.

* ProvDemo: Add Status field at the bottom of Group and at bottom of Table.

* ProvDemo: Provider Detail, Languages Needs Multi-select dropdown.

* ProvDemo: Provider Detail, Contact, email.  Default needs custom function to only allow one of the array elements to be selected as default. 

* ProvDemo: Provider search should filter non primary keys using a string prefix.

* ProvDemo: PythonConv:  License with License state should be a segmented key. So we can search for license only within the specified state.  Screens 11 to 13.

* ProvDemo:  Search rendering is Should render specified column name list rather than headers from server.  This is a mapping issues. not respecting column list with proper headers for simple search results. 

* ProvDemo: Ability to render optional or mandatory tag after label.

* When Simple Search Form Filter is active should suppress auto suggest and only apply the filter. 

* Set up a auto timer to clean up the request by URI based on a expiration policy to avoid crashing heavily used browser. Same things for the form context.

* Client side search needs to render headers from widget spec.

* Client side search needs to render columns based on a named widget spec.

* Client side search needs option to change heading repeat spec.

* ProvDemo: Status in on Licence status screen must allow specification of a class to show in green when active.

* ProvDemo: Specialty needs to option to delete row using trashcan.  screen 27

* PovDemo: Specialty drop down needs to support title to display larger  dropdown.

* Prov-Python:   License should be an array.   With license type, state, data. 

* Readme:  Add sample auto-suggest screen from provider

* Readme: Add sample Simple Search Screen from provider

* Utility:  Modify prviders_process_raw.py so it can accept any TSV file.  Map a subset of fields to new names build auto suggest and search indexes on a subset of fields.  Also allow it to combine fields for the auto suggest filter eg:   State + cities to produce a subseted directory source.

* ProvDemo: Show hourglass when waiting exceeds 300ms on fetching remote resources.

* ProvDemo:  Ability to make some fields mandatory based on the value of another field.  EG:  If  Other insurance is checked then all the fields in that group are mandatory

* ProvDemo:  **Add the Add new provider screens** ProvDemo: Show alternate new provider flow.   Show license match in auto suggest Give them option to click on that row to go to edit rather than hokey provider already exists.   Page 10 - 14.   Need to double check which license # we are checking against since license a multi-edit in other pages which one is the primary for that provider.

* ProvDemo: Support "&" in Tab Label

* ProvDemo: Implement Summary Tab.

* ProvDemo: Implement License/Permit Tab.

* ProvDemo: Implement License/Sanctions Tab.

* ProvDemo: Implement rest of fields for provider tab and modify to be closer to their shown sample. Page 14 - 18 with some dropdown defined on 19 to 23.

* ProvDemo: Special Programs Should not include all fields for all special programs.  There is a data value for special programs that should remove some fields.   The Meicare preclusion list includes claimRejectionDate, reinclusionDate and Business Name while the Medicare Opt out includes a transaction date.  

* ProvDemo: Implement Special Programs History

* ProvDemo: Implement Business office Tab Pages 38 - 53 This is a complex flow with sub search of business office but selecting office just populates fields into next form.

* ProvDemo: Implement Participation Tab: Page 54 - 61

* ProvDemo: Implement Participation Tab /  Define new Participation group - Page 61 - 67

* ProvDemo: Implement Credentialing / History Tab - Page 72

* ProvDemo: Implement Credentialing / Education Tab - Page 71, 73,  74

* ProvDemo: Implement Credentialing / Hospital Association Tab - Page 75-77

* ProvDemo: Implement Credentialing / Insurance Tab Page 78 - 79

* ProvDemo: Implement Credentialing / Compliance Page  80 - 81

* ProvDemo: Implement Credentialing / Professional Information Page  81-82

* ProvDemo: Implement Credentialing / Work History Information Page 84-85

* ProvDemo: Implement Claims / Deductions / Garnishments Page 88, 89, 90 Also includes Court Order 94 - 95,    Also includes Federal Notice of Levies Page #96

* ProvDemo: Implement Claims / Deductions/ Levies Page 90, 92

* ProvDemo: Implement Claims/ Deductions All Deductions  Page 93,   Also includes Export all to excel which should be done as custom function linked to a Ahref widget.

* ProvDemo: Implement Claims Deductions / Overpayments screen 97 but it really looks like just another version of court order tab with a different levy source. 

* ProvDemo: Implement Credentialing / Summary Tab Page 68-70

* ProvDemo: Implement Focused Review function Page 106-120, some lookup on 

* **ProvDemo:** Ability to determine total form stack validity even if they have not clicked on those tabs.

* ProvDemo:  **Tab Bar Support Icons with State based on form compliance:** with Sub Tab Bar as nicely shown in  screen 75 Credentialing & Hospital Association.  Provide a alternating Icon for each tab that chooses one of a set of images based status of the tab.     Will need a notion of VerifyTab or VerifySubForm so we can also do server side validation.

* ProvDemo:  Generic Status display screen for a process flow This is like a table but process but should support as a generic status object. screen 70.

* ProvPython: ProvDemo: Permits should be an array 

* ProvDemo: Local Storage to save objects as updated.  Fetch from there and allow a TTL to expire them from cache. 

* ProvDemo:  A easy way to return to search screen where no tabs are visitble.

* ProvDemo: **Update CSS to match mockup**.  Update stylesheets to reflect those provided by MarkBo at least for the dental samples.

* provPython: Speciality should be an array with first item as primary to allow show in search.      Languages should be an array.     Format Dates as Javascript standard

* TabBar:  Use cached version of form when has already been loaded during current session but expire the cached version after so many hours.

* TabBar: Remember tab states even after a form is refreshed with new parsing or prevent re-parsing for a TTL period.   This means we should keep the list of forms parsed in RAM and skip re-fetching them if we have results.  Also requires a form of TTL.

* AutoSuggest: Need to be able to exit and hide auto suggest with escape. 

* AutoSuggest:  Need to be able to move down in auto sug with arrow and select with enter.

* Move Client Side Search Spec out of form to the widget that will trigger rendering and convert part of onclick in form to array of widgets to notify.

* TabBar Responsive : Modify tab bar to use standard UL / Nested Div to render Tab / Sub Tab and deliver CSS to render as drop down menu.   Allow Mobile CSS selection to switch from full rendered Tab Bar to drop down menu when detects mobile devices. See [navbar tutorial Dropdown Navbar and responsive navbar](https://www.w3schools.com/css/css_navbar.asp)  and [responsive topnav with dropdown](https://www.w3schools.com/howto/howto_js_responsive_navbar_dropdown.asp) and [how to subnav](https://www.w3schools.com/howto/howto_css_subnav.asp) which shows subnav going all the way across under top nav.  and [Mega Menu](https://www.w3schools.com/howto/howto_css_mega_menu.asp)

* ProvDemo:  Fix reset button so on same page with Search.

* ProvDemo:  Ability to string Dialog Pop over forms into a sequence.

* ProvDemo:  Popover: Add New Provider Screens 10 to 12

* ProvDemo:  Popover: Provider Already Exists Screen 13 - This is better done as display of first couple found.

* ProvDemo: Main Provider Screen - provider tab - screens 14-17

* ProvDemo:  Need a non editing text box to display long messages. 

* Modify Date parser to accept alternative input form and reform to desired format to support date picker.

* ProvDemo: ability to display a large text box area above main widgets in the form. Screen 13:

* ProvDemo: ability to support Back button that moves forward or backward through a string a dialog forms.

* ProvDemo: Ability for Button to displaynext form.

* ProvDemo:   Evaluate what is missing to support edit functionality for screens supplied by MarkBo and propose new general purpose features or help adjust prioritize features from below.

* ProvDemo: Feature to prevent rendering a section until the container or another section receives focus.  It would be better to not even render the advanced search functions until the user requests that feature. 

* ProvDemo: Implement screens inspired by MarkBo supplied screens including sample data.  This will require form chaining with backout and Top of page tabs also needs validation of all forms across multiple forms in stack.  Also requires ability to expand a row in table with edit fields that can colllapse kind of like I did the general group but takes less space when collapsed I think we should avoid form chaining when table expansion will work.   Will need file upload functionality and implementation of paging client side for fee tables but I suspect the fee tables are small enough to render them all client side if we implement non-edit tables where the rows expand to all in-table edit rather than rendering entire row as editable.

* ProvDemo:  When a group is hidden it should remove the bottom line or some other change to save vertical space while still showing the label.   and clicking anywhere on the group should expand.  Also option to have the expansion arrow show on end of ledend instead of end of group.

* Make the Tab order on android work correctly for Text Area and radio forms.   If the user is advancing with TAB through a form we do not want to break the flow and make them close the android keyboard to advance past these fields. 

* ProvDemo: TabBar: Ability to show TABS that have incomplete work before record can be saved to server.

* SaveData: Display indicator that form when  dirty and unsaved when a field changes from original data. Save Data: Need to updates field_value_valid flag  at field level so we can rapidly determine if any required fields contain invalid values.  Save button should be disabled when invalid fields are present.  SaveData: Disable Save Button until the Form is Dirty.

* SaveDAta: Detect forms that contain unsaved data.   Warn user if they are leaving page context when there are  unsaved changes on the form. 

* FetchData: Demonstrate creating a POST string for send when fetching the object.

* SaveData: Need a list of all fields rendered for a form to make form level validation check easy.

* SaveData: Reject or Disable Save to server:  when Some Fields fail the validation rules.  **Save Data back to server:** Add Prevent Save Call until all validation rules for all widgets are successful.

* Support Form stack where new forms can be displayed on top of other forms with some control over positioning then when the other form is finished the form immediately below it is restored.  Ability to chain forms together into a series where all the mandatory fields in the series must be filled in before the form is saved to server.

* Add support to allow multiple forms to be defined in a single file and only the one marked master.

* 

* **OIDC for existing Session** - Implement basic support for OIDC to allow real data access.   This only needs  to run once a OIDC session has been established they can use login from other screens provided it is in the same domain.  Otherwise will need login screens.

* Demonstrate use of a custom rendering function.

* Utility showing data mapping to field ID to make it easier to see how the Data map will be rendered.

* Utility to combine JS files into a single output to allow individual editing but static serving.  Then break the mforms  into separate widget .js files to make it easier to edit.

* Script to copy over basic form contents to create a new repo directory or clone a new one with minimum contents to successfully render forms.   Script to create a new dependent directory that will be using the library.  Should also update it.  EG:   update dependant  ../test1  should create a new directory ../test1.  It should checkout ../mformsproto then copy the right files from the docs, js, etc directory create a new .gitignore if it does not exist and copy over the http server if it des not exist.  Any of these files that are copied over should by default not be saved in the local repository.  Will need to move the docs,js,styles inside of docs/mforms to keep them isolated from the local repo files.

* Support  save_start, save_success, save_fail callback function specified in metadata so the programmer can easily change GUI state. 

* AutoSuggest: Set cursor and end of text input after selection has been made. [See selection range](https://www.endyourif.com/set-cursor-position-of-textarea-with-javascript/)

* Demo: Dental Claim Add rest of fields from ADA form that exist below the Procedure codes.

* EditTable: Add support for Total Row where only some fields are totaled.

* Demo Dental Claim: Editable Table: Numeric field FEE is not rendering right aligned and it should be.

* Editable Table: Header alignment should match the cell alignment.

* Edit Table support a limited number of visible rows to force scroll of table. Editable Table: Support client side scroll through a larger list,     Also support a non scroll view that looks like paging even if all the data is client resident.

* Tutorial: Simple Sample Form that shows rendering a person with friends in a table that retrieves data objects from server to populate the table.    

* Edit Table: Easy ability to force label to align to left or above field. 

* Edit table: Support Notion to validate entire row so and show edit failure at row level rather  than field level. 

* Editable Table: Support for Remove Row button

* Edit Table:  Add Metadata Flag to suppress add_row functionality

* Support calling of a user specified Function to validate field contents.

* Support calling of user specified URI to validate field contents.

* Add support for a Widget Icon that is added in addition to the label field Widget Icon that is rendered before the actual Widget when specified.

* Add formatting function to take something like a REPattern and reformat with spaces. Hook into a formatting RE pattern in metadata.

* AutoSuggest:  Support preserving original values for display even though we must remove punctuation and uppercase to normalize for storage.

* AutoSuggest:  Support  allowing optional  prefilter eg:  Filter on FirstName based on Presence of Zipcode.

* Add support for basic validators functions demonstrate with zipcode and state using server side services.

* Dates Widget: Allow parsing of dates in common text formats into form required for the date widget. Also allow reformat into desired format for sending back to service.

* respect data type specifier in widget rather than keeping as text

* Edit-Table: Extend the tables widget to provide in table sort functionality by clicking on the headers.

* Edit Table: When adding a row should scroll the table to make the row added visible.

* Editable Table: When last row is still empty need to disable add row as an optional parameter.

* Demo Dental Claim:  Use AutoSuggest feature to show possible codes but extend to also show a description rather than just the expanded token.  When user enters any portion of a procedure code or  description of code show list of codes 5  that could fit.    Implement as re-usable functionality. 

* Allow custom rendering agent / widget  for auto suggest

* Editable Table: Demonstrate alternating color bands in table widget.

* Editable Table: Demonstrate repeated headers in a table widget

* Editable Table: Provide client side sort,  

* Editable Table: When adding a row and when client side sort is enabled should leave blank rows at end.

* Editable Table: Expand larger page to fit and return to server paging. 

* Editable Table: Add support for alternating color Table in list view with custom links to open up next table

* Editable Table: Show Fields that fail validating in a alternate background color

* Editable Table: Hide rest of fields for other insurance when it does not apply

* Editable Table: When other insurance does apply then those fields should be mandatory.

* Editable Table: Ability to left or right justify columns

* Editable Table: Ability to remove a row

* Editable Table: Ability to notify server of row addition

* Editable Table: Ability to notify server of row deletion

* DEMO: DentalClaim: Display description based on selected proceedure code by default then allow user to edit to change. ensure that keep the users change if they have specified it but change to reflect new code if it remains the default.

* Demo:Lookup service to allow search of procedure codes when field gains context

* Demo: Dental Claim: Hook up validator for tooth numbers.

* Demo: Dental Claim: Hookup lookup service for procedure codes with auto suggest similar to [listbox-combo](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html) but type ahead is obtained by query against the server.

* Demo: Dental Claim:Demonstrate a company search using data from cert-of-need or from provider search. 

* YAML:  Allow arbitrary creation of variables at top level of Yaml to support re-use.  EG: A float  pattern would be re-usable across many fields. 

* Extend showDiv, hideDiv in display-util to use the lastDisplayStyle feature so when re-showing a div we bring back it's original display status rather than block.  Otherwise will mess up formating when users are using flex-box or other new formatting structures.

* AutoHideCollapsible feature added at the group level.  Do not render that portion if a data match does not exist eg:    {collapsible: { dataFiter: { src_data_context: person.isbuyer  compareFun: isTrue(), monitor: [persIsBuyer]}}}    Then must set a filter event or watcher so every change to one of a set Id triggers re-evaluation to add that area.  We will need the containter rendered so there is someplace to put it even if we skipped rendering it last time.     This implies we will need a list of rendered ID for the form so we can do global validation of mandatory fields that skips those fields we chose not render.

* DeepLinking: Support Deep linking where a URI can cause retrieval of data objects and redisplay of a stack of forms rendered with data from those objects. 

* Warn programmer if form specification can not be loaded.

* Warn programmer if Requested data object can not be located.

* Edittable: Add a collapse column icon to header.  When it is clicked reduce column size to 3 characters and then only the expand icon. 

* Demo: Dental Claim:Convert CDT to CSV for rapid file transfer.

* Demo: Dental Claim: Need to Allow update or refresh of a given form field based on actions taken in other form fields.  EG: A search set a member identity field based on the results of a search field. 

* Demo: Dental Claim:Support display only field.   Also support initial state of disable for a form widget.

* Demo: Disable state for a given widget depending on the state of another widget. Allow some fields to be disabled in metadata spec to prevent editing. Allow some fields to be disabled for editing until a rule becomes true.  

* Ability to Support hidden fields that will create the default value at a given path to fill out a valid structure.

* Demo: Dental Claim:Will have to create a Potential claim ID so we have something to save can probably use timestamp.

* Demo: set city and state from zip when the zip is not set to None.

* Demo: Dental Claim: Validate Zip from list of valid zipcodes.

* Demo: Dental Claim: Support rendering array of procedure codes and editing inline.   Better yet always render a blank line when they start filling in a line then add another blank line.

* Demo: Dental Claim: Validate zipcode against presence of a zipcode file show error message when no match.

* Demo: Dental Claim: Default quantity to 1

* Demo: Dental Claim: Validate Tooth numbers

* Demo: Dental Claim: Validate Tooth surface

* Demo: Dental Claim: Default date to last date entered or current date if no date entered.

* Demo: Dental Claim: When user enters company name provide search dropdown list

* Demo: Dental Claim: When user enters name of poly holder do search for select

* Demo: Dental Claim: When procedure code is entered support rapid search that pops up when they enter.  Or add a search popup that allows search and then sets the code.

* Demo: Dental Claim: When procedure code is entered then populate description if description does not have text in it.

* Demo: Dental Claim: Filter Patient Search with results from Server side Search Call 

* Filter dropdown list based on keyword.  EG: User types period and List filters to only show those codes containing that keyword.

* Demo: Dental Claim: Deliver data from server matching [FHIR standard ](https://www.hl7.org/fhir/valueset-c80-practice-codes.json.html)

* Demo: Dental Claim: Support pop-up search form so when user enters field to Name a User pop up search field to find users.   If user types "mand den" the filter should find "D5751"

* Demo: Dental Claim: Support to validate field value with Ajax Call.  EG once a user enters a policy number attempt to validate on server.  Requires  3 validation states.  unchecked,  valid, invalid, validation in process.

* SaveData: Ability to transform data to entirely different structure for output.   Use a Output Path in data context.   Save To Server: Custom output DOM model different than input DOM model.  Generic support for copying from a given getNested path in document read from server into different setNested path in preparation to send back to update web service.

* Demo of Patient Intake form

* Demo of Implement sample Client / sub client forms.

* getting started guide show how to clone repo and use script to update local files while keeping things mostly separate for their own project.    EG: clone the repo then copy the js and css files over to mforms directory inside of their own docs directory.  Copy the sample_form over to mform sub directory. update their .gitignore file to not check in these directories.

* Support Generic Notion of a hideable sub form where the system can open sub form on entry or hover to parent div reflow to make fit.   Should use html detail view if feasible. Should support manual save hide.   Show status when mandatory fields are empty or hidden fields contain fields failing validation widgets. 

* DEMO: Add support to render list of certificates with a  metadata form widget.

* Programmers Guide: Tutorial showing custom rendering agent

* **Allow form display without custom HTML** - Ability to specify form display and data object in URI when driver page is loaded.  This allows demonstrating new forms without requiring any code changes.

* Add some of new HTML widgets like Date

* Support Audit Widget that shows each data change that has occurred for the current data object.   Optionally show forms displayed.

* **DeepLink: Support for deep linking** which would load and render a stack of form along with data object in background.  To allow page to be re-displayed on a new device.

* Support to feed incremental changes back to server so user can switch devices even before they submit using the deep link features. 

* 

* Add support for chained forms that display one after another

* Add support for disabled widgets.

* Add support to disable submit button when all mandatory fields are not filled in.

* Ability to fetch contents of dropdown, radio, checkbox lists from remote service rather than embedding in  form.

* Support Horizontal slider widget.

* Save To Server: Ability to Re-try save in to server after failure of function call.

* Save To Server: Show Saving Message in browser when save Ajax Call is in process.

* Save To Server: Editable Table:  Ability to call service when row added, when row removed, when row changed and user leaves that row. 

* Image Display Widget

* Image Upload Widget

* Simple Server that can save updates for Demo purposes.

  * Add SSL to Simple Server
  * Save basic changes to objects in a data directory
  * Apply basic security for these objects based on JSession
  * Add basic OIDC support for the server 
  * Add Native HTTPS functionality to the server so if we have a valid cert it can support HTTPS
  * Utility to convert arbitrary TSV file into a searchable permuted index one file per column with optional specification to combine columns such as first, last middle name.
    * File bisect server utility to find object identity from matching tokens 
    * Think about how to make this useful for publishing on a static server where I do not have server side functionality so it can be demonstrated on git.io. EG produce a list of Object ID  for each token and keep in one file per toke then the client can match.  Then create edge ngram files showing the tokens that are contained in each edge prefix to allow fast match retrieval by client.   
  
* Consider offering alternative Table structure using the editable content feature rather than rendering the input fields.   Problem there is we can not use the built in feature sets.

* **Support stylesheets specified in the form metadata**.  These are  are added at runtime by naming in the form specification.  Must support interpolation. 

* **Support Alternative Style sheets by Brand**.   Ideally show that as a interpolation parameter.  Allows a single form to be rendered with different look and feel. Ability to specify custom style in uri such as abc.com#style=x3 that causes a style sheet to be added to the page.  The list of stylesheets is computed from a spec in the form and if the style parameter is present in the file is interpolated into the style URI from parameters specified in the URI.  

* Ability for Display Rather than Edit Mode for Form which does not require re-specifying the entire form and all the widgets.  -  Support display mode which either renders the widget without the edit components or which changes the CSS selector to hide the edit field,  disables the field for editing changes the spacing to a tighter space.    Should support transition to display mode rather than edit mode as simple function call. 

* Basic Tutorial - Shows how different features work. 

  * Demonstrate multiple image selector widget.
  * Demonstrate support for fields with labels forced to wrap 
  
* Extend Forms parser to allow include loading additional files which have contents loaded at end of the existing file.    What happens in Yaml if you reload the same key a second time.

* Editable Table: Need to move the Expand Collapse rendering function to re-usable module so can use it for table or row or include the table in a field set where we get that behavior for free. The table Label with be better done as field set label anyway.

* Support a expanding Detail Widget where it shows some basic text then when user clicks on a expansion icon it expands that row and allows editing and adding to an array of items.

* Demo of simple Drag and Drop Editor that changes form in realtime.

* Demo: XRay viewer Widget with Zoom,  pan, brightness, crop and edit saves as metadata.

* Color Picker Widget.

* Ability to source data from two different objects resident in the object graph for interpolation.   EG: If you have a master contact list and are editing a detailed contact then you may want to render fields in the sub form from both records.  This requires the data_context to be enhanced so it can handle branched access where it currently only looks into the active object.    EG:  If the master contact has a ID of 300 and  a field of first_name we want to render in the sub form then the individual contact event has an ID of 18181 and is the active object and it includes an attribute master_contact: 300 then we need to be able to derive a path that goes to the root of the object graph using 300 as the key to retrieve it.   EG:   /objects:{master_contact}.name  which derives to going into the global list at GTX.objects['300'].name  rather than looking at current object.

* DEMO: Button or Link to show the metadata definition in a separate target window.

* Display currency with formatting showing space at grouping then remove the space prior to conversion.

* Support streaming local changes to browser local storage so can restore if user leaves page and returns.   

* DEMO: Implement the List of certs form that drills into the detail for specific cert.  

* ProvDemo: Ability to change contents on in a field list for drop down type widgets based results from on a web service calls by the  time field gains context based on contents in data model based on prior changes.  EG:  When user selects state then the list of cities in drop down list is modified.  Should also allow all child objects to be specified in data context and the select a subset branch using other data fields as a key.

* ProvDemo: Demonstrate breadcrumb trail that makes it easy to get back to list view or prior form.

* Debug: Display error popup / alert when form spec can not be located on the server.

* **Server side meta data combiner** that reads the field include features and builds the total meta data server side rather than requiring multiple round trips.  This improves performance in marginal networks.

* Utility to convert sample people to JSON and save in fireBase on google.  Also modify sample to query firebase.

* Add support to allow multiple data objects to be rendered and update the form as the data objects are received. 

* Map Sample Data  Using FHIR  data structures and URI as much as possible

* Package MDS server to allow import of the MDS feature and local server that defines additional handlers.   Need this to easily  have custom local directories for DOCS and build a handler to aggregate all widgets defined in a directory tree and fed them back as one stream.  I want the MDS server to be added so we have native support for a data directory where we can run GET/PUT/POST commands. 

* Demonstrate server with save functionality using serverless agent.   [Most likely using Google Firestore with Python server less functions](https://cloud.google.com/firestore/docs/quickstart-servers) [basic serverless tutorial](https://read.iopipe.com/the-right-way-to-do-serverless-in-python-e99535574454)  [googles managed container](https://cloud.google.com/run/docs/quickstarts/build-and-deploy)  [google serverless cloud functions](https://cloud.google.com/functions/) [google cloud function quick start](https://cloud.google.com/functions/docs/quickstart-console) [google cloud functions with data storage](https://cloud.google.com/functions/docs/tutorials/storage)  [streaming data from cloud storage into cloud functions using BigQuery](https://cloud.google.com/solutions/streaming-data-from-cloud-storage-into-bigquery-using-cloud-functions)  [Cloud functions for Firebase](https://firebase.google.com/docs/functions)  [google bigtable getting started](https://cloud.google.com/bigtable/docs/samples) [Google simple function to use Bigtable](https://github.com/GoogleCloudPlatform/golang-samples/tree/master/bigtable/helloworld)  [google firestore](https://cloud.google.com/firestore/) [google firestore getting started](https://cloud.google.com/firestore/docs/quickstart-servers)

* Demo Claim: Demonstrate displaying data from a FHIR service.

* Demo Claim: Add sample using a publicly available REST API to source the data.

* Edit Table: Extend tables widget to allow a multi-level sort functionality by Shift click on different headers.  Show shift click instruction on hover or some other multi-level sort function

* DeepLinking: Add support to change context on right hand # of uri at top of browser as user selects different widgets.  

* Create a new set of files for cert of need where the facility operator is consolidated to include all certificates for that operator.  Also include ability to get the children with a sub query.

* Add physicians list to the data set for demonstration.

* Add fallback of manually built date picker widget for older browsers .   Support Native Date picker on modern browsers fall back to rendered. 

* FormLoader: Allow naming a widget that triggers loading an additional file to complete filling in a form.  See Also specifying an include file in a form. 

* Metadata: Allow fragments to be enhanced with data from local environment such as active forms, loaded data objects and other form files using interpolation

* Metadata: Server tool or servlet ability to assemble all fragments from a directory tree assemble them and return in one set to reduce round trips wile remaining highly editable.   This can be done statically to allow serving from simple static server.

* Metadata: Allow Frame sets and Row Sets etc to reference attributes defined in a separate file or inline.

* Metadata: Validation failure refuse to submit messages

* Metadata: Mandatory Fields that refuse to submit if not filled in.

* Metadata: Ability to fetch list of options for dropdown from a file or service on file. 

* Rendering: Ability to pass previously defined variables loaded from same or included file into anchor expansion so common data attributes do not have to be described

* Rendering:Ability to name common field validation functions in meta data such as validate zipcode which makes a web service call to valide the zipcode matches the state.

* Rendering: Ability to name custom JavaScript functions in meta data

* Rendering: Ability to call a web service after every key stroke for type as you go validation

* Rendering: Ability to Call a web service on field exit for type as you go validation

* Ability to call a web service with parameters sourced from global variables to get data 

* Ability to assemble data from fields modified to form a post body

* Ability to spool changes as they are clicked back to server 

* Agility to make service call to get a empty new record for new form type.

* Ability to show everything changed in this session in drill in screen 

* Ability to autosave changes in WIP state prior to user pressing SAVE.   Ability to retrieve WIP state.  WIP state would be specific to a user but possibly not consider saving a .WIP file. 

* support realtime field edit with javascript callback

* support realtime validation check with ajax call

* Support loading list of values for popdown list from specified URI in form / widget

* Ability to load CSS from file specified in the form rather than requiring it to be loaded in parent html page.

* Implement tools / test  screen which validates contents of one field based on contents of another field using RegEx.  Must make it easy for developers to test regex patterns before they specify them in metadata.

* Add support to collapse and resize column to table. 

* Improved Set Nested / get nested array support.  The current version will only work if you have an object that contains an array of objects.   It would break on an array of strings or and array of arrays.   Need to handle these two use cases to provide best support for tables especially nested tables.

* YML Parser: Fix Array level parsing error when parsing complex RegEx Strings.:  In the example below the ^ on the front of the array elements at widget.valid_pat.pattern seems to be stripping of the first characters of the string which makes the RE pattern invalid.  See:  [../../data/forms/examples/field-validator-regex-multiple.txt](../../data/forms/examples/field-validator-regex-multiple.txt)   When fixing this remember the other fix for lines that contain comments on end.  

  ```
  -widget:
      id: basic_zip
      data_type: text
      type: text
      label :Zip
      size: 11
      data_context: person.zip
      class: input_field
      valid_pat:
         pattern:
           -^[0-9]{5}(?:-[0-9]{4})?$
           -^(([\d]{2} )|(2[abAB] ))*(([\d]{2})|(2[abAB]))$
         message : Invalid zipcode try 5 digits or zip plus 4. eg: 84401 or 84401-8178
  
  - form:
     id : sample_field_validator
     class: inputFrm
     label: Regular Expression based Field Validator
     show_data_obj_div: dataObjDiv
     widgets:   
        - basic_zip
  ```

  


* YML Parser: Ability to use value from any previously defined data element.  Eg define phone # validator pattern and then re-use with access via get nested.  EG:    

  ```yml
  validators:
    auth_patern: {0.9}8.\s\w\n
  
  widget:
      id: preauthNumber
      data_type: text
      type: text
      label : Preauthorization number
      data_context: claim.insurance.preAuthRef
      class: input_field
      ignore-case-match: true
      valid_pat: <validators.auth_pattern
  
  ```

   Please update programmer guide accordingly.

  

* YML Parser: **Ability to import a base widget Def from previously defined widget** and only override what changes.  

  ```yaml
  validators:
    auth_patern: {0.9}8.\s\w\n
    phone: ^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$
    zip: ^[0-9]{5}(?:-[0-9]{4})?$
  
  - &ANCHOR widget: 
    id: basic_phone
    data_type: text
    type: text
    label: phone #
    data_context: empty
    class: input_field
    ignore_case_match: true
    valid_patt: <validators.phone
    
  -widget: 
      << : *ANCHOR
      id: basic_phone
      label: Patient Phone #
      data_context: claim.patient.phoneNum
  
  ```

  Please update programmer guide accordingly.

  

* YML Parser: **Fix parser to properly handle lines truncated with a comment** 

  * The text from # on should be removed and any trailing spaces trimmed from the end. 

  * YML Parser:  comments trailing the data value on the line are not properly detected and removed after parsing YML.   The text after # on id: basic_zip should be removed during parsing with any trailing spaces removed.

    ```
    -widget:
        id: basic_zip #Some comment text
        data_type: text
        type: text
    ```

  *  See: mforms_parse_test.html Run Test #6 for details.    This one does not declare the sub objects properly because it did not recognize and remove the comments.

  * ```
    - widget:
      id: procedures # Code must be unique
      type: table # Type is used to lookup rendering agent
      total_col: # Total Column is used 
        - arrProcFee # One of columns to total
      columns: # List of column objects
        - arrProcDate: # one of my columns
             total: false # wether I should add total on this column
             label: Procedure Date        
        - arrProcArea:
             total: false
             label: Area
             title: Procedure Area
    ```




* YML Parser: **Ability to import another widget definition file using a #INCLUDE directive**.  Make sure the #Include is relative to the directory containing the file where it occurs.  Included files may contain other files.  This acts just like reading the file and combining the text at the time of the directive.  In reality we make a call do the parse and inject the results into the parse tree.  The included files must  be processed in a blocking fashion because further parsing may use things referenced in them.     I would eventually implement a server side handler that would do this step but also want client side to allow complete operating with simple static file server.   Example syntax below but willing to consider alternatives.   Please update programmer guide accordingly.
  * 

  ```yaml
  ----------------------------------
  File data/forms/validators.txt
  ----------------------------------
  validators:
    auth_patern: {0.9}8.\s\w\n
    phone: ^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$
    zip: ^[0-9]{5}(?:-[0-9]{4})?$
  
  ----------------------------------
  file data/forms/common/address.txt
  ----------------------------------
  -widget:
      id: basic_addr1
      data_type: text
      type: text
      label :Address 1
      size: 50
      mandatory: true
      data_context: insurer.address1
      class: input_field
      ignore-case-match: true
  
  -widget:
      id: basic_addr2
      data_type: text
      type: text
      label :Address 2
      size: 50
      mandatory: true
      data_context: insurer.address2
      class: input_field    
  
  -widget:
      id: basic_city
      data_type: text
      type: text
      label :City
      size: 35
      mandatory: true
      data_context: insurer.city
      class: input_field
  
  -widget:
      id: basic_state
      data_type: text
      type: text
      label :State
      size: 2
      maxlength: 2
      mandatory: true
      data_context: insurer.state
      class: input_field
      valid_patt: ^[0-9]{5}(?:-[0-9]{4})?$
      valid_fun: validate_zipcode
  
  ----------------------------------
  file data/forms/dental/dental-claim.txt
  ----------------------------------
  #include ../common/address.txt
  #include ../common/validators.txt
  
  -widget: <  basic_city
    id: patCity
    data_context: patient.address.city
    
  -widget: < basic_state
    id: patState
    data_context: patient.address.state
  
  ```
------------
-- Interpolation parameters should be fully
-- supported during interpolation for both widget 
-- re-use and for file interplation: EG:
-----------
expinp:
 gpath: patient
 gid: Patient
 glable: Patient

-widget:
    type: text
    data_type: text
    size:20
    mandatory: false
    class: input_field
    id: {expinp.gid}_addr2
    label :{expinp.glabel}Address 2
    size: 50
    data_context: insurer.{expinp.gpath}address2
    _id: AddressPatt
--- Note creation of _id which we need because we are
--- going to fill in the main ID with the original values
--- and will not be findable after expansion.   Alternatively
--- we index the pre-expansion pattern and then use it for
--- the import but then it becomes unclear when the system

--- should apply interpolation.
------
--- since the most recent defenition of expinp replaces 
--- any prior version the next time we use it will contian
--- any new or changed parameters.
--------
----
--  Now we should be able to re-use the parameter group
--  by re-importing It should also work for re-use.
----
expinp:
  gid: provider.Addr
  glabel: Provider Adddress

< _id:AddressPatt
---------
Should produce
---------
-widget:
    type: text
    data_type: text
    size:20
    mandatory: false
    class: input_field
    id: {expinp.gid}_addr2
    label :{expinp.glabel}Address 2
    size: 50
    data_context: insurer.{expinp.gpath}address2
    _id: AddressPatt

-- NOTE: Alternatively we may be better of using proper support
--- for Anchors and then import from them rather than introduce the
--- the _id semantic which is really action like an anchor.

-- NOTE:  I really wanted a way to import the entire address group
--   and change it only by the interpolation parameters without
--   having to re-import it as a file but the file version will work
--   fine provided we cache the pre-interpolation file so we can reprocess
--   it without additional network overhead.


--- Interplation extended for
--- redefining a group.  If a group is defined in an
--- external file then interplation should just work and the
--- file imported multiple time with different interpolation 
--- parameters will create repeated groups that vary only by
--- the expansions.

  ```

  * Ability to specify file to include in one Yaml to allow re-use of meta data.
  * Ability to use YAML anchors @ extensions  to create template fields and only supply what was missing.   Includes adding a tutorial. 


* YML Parser: **Support Default values for widgets**.  Note:  If the support for  -widget: < apath works well enough we may be able to defer this because we could just use  -widget < default at the top level and get the same effect.

  ```
defaults:
  type: text
  data_type: text
  size: 20
  mandatory: false
  class: input_field

-widget:
    id: basic_addr2
    type: text
    label :Address 2
    size: 50
    data_context: insurer.address2

------------------------
 SHOULD PARSE AND PRODUCE A RECORD THAT LOOKS LIKE
 ------------------------
 -widget:
    type: text
    data_type: text
    size:20
    mandatory: false
    class: input_field
    id: basic_addr2
    label :Address 2
    size: 50
    data_context: insurer.address2
    

------------------------
 Because it merged in the Defaults from the Widget
 for any value not specified.  This is different
 than the -widget: < apath because defaults would
 still be added to any widget and fill in any fields
 not specified either directly or by the <
 ------------------------


```



* YML Parse: **Fix JSON on line with Error handling**.   At current time if a Widget contains a data value where they chose to specify encoding with embedded JSON it causes replacement of the Widgets Array with a string even though there where valid widgets before it in the file.  Proper behavior is to Detect the error and then set only that widget element.    This error could be because I encoded the entire widget as a JSON string but it should still not destroy the other valid widgets. 

```
  widget: { "id" : "saveButton", "type" : "button", "label" : "Save", "size" : 8, "class" : submit_button"}
  ```

  Notice the missing opening quote on submit button.    When this error occurs  when you get to rendering the form in line   if ("widget" in tObj)  in mforms.js  in mformsProcessFormSpec() the widget array contains only the string of the widget that failed to parse.  At worst case it should have been added to the array of widgets with the unparsable string as the data value.

* 

* YML Parser: **Support localized labels**:** with a flag in the form to specify the URI of a Label generation service where we pass the form.id and widget.id , localization parameter and it passes back the localized label.   Optional pass the actual label text, form id and localization and do the lookup.  Must take the set of these to provide lower network latency.  Provide a sample service that just returns the same labels passed or an empty set.  An empty set of return labels means there is no override.  

  Implement basic support so labels can all be treated as lookup values.  This may be done as a post  processing step after the YML Parse..       In effect anyplace a label was specified it can be replaced with a value looked up.   As shown below we use interpolation values {brand}/{local} to compute the URI where the value will be retrieved.   The lookup is done by Id so the merge is a little smart since when the line in the localization file "basic_addr1: Adresse 1" it has to look through all the widgets and forms an any other item where we may specify a and look for obj.label and replace what is there with "address 1" if the ID matches what is specified.  Please update programmer guide accordingly.    When the form attribute "labels: " is defined the system will automatically attempt to perform localization when the form data is first fetched using the function:  function display_form(targetDiv, formSpecUri, dataObjId, gContext)   This means the lookup values for interpolation must be set before the form is loaded.

  ```
-------------------------
  -- basic-form.txt -------
  -------------------------
  -widget:
      id: basic_addr1
      data_type: text
      type: text
      label :Address 1
      size: 50
      mandatory: true
      data_context: insurer.address1
      class: input_field
      ignore-case-match: true

  -widget:
      id: basic_addr2
      data_type: text
      type: text
      label :Address 2
      size: 50
      mandatory: true
      data_context: insurer.address2
      class: input_field    


  - form:
     id : basicForm
     class: inputFrm
     label: A Basic Form   
     fetch:
        uri: data/claims/{dataObjId}.JSON
        method: GET
        parse: JSON
     save:
        uri: data/claims/{dataObjId}.JSON
        verb: PUT
        where: body   
     show_data_obj_div: dataObjDiv
     labels: basic_form_localize/{brand}/{local}
     widgets:   
             - topFieldsGroup
             - saveButton

-----------------------------------
  -- basic_form_localize/national/fr.txt
  -----------------------------------
  basic_addr1: Adresse 1
  basic_addr2: Address 2
  basic_city: ville
  ```

  * **Ability to import arbitrary text for a label or a paragraph from a specified URI**.  Run it through interpolation and then render into the Div.  This allows the system to modify contents of what is normally static text such as an explanation paragraph.  This would be ran through interpolation against the selected object.  This is intended to allow arbitrary markup inclusion in generated output but may not be absolutely needed.
  
    * TODO:  Produce a sample and use case that is not supported by the #include module above.
         
  ```

  































------------------------------

# DONE - COMPLETED ITEMS

* DONE:2020-02-17: EditTable: Allow Removal of AddRow button.  Also allow the label and style to be shown for the AddRow.  Allow HTML symbol prefix or suffix  image and allow leading image icon. 

* DONE:JOE:2020-02-16: ProvDemo: Implement the render dropdown form service call. ProvDemo: Demonstrate render dropdown but wait to get contents until field gains context

* DONE:JOE:2020-02-09: ProvDemo:  Python to convert sample dentists into searchable format with simple handler to do the search but preferably make it work entirely client side.

* DONE:2020-02-23:JOE: Client side search needs to filter records based on other fields that are filled in.

* DONE:JOE:2020-02-23: Build a basic docker image showing how to host the HTTP server. 

* DONE:JOE:2020-02-16: ProvDemo:  State widget should be rendered from list of states returned from service

* DONE:JOE:2020-02-23: Modify all Ajax calls made by mforms to use single method to function mformsAddAjaxSecurityContext(parms, context) to add the security context.  This is intended to make it easy to make the calls OIDC compliant.

* DONE:JOE:2020-02-17: Provider Detail When languages group is added as a group formatting causes improper second column. Fixed: When No Fieldset was specified was getting one extra /div. in render group.

* DONE:2020-02-17:JOE: ProvDemo: Allow tables to be rendered with a series of DIV instead of a table while retaining custom array.  this can allow wrapping of columns which is not possible with normal table. 

* DONE:2020-02-23JOE:  ProvDemo: Search multi-word tokens are failing in search due to escaping that is slightly different.  Need to duplicate exact functionality from the python make safe function.

* DONE:2020-02-17:JOE: ProvDemo: Option to render Table as a set of nested DIV rather than the Table Syntax

* DONE:2020-02-17: ProvDemo: Move the Collapse Expand Icon inside the field group label. 

* DONE:JOE:2020-02-11: Generic Delimited parser for tab delimited files with headers.  Converts into an array of objects matching the column names in the TSV.

* DONE:JOE:2020-02-15: Switch over to using Flexbox instead of inline-block for field placement.

* DONE:JOE:2020-02-08: Detect portrait mode on phone and change font size or try different font specifications such as 12px to see what shows up most consistently readable across the largest number of devices.

* DONE:JOE:2020-02-15: Add support for tabs across top of page rendering sub forms into tab as they are clicked.

* DONE:JOE:2020-02-13: DEMO: Hide data / JSON view when in  portrait on mobile device. Main Index Page: Suppress the display of JSON from Data Object or reflow move to bottom when page is too narrow

* DONE:JOE:2020-02-13: Add support to change text size when page is displayed on mobile device.

* DONE: JOE:2020-02-14: Readme: Add Tabs and subtabs screen from provider

* DONE:JOE:2020-02-16: ProvDemo: Update Buttons CSS to reflect what is required for the mockup.

* DONE:JOE:2020-02-16: ProvDemo: Implement Special programs Tab. Page 31 - 37.  Note implemented as a simple array rather than the multiple screens they showed.

* DONE:JOE:2020-02-10: Demo: Dental Claim:Create basic ADA For Fields.

* DONE:JOE:2020-02-15:  Editable Table: Add a way to group multiple widgets in a single cell when the table would otherwise be too wide. Note: Done by using a group widget in the table column.

* DONE: JOE:2020-02-10: Ability to specify a class for label independent of class of the widget.

* DONE:JOE:2020-02-11: Text widget when num_dec has been specified should reformat to fit the specification when it looses format.  In reality this should be implemented as a general purpose function that allows a reformat pattern to do this work. 

* DONE:JOE:2020-02-05: ProvDemo: Download and parse public data for Dental providers to drive auto suggest, search and supply basic data for demo.

* DONE: JOE:2020-02-15: Demonstrate ability to  handle multi-level nested forms eg:   Plan to list of clients to single client to list of sub clients to list of contacts to single contact with CRUD Add, Edit, Drop.

* SKIP: Alternative Found: Make a clean way to read a directory of files and return header data to allow rendering a summary table.  EG: If each contact is in a separate file then would want to returns some basic data for each contact to render the initial table prior to the click that drills in to edit each piece of content.

* DONE:JOE:2020-02-13: Allow label Class to override normal generated class for the label.  Demonstrate shrinking label for state to allow better formatting.    This is to allow easier formatting when we want custom behavior out of a subset of labels.

* DONE:JOE:2020-02-15: Done in a different way using cached objects and ability to render child forms in tabs.  Add support to invalidate and remove parent object after edit of child when child views are included in parent fetch.  Or support editing them in place so other forms can properly see the changed fields when sub form edit field is displayed.

* DONE:JOE:2020-01-30: **DEMO** [Configure custom domain](https://help.github.com/en/github/working-with-github-pages/configuring-a-custom-domain-for-your-github-pages-site) for github pages site

* DONE: JOE:2020-02-08: Demo: Dental Claim:Form field which Sums other fields on the form.  Even when those fields are not part of table

* DONE:JOE:2020-01-30: Demo: Dental Claim:Feature to set a random / timestamp data object Id after an empty object is loaded. Support rendering blank form when source object can not be located.

* DONE:JOE:2020-01-30: Demo: Dental Claim: Download sample CDT Codes to populate drop down.

* DONE:JOE:2020-02-13: Done as Auto Suggest for provider can be reused for Claim: Demo: Dental Claim: Fast search filter widget to make search by codes easy. AND Filter dropdown list of CDT codes as user types the code.

* DONE:JOE:2020-02-16: DentalClaimDemo: Make the container objects flex-wrap they are not reflowing on browser correctly.

* DONE:JOE:2020-02-15: Validation message is broken in dental claim for tooth system.

* DONE:JOE:2020-02-15: ProvDemo: License:  An editable table where each row is composed of a multi-field block that is not presented in an array.  

* DONE:JOE:2020-02-15: TabBar:  Sub tab bar should remember what tab was open after visiting other major tab button and then returning to sub tab menu.

* DONE:JOE:2020-02-15: tabBar: When child exits should render the next line but only when active.

* DONE:JOE:2020-02-15: tabBar: When tab is selected the children should show.  This may be a display: none, display:block type scenario so each tab can render all children up front.  When a tab is active and specifieds a form or a widget then that widget will be rendered into the div created by the parent div.   Since data could have changed in the display then must re-render child form content at time of display or when tab is activated.

* DONE:JOE:2020-02-14: ProvDemo:  Execute search and render results.    This requires a read only table with alternating rows where the row is clickable or individual sub widgets are render able.  Supports hover over row and scroll box on bottom of row.  Screen-8.  OK so we have a main search area any of city, last_name, first_name changing could trigger a search that can return a list of record. if more than one of them are filled in then we can only do the search on one and filter on the rest or search on all and then merge.   the other fields will be driven based as filters.  If we new from autosug results which one has the smallest # of times then we could use it to get the shortest search results. For easy implementation then simply use the others as filter records.  Apply search set retrieval in this order only use lower priority items to drive initial search higher priority items are empty.  last_name, first_name,  city, specialty.

* DONE:JOE:2020-02-10: Field rendering system Rendering: Describe all common widget types in meta data only

* DONE:JOE:2020-02-10: Rendering: Ability to name widget rendering agents in a table so they can be over-ridden

* DONE:JOE:2020-02-10: support interpolating values from context into URI  specified in the form.

* DONE:JOE:2020-02-10: Agility to differentiate a new record from update in calls to save 

* DONE:JOE:2020-02-10: Support basic filed edit with re-pattern.

* DONEJOE:2020-02-10: For fda sample page remove the right navigation payne and enlarge middle payne when  displaying on anything less than 900 px;

* DONE:JOE:2020-02-09: Auto Suggest values displayed should have _ converted to space for display

* DONE:JOE:2020-02-10: Auto Suggest must hide when the widget looses focus.

* DONE:JOE:2020-02-10: Add auto suggest index for provider zip

* DONE:JOE:2020-02-09: ProvDemo:  Add Auto suggest for NPI, Specialty,  city, state

* DONE: JOE:2020-02-08: Allow a group to be autohid on initial rendering.  Need to support advanced search.

* DONE:JOE:2020-02-08: updated CSS for  /index.html to better support media selector.  It now renders correctly on moto gs in both portrait and landscape mode.

* DONE:JOE:2020-02-15: ProvDemo:  Implement Top Menu Bar Widget where the menu could be display a different form  could be separate page.

* DONE:JOE:2020-02-15: ProvDemo: Implement TAB bar widget which is very similar to top menu bar except is supports a change of visualization for the TAB that is currently open.

* DONE:JOE:2020-02-15: TabBar: Ability to defer rendering inactive TABS until the tab is displayed.  Since content on one tab could change based on actions in another tab then 

* DONE:JOE:2020-02-08: Implement auto complete disable feature to prevent browser from filling in incorrect data.   Need to support advanced search because it was incorrectly filling in data for advanced search fields even though it was not initially rendered.

* DONE:JOE:2020-02-08: Move forms specs over closer to the demo HTML that uses them out of the Data directory.  Also move the demo forms into their own directories using their own CSS so a change in one demo page does not change behavior of others.

* DONE:JOE:2020-02-09: **Auto Suggest** - Demonstrate auto_suggest form sends the URI for each token generates a  edge ngram file which contains the expanded tokens that can expand from the current string.  Eg;  if  typing sm the system can return smith, smyth, smell.  The return format should be the token with highest number where number could be number of clicks or number of occurrences  and should be sorted in order highest count to lowest.  eg: smyith\109 then smith\31.   The field queries the database and pulls back all matches and renders them as a  autosuggest for that field.   Should only keep the first 20 most common expansions.  System should handle multi-token with combined set.

* DONE:JOE:2020-02-09: ProvDemo: Demonstrate basic search functionality

* DONE:JOE:2020-02-10: ProvDemo: Modify data parser to generate file extensions that git can recognize as text files. Also make sure that we are not coercing data to upper case.   

* DONE:JOE:2020-02-10: ProvDemo: Add Arkansas and TN, Indiana to the provider data set.

* DONE:JOE:2020-02-08: Move documentation directory out of the docs directory so edited elsewhere and is only updated when the update-gitpages.sh is ran.  This will prevent the gitpages pipeline from being triggered when not needed.

* DONE:JOE:2020-02-20: Validation error messages in table are displaying on wrong row.  Probably need to add row ndx to id of status widget.

* DONE:JOE:2020-02-13: Ensure both the Global and local context are searched during interpolation

* DONE:JOE:2020-01-26: Move Demo-page layout to separate CSS so only that CSS germane to general forms remains in meta-forms. css also move cert-of-need.css specific styling to an external file and dental specific styling to adaform.css.

* DONE:JOE:2020-01-27: Demonstrate a RegEx field Validation functionality 

* DONE:JOE:2019-01-30: Increase font sizes when displayed in portrait mode on android browser.

* DONE:JOE:2019-01-15: Ability to take reasonable defaults when not specified.  EG:  dataType can be assumed to be string unless otherwise specified.    PlaceHolder can be assumed to be Label unless specified.  PlaceHolder can be assumed to be same as Label unless specified. 

* DONE:JOE:2020-02-13: Ability to parse delimited files with headers

* Ability to load a form entirely from demo page by naming form and data source on URI like what we do in CSV tables.

* DONE:JOE:2019-12-20: FormLoader: Allow YAML like syntax with embededed single line JSON as input.

* DONE:JOE:2019-12-19: FormLoader:  Allow naming a form file to load which contains all widgets.

* DONE:JOE:2020-02-11: Metadata: Optional:  Allow some data elements such as arrays to be described as Widgets.  Done as part of edit table. 

* DONE:JOE:2019-12-19: Metadata: Ability to described fields or sets of fields that can be re-used.

* DONE:Eric:2020-02-20: Ability to re-use the fragments without copy paste

* DONE:JOE:2020-02-11: Metadata: Validation failure messages

* DONE:JOE:2020-02-11: Metadata: Ability to list Options for dropdown in the metadata itself.

* DONE:JOE:2020-01-26: Add userCollapsible feature to group level that renders the group with an icon to collaps with Icon to re-explode.

* DONE:JOE:2020-01-26: Modify arrow when group is contracted to point down to expand and up when contraction is available.

* Done:JOE:2020-01-25 warn programmer if data context can not be located.

* DONE:JOE:2020-01-25: Add Default Values for Form fields when no value is supplied in the JSON

* DONE:JOE:2020-01-25: Support null for data Obj Id which will create a object with time + random generated id.

* DONE:JOE:2020-01-25:Groups should render even when label is omitted.

* DONE:JOE:2020-01-25: Ability to show additional descriptive text when user enters a widget for editing also displays when they hover over that field.

* DONE:JOE:2020-01-25: Add Force Wrap directive to widgets that converts the inline-block to display:block for it's containing div.

* DONE:JOE:2020-01-25: Make the group containers directly addressable in Css with different classname.

* DONE:JOE:2020-01-25: Make Field set object directly addressable in css with different classname

* DONE:JOE:2020-02-25: Group Container that can suppress field set generation so it can just be used to help control layout.DONE:JOE:2020-01-25: Find sample claim forms and sample claim screens document in reference links. 

* DONE:JOE:2020-01-25: Find sample claims in FHIR form including a general example and a Dental example.

* DONE: JOE:2020-01-25: Produce a CDT file to populate the CDT search button. 

* DONE:JOE:2020-01-25: Download sample zipcode file to validate zipcode lookup with web service.

* DONE:JOE:2020-01-25: Gather a large list of fake people names to use to drive simple search behavior

* DONE:JOE:2019-12-19: Remove the create input field from browser util since we are using a different approach and it could be confusing to have both approaches in the same library.

* DONE:JOE:2019-12-17: Ability to specified HTML relative to the Div ID the form is created in to allow users to customize to their hearts content.

* DONE:JOE:2019-12-17: Must be able to display a form in a pre-existing DIV structure without taking over the entire pages.

* DONE:JOE:2109-12-19: Ability to support tabbing order through fields in the generated form

* DONE:JOE:2019-12-16: Demonstrate first with Certificate of Need Data from DFORMS System but converted to Dynamic Form.

* DONE:JOE:2019-12-19: Prevent right nav from wrapping when page is shrunk too far.

* DONE:JOE:2019-12-16: When starting form load need to also trigger retrieval of the data record and defer display until record is loaded.  Need unambiguous way to map user data for a given form rendering to a specific data object when multiple root objects are already cached in RAM.  If the data specific object is already loaded in RAM re-use the one already available to re-render the same form.  

* DONE:JOE:2019-12-19: Modify form fetch to skip fetch is form is already in memory

* DONE:JOE:2020-02-02: Add a counter of how many objects auto created during this RIA session and append to end of auto gen ID as additional cache buster.

* DONE:JOE:2020-02-02: Implement Basic Save Object Function that can post or PUT back to server.  SaveData: Finish code to submit object back to a target URI.

* DONE:JOE:2020-02-02: Demonstrate easy way of forcing labels to wrap the field so they are above the field instead of to the left.

* DONE:JOE:2020-02-01: Allow extra label class to be specified.

* DONE:JOE:2020-02-02: Fixed: Drop downs in table cell are not keeping value in domain object when table is refreshed.

* DONE: JOE:2020-02-02: Editable Table: Support total columns

* DONE:JOE:2020-02-02: Support fixed decimal formatting for table cell columns

* DONE: JOE:2020-02-01: Editable Table: To allow resort we need to be able to replace the table in the div container  which means we need to be able to render it without the container so we can to a toDiv into that container.

* DONE:JOE:2020-02-01: Extend the Tables widget to provide custom widgets in the tables.

* DONE:JOE:2020-01-30: Horizontal Div blocks are not properly wrapping.

* DONE:JOE:2020:02-02: Demo: Dental Claim: On claim form support adding new blank lines with a +

* DONE:JOE:2020-02-01: When updating DOM with record value if the field fails it's validation then display error message at that time in a div that remains hidden until validation validation suceeds

* DONE:JOE:2020-02-01: Switch to using HTML label-for tag rather than old approach.

* DONE:JOE: 2020-01-28: Add Basic Date Widget Support

* DONE:JOE:2020-01-31: Add support for HGroup.   Horizontal Group ideally using CSS to allow same row flex placement but with a min-width  to force wrapping as the screen shrinks.  horizontal group that is not allowed to wrap widgets. EG for city, state, zip

* DONE:JOE:2020-01-28: Add support for drop down list widget

* DONE:JOE:2020-01-28: Add support for radio button widget

* DONE:JOE:2020-02-01: Display edit error messages below the field when validation pattern match rules are violated.  Implement validation function showing an error message

* DONE:JOE:2020-01-27: Allow clicking on +- to show hide Div group sections make rendering the collapse functions optional.

* DONE:JOE:2020-02-01: Editable Table: Must support column header rather than field headers.

* DONE:JOE:2020-02-02: Editable Table: Add basic support for Rows & Columns 

* DONE:JOE:2020-02-02: DEMO:Dental: Tooth and area_oral_cavity are not properly handeling array structure.  They are both dropdown list.    Need to modify radio, select, etc to use the override data path like text box.

* DONE:JOE:2020-02-02:Editable Table: Support Add Row column.

* DONE:JOE:2020-02-01: Add Basic array level support to setNested and getNested.

* DONE:JOE:2020-02-01: Editable Table: Ability to render a minimum number of rows even if blank

* DONE:JOE:2020-02-01: Editable Table: Ability to add a new row.

* DONE:JOE:2020-02-01: Switch over to using Label-for instead of manual label div specification.

* DONE:JOE:2020-02-01: Editable Table: Fix Add row so it is rendered as a button rather than Div also added container div to keep it inside the parent div without float:right

* DONE:JOE:2020-02-01: Editable Table: Support a Table for Array Element Display 

* Editable Table: Ability to change sort by clicking on header

* DONE:JOE:2020-02-01: Editable Table: Table Row Widget with includes Columns which support 1 or more widgets where the data binding includes the row index.   

* DONE:JOE:2020-02-01: Editable Table: Modify get nested so if a value is passed with path as  family.children.[3].name.first that is pulls the 3rd child.  Same with updates.

* DONE:JOE:2020-01-28: Consolidated CSS files and removed some redundant settings. 

* DONE:JOE:2020-01-28: Modified generation of save_button using container div to keep it inside the parent div were the form is rendered.

* DONE:JOE:2020-01-28:  Update Readme file to point users to getting started guide and programmers guide.  Also added the dental claim sample and removed text that would have been duplicated between the two other guides.   Updated links to take people to the meta source for the samples.

* DONE:JOE:2020-01-28: Update front portion of programmers guide to show the source code needed to create a simple form. 

* SKIP:JOE:2020-01-25: Fix Parser to properly Handle Array of Sub Objects semantic: NOTE:  See Test 5 in mforms_parse_test.html   It seems to work correctly.  Need a better test use case if it is really broke.

  ```yaml
    - widget:
      id: procedures
      type: table
      total_col:
       arrProcFee
      columns: 
        - arrProcDate:
             total: false
             label: Procedure Date        
        - arrProcArea:
             total: false
             label: Area
             title: Procedure Area
  ```

- DONE:JOE:2019-12-19: Demo of contact form that shows changes in the bound JSON as the fields are edited.
- DONE: JOE: 2019-12-19: Add Dropdown select field
- DONE: JOE:2019-12-19: Add Radio Button List  Supply basic style for horizontal or vertical
- DONE:JOE:2019-12-19:Add support for Date Widget.
- DONE:JOE:2019-12-19: Add support for vertical radio button as a css styling option.
- DONE:JOE:2019-12-19: Covert vgroup coding to a field group 
- DONE:JOE:2019-12-18: Add support for TextArea covering several lines.  Change cert of need description to display in this widget.
- DONE:JOE:2019-12-17: Add support for update of data object when fields change
- DONE:JOE:2019-12-19: When no label is included in Vgroup then suppress generation of label field.
- DONE:JOE:2019-12-17: Properly render multi-line text area field.




* 