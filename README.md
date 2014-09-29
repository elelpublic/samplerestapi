samplerestapi
=============

This is an example skeleton for a REST api on nodejs. 

It is a fully functional management service for books. 
The book data is stored in a mongo database called
samplerestapi on localhost.


Install Dependencies
--------------------

You need to have nodejs, bower and mongodb installed on your system.

Most other dependencies will be automatically resolved when you call 

``
npm install
``

Install dependencies for the sample html client with:

``
bower install
``

Start
-----

``
node server.js
``

The REST server by default runs on:

``
http://localhost:8500/api
``

It also has an example client running on:

``
http://localhost:8500/
``

References
----------

  * http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4


