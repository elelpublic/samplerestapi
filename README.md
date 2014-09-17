samplerestapi
=============

This is an example skeleton for a REST api on nodejs. It is a fully functional
management service for books. The book data is stored in a mongo database called
samplerestapi on localhost.

Install Dependencies
--------------------

Most dependencies will be automatically resolved when you call 

``
npm install
``

Besides that, you should have a mongo database running on localhost.


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
