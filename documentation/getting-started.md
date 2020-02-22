# Getting Started

If you have not already done so then you may want to review the [programmers-guide](programmers-guide.md).  Much of the important information omitted due to brevity is in the programmers guide.    



Clone the Repository

Building Your Own Form

A HTML page to contain your form

Meta data to define your form



#Build and install

## Basic HTTP REST server

### Why do we need a custom server:

We do not really need a custom server but we do need a HTTP listener to demonstrate features of the system because the system uses AJAX calls to fetch data needed to render the forms.  It also uses AJAX calls to fetch data from the underlying system and save data back to the server.  The build in HTTP server provides this function with some mapped virtual directories.  It could easily be replaced with any HTTP server such as Apache,  HAProxy,  Tomcat etc provided the same directories are mapped to the underlying forms data.

One feature this server provides is a custom handler which if passed a directory will walk that directory assemble all the data elements defined to build a set of screens and passes back the fully assembled text as a single service call.  This reduces the back and forth AJAX calls and can improve overall response time. 

#### Why do we need the MDS server:

We do not really need the MDS server but we do need REST server that can save data with HTTP PUT and fetch data with HTTP GET and HTTP POST operations.     In normal operation a set of custom REST services would be provided that could deliver this functionality.  For example rather than storing data in the MDS server you may use a Azure FHIR storage service.

