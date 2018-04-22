# Client-side WebSocket Tester
A simple Client-side WebSocket testing suite for your WebSocket testing needs. I created this because "Simple Websocket Client" extension [[Chrome](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo) and [Firefox](https://addons.mozilla.org/en-US/firefox/addon/simple-websocket-client/)] did not work quite well for me. It couldn't let me know if the server has closed the connection. If I type in the wrong URL and tried to open the connection, it simply opens an alert dialog that says 'undefined'. I need a better WebSocket client than this so I created this one.
# Features
- Minimal single .html file consisting of only ~21 kilobytes in size
- Fully Client-side - You can download the .html file and run it in your computer
- No dependency - Everything the application needs is included in the .html... except for WebSocket functionality.
- Looks great with [Bootstrap v4](getbootstrap.com)
- Actually works

# Usage
**Method #1:** Browse build/ClientWebSocketTester.html and download the file. Then open the file you just downloaded with your favorite WebSocket-supported web browser.

**Method #2:** Browse src/ and download entire directory. Then open the ClientWebSocketTester.html with your favorite WebSocket-supported web browser.

# Build
Building the application is pretty easy. You will need [NPM](https://www.npmjs.com/) and [Grunt](https://gruntjs.com/) installed on your computer before you can build the application.

1) Clone the Github repository:
```sh
git clone https://github.com/tomansill/ClientWebSocketTester
cd ClientWebSocketTester
```
2) Download the required NPM packages for Grunt:
```sh
npm install
```
NPM will read the package.json and install what package.json requires for building.
3) Then you're ready to build the application. Run the following to build the application:
```sh
grunt
```
Grunt will automatically build the application by following the instructions in grunt.js file. What it does is it will create tmp/ directory in the Git directory, then it will pull files from inside of src/ and clean/minify it then it will place the application in build/. Navigate to the build/ and you will see ClientWebSocketTester.html in there all ready to go. You may delete the tmp directory when you're done with the building.

License
----
GPL-3.0

Author
----
Tom Ansill
