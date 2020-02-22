# Links & Reference

## Referenced Repositories

* [Computer Aided Call Response System](https://bitbucket.org/joexdobs/computer-aided-call-response-engine) Provides a advanced YAML like syntax for specifying elements of data in a easily human edited format.   I felt this approach was better than trying to use a native JSON with everything in one huge file because I wanted the ability to load fragments of widgets or widget sets for re-use.  It also uses a version of the same Dynamic HTML generation features used in DForms which is the basis for the widget generator.
* [https://github.com/joeatbayes/CSVTablesInBrowser](https://github.com/joeatbayes/CSVTablesInBrowser)  - Easily display data from CSV tables in HTML tables with nice formatting that can be overridden by Cell.  Includes repeated headers, etc.  
* [Meta Data Server](https://bitbucket.org/joexdobs/meta-data-server/src/master/)  High performance HTTP server with built in highly scalable saving and retrieval of data using HTTP GET & POST.  Designed to support super high performance enrichment of data after a traditional search engine has delivered core data results.  [Go Modules on bitbucket](https://medium.com/rungo/anatomy-of-modules-in-go-c8274d215c16)  [goutil](https://github.com/joeatbayes/goutil) Common functions packaged for reuse in my various GO projects.   [GoPackaging](https://github.com/joeatbayes/GoPackaging) Example I produced showing how to download GO packages direct from Github.   [httptest](https://github.com/joeatbayes/http-stress-test) a http test utility for a command line packaged for direct build using the go get command.



## FHIR

* [FHIR  Resource Index](https://www.hl7.org/fhir/resourcelist.html) -  A good starting point when trying to map a private domain model into FHI
* [Insurance Plan](https://www.hl7.org/fhir/insuranceplan.html) - Details of an insurance plan.  Includes Network.  Product Admin, Etc.  
* [Plan Administrator](https://www.hl7.org/fhir/insuranceplan-definitions.html#InsurancePlan.administeredBy)  See Also  [Organization](https://www.hl7.org/fhir/organization.html) since an administrator is a form of an organization
* [Organization](https://www.hl7.org/fhir/organization.html)  Organization is base for any company or legal unit involved in care, billing, administration.  It is used to define the organization once and reference it from other entities based on the type.  Eg:  An [Insurance Plan](https://www.hl7.org/fhir/insuranceplan.html)  includes a [Plan Administrator](https://www.hl7.org/fhir/insuranceplan-definitions.html#InsurancePlan.administeredBy)  which is a link to an organization.  Note: Organization can refer to each other in a arbitrarily deep fashion to describe any type of company hierarchy.
* [Sample Claim expressed in FHIR](https://www.hl7.org/fhir/claim-example.json.html) [hl7 FHIR Claim Spec](https://www.hl7.org/fhir/claim.html) [Sample Dental Claim JSON](https://www.hl7.org/fhir/claim-example-oral-contained.json.html)
* 

## Forms & Processes 

* [Anthem claims Submission Manual](https://www11.anthem.com/provider/nv/f5/s5/t1/pw_b130799.pdf?refer=ahpfooter) Includes detailed samples of how to used codes and lookup.
* [Indiana Health Coverage Programs Provider reference claims submission](https://www.in.gov/medicaid/files/claim%20submission%20and%20processing.pdf)  - Includes Sample Web Ap.  A bit dated but usable. 
* [EZClaim submission](https://www.ezclaim.com/manuals/premierbilling/index.html#!Documents/additionalclaimscreeninformation.htm)
* [sample ADA claim submission form](https://www.ada.org/~/media/ADA/Publications/Files/2019ADADentalClaim%20Form_2019May.pdf?la=en),  
  *  [Better Sample](https://victims.ca.gov/docs/forms/providers/adaclaimform.pdf),  
  * [Delta Dental Sample Claim Form][https://www.deltadentalva.com/uploadedFiles/Generic/adaclaimform.pdf]

## Technical

* ### **YAML**

  * [Yaml syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
  * [online YAML validator](https://codebeautify.org/yaml-validator)
  * [online YAML to JSON converter](https://codebeautify.org/yaml-to-json-xml-csv)
  * [online YAML lint](http://www.yamllint.com/)

* ### **Javascript**

  * [dynamically adding a css file](http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml)
  * [dynamically removing and read javascript file](http://www.javascriptkit.com/javatutors/loadjavascriptcss2.shtml)

* ### **CSS**

  * [Use Media Queries to change browser behavior on small devices](https://www.smashingmagazine.com/2010/07/how-to-use-css3-media-queries-to-create-a-mobile-version-of-your-website/)
  * [tool to show page in different viewports](https://app.protofluid.com/#https://joeatbayes.github.io/metadata-forms-gui/)
  * [stylizing checkboxes](https://cssnewbie.com/stylize-checkboxes-and-text-fields-using-css/#.XfcRdmTYq0o)
  * [Fixing legend formatting](https://beckism.com/2008/12/display_block_legend/)
  * [Block styling legend](https://beckism.com/2008/12/display_block_legend/)
  * [Right align and block outline legend](https://pixy.cz/blogg/clanky/css-fieldsetandlabels.html)
  * [validation patterns for phones](http://regexlib.com/Search.aspx?k=phone&AspxAutoDetectCookieSupport=1)
  * 

* ### **GO**

  * .
  
* ### RegEx

  * [online RegEx Tester with replace](https://www.freeformatter.com/regex-tester.html)
  
  * [RegEx quick reference](http://regexrenamer.sourceforge.net/help/regex_quickref.html)
  
  * [8 regular expressions you should know](https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149) match user name,  match email,  match url,  match ip, 
  
  * [Reg Ex examples with many samples](https://www.regular-expressions.info/examples.html])
  
    * [match floating point number](https://www.regular-expressions.info/floatingpoint.html)
  
    * [verify credit card number](https://www.regular-expressions.info/creditcard.html)
  
    * [validate email address](https://www.regular-expressions.info/email.html)
  
      [validate dates](https://www.regular-expressions.info/dates.html)
  
  * [cspan common RE patterns](https://metacpan.org/pod/Regexp::Common)
  
  * [complete javascript guide to regex](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)
  
  * [validate fields using javascript and regex](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)

* ### html

  * [make a div element editable](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=html5-make-element-editable)
  * [html symbols by character code](https://www.toptal.com/designers/htmlarrows/symbols/)
  * [CSS Navigation Bars](https://www.w3schools.com/css/css_navbar.asp)
  * 



# Data Sources

* [CDT Codes with Descriptions](https://ca.healthnetadvantage.com/content/dam/centene/healthnet/pdfs/medicare/2019/CA/2019-CA-HNTCD-MA-MAPD-DSNP.pdf)  Used to source some example data

* [Fake Name Generator with fake attributes like address, Id, Etc](https://www.fakenamegenerator.com/thanks.php)

  