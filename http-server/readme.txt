This httpServer is provided for now to provide basic HTTP serving 
functionality will replace it with one that includes MDS functionality 
when I reach the stage where I need to save changes.

Listens onport 9831

Needs to have  ../http-docs because it looks there for the webroot directory.
Needs to have   ../data defined because it looks there for any requests that start with /data

use:

Warning: 
  This utility expects to find the data directory at ../data relative to the 
  current working directory where it is ran.  It also expects to find 
  ../http-docs that contains the main html, javascript, css ets relative to 
  where it is ran.

To Run: 
  Set current directory to the directory containing httpServer.go
  Exeucte the following from the command line.
  httpServer.exe
   
  On windows it also works to double click on the executable from the
  file explorer.


To Build: 
  Install GO 
  Set current directory to the directory containing httpServer.go 
  And execute the following from the command line.  

  go build httpServer.go 
