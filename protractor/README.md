# Protractor Automated Testing Demo

To run automated tests using Protactor, you need to run several things all at once in various command windows. Follow these instructions:

1. Open a terminal window and `cd` to the `protractor/` folder in this repository. Then hit `ctrl+t` to open up two other terminal tabs rooted in the same directory.
2. In the first window, execute the command `webdriver-manager start`. This starts the Selenium web driver server, which is the thing that will open and automate the web browser.
3. In the second window, execute the command `python -m SimpleHTTPServer`. This starts a local web server listening on port 8000, rooted on the files in your current directory. This will allow us to load our `protractor/index.html` file by opening a browser window with the address `http://localhost:8000`.
4. In the third window, execute the command `protractor test/protractor-conf.js` to run the tests.

