# 
# Meta data driven forms GUI for REST services![frigate forms logo](http-docs/img/frigate-forms-logo.png)
###### ***Status: Alpha-Dev** - Ready to use in projects but some features may need enhancements.*   

**[Live demo]( https://frigateforms.com)** for [FDA Certificates](https://frigateforms.com/demo/cert-of-need/index.html),  [Dental Claims](https://claim.frigateforms.com/),  [Dental Providers](https://provider.frigateforms.com/), etc.   *The Demos are highly responsive,  Try them on both desktop and mobile devices.*on github pages.  

Metadata based forms based GUI for CRUD operations.  Provide a Meta data based system to rapidly deliver highly functional user interfaces.  It supports editing, viewing and updating data in HTML with REST based backend services.   It can dramatically reduce the Labor required to build and maintain a custom GUI while retaining sufficient flexibility to deliver a branded, customized and efficient user experience.  

Please file a Issue to request enhancements.  You can also reach me on Linked-in [Contact](https://www.linkedin.com/in/joe-ellsworth-68222/)   main Git Repo URI:   [metadata-forms-gui](https://github.com/joeatbayes/metadata-forms-gui) 

# Sample Screen

> ### Certificate of Need

![Sample Screen for FDA Project Certificate Of Need](documentation/samples/fda-cert-of-need.jpg)

[Live Version]( https://frigateforms.com/demo/cert-of-need/index.html)  [metadata source](http-docs/demo/cert-of-need/forms/cneed.txt)  [html source](http-docs/demo/cert-of-need/index.html)

> ### Dental Claim Form

![dental Claim Form](documentation/img/dental-claim-form-1.jpg)
[Live Version](http://claim.frigateforms.com/)   [metadata source](https://github.com/joeatbayes/dental-claim-demo/blob/master/http-docs/forms/dental-claim.txt)    [html source](https://github.com/joeatbayes/dental-claim-demo/blob/master/http-docs/index.html)

> ### Simple Form

![Simple Form](documentation/img/simple-form-demo-1.jpg)

[Live Version](https://frigateforms.com/)  [metadata source](http-docs/demo/examples/forms/simple-form.txt) [html source](http-docs/demo/examples/simple-form.html)

> ### Simple Form Demonstrating field level Validation



![field level validation](documentation/img/sample-failed-regex-validation.jpg)

[metadata source](http-docs/demo/examples/forms/field-validator-regex.txt)



## Getting Started

* ### [Programmers Guide](documentation/programmers-guide.md) to get Started creating Forms

* ### [Getting Started Guide](documentation/getting-started.md)



# Files

## Documentation

- [Programmers & Syntax documentation](documentation/programmers-guide.md)
- [Requirements & Future Actions](documentation/actions_roadmap.md)
- [Getting Started Guide](documentation/getting-started.md)

## Directories 

* **[data](data)** - Contains most data used to drive the demonstration forms.  Also contains forms definition
* **[cneed.txt](http-docs/demo/cert-of-need/forms/cneed.txt)** - contains the sample form and widgets needed to display the certificate of need.
* **data/cert-of-need** - Contains sample data for different certificate of need to provide a live editing experience.  This data was download from a US government site.
* **data/widgets** - different pre-defined widgets that can be re-used across forms. 
* **http-server**
* **[docs](docs)** - root directory for the [github pages site] for this repository.  Some forms can be tested directly on this site.  Files are copied into this directory to prepare publishing a new version of the site by [update-gitpages.sh](update-gitpages.sh)
* **docs/documentation** - design notes,  usage documentation,  actions, roadmap, etc that I did not want to keep in the main directory.
* **http-docs**  All static html, javascript, css and forms files expected to be served by the web server.   Data specific things like sample certificates are not in this directory.
* **http-docs/mforms**
* **http-docs/mforms/js**
* **http-docs/mforms/css**
* **http-docs/mforms/js**

## Main mForms Implementation

* [mforms.js Main Javascript code](http-docs/mforms/js/mforms.js) - Main Javascript implementation That drives the Metadata forms engine.
* [mforms_parse.js](http-docs/mforms/js/mforms_parse.js) - Main parser for YAML like syntax used to specify screens
* [browserutil.js](http-docs/mforms/js/browser_util.js) - common utilities that make generating high speed RIA applications easy.
* [simple_ajax.js](http-docs/mforms/js/simple_ajax.js) - A drop dead simple but fast and highly portable AJAX library.



## HTTP Server

* Demo Note:   Gitpages where we host the live demo only allows form display and will not accept updates.   If you wish to demonstrate saving data via REST calls then a server capable of processing PUT and POST commands must be available.  See: [httpServer](httpServer)    
* [httpServer.exe](http-server/http-server.exe) A basic HTTP server to allow local testing of forms and data retrieval logic.   Implemented in  [http-server.go](httpSever/http-server.go)  It maps "/data" to the data directory at [../data](data/) and URI "/" is mapped that is expected to contain the main html and javascript is mapped to [../http-docs](http-docs).   All mapping is relative to current directory where executable is ran so it expects the executable to be ran from inside of "http-docs" All examples are written to expect these to be mapped.  This server can be replaced with an appropriate configured http server provided it supports the correct mapping for /data and /http-docs.  The exe extension is only present in windows.  For MAC and linux it is a executable file of same name without the extension.

## Test Files



* [mforms_parse_test.js](http-docs/mforms/js/mforms_parse_test.js) - Tests the YAML like parser with sample test test data in node.js run using node.js locally but is also used by the mforms_parse_test.html to test in browser.
* [mforms_parse_test.html](http-docs/mforms/js/mforms_parse_test.html) - May be loaded directly in chrome but most tests are ran in the browser via httpServer.



## Support Files

* [update-gitpages.sh](update-gitpages.sh) - Copies selected code and data to the /docs directory where it can be published to the [gitpages site](https://frigateforms.com/) for this repository.  This is needed to supply a basically working GUI with working forms without requiring any installation or downloading.    Code ran on the [gitpages site](https://frigateforms.com/) can not save the updated form data because [github pages](https://frigateforms.com/) does not support PUT and POST operations.





