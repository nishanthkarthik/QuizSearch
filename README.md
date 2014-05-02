Revolve Quiz Search
===============

Elasticsearch client that parses prepared files of rules for FSAE/FSE and the 
FSG Event handbook, indexes them in Elasticsearch (ES) and presents a small 
web front end for searching in all three sets at the same time, while showing 
the best results from each set in the column for that set. 


2014 parsing process
-------------
* Export PDF files to txt using A-PDF Extractor (Windows only)
* Use default settings for everything but handbook, use PDF order for handbook
* Open files in Sublime Text and save with UTF-8 encoding
* Verify that regular expressions gives same result (and correct) (or + 1) in tests as they do in Sublime.
* Run insert scripts (requires ES node at localhost in current configuration)
* Make sure not to rerun insert scripts ;)
* Host web server :)

Building web client
-----------
* Built with Yeoman.io, uses ```grunt build``` to create distribution version (minmized etc), ```grunt serve``` to host continous development build with debuggable js.
* Make sure that ```var host = ``` your node server when using grunt serve, serve does not know what to do with json-requests.
* Change it back before building.

Working with node
-----------
* ```nodemon``` is a continous development tool for node.js. 
* Run continous tests with ```jasmine-node --autotest test --watch . --captureExceptions```
* Install dependencies using ```npm install```
* Install nodemon and jasmine-node globally using ```-g``` flag.

Requirements
---------
* Elasticsearch 
* Node.js built with v. 0.10.22
* npm (node package manager)
* Windows (if you want to extract text from PDFs with A-PDF Extractor ([Link to webpage](http://www.a-pdf.com/text/index.htm)))
