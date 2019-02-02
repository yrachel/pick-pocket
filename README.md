# pick-pocket

Browse clothes online with the assurance that they all contain pockets.

## (Dev) Installation - Chrome Extension
1. `git clone https://github.com/yrachel/pick-pocket.git`
2. Visit `chrome://extensions` and turn on Developer Mode (toggle, upper right).
3. Click `Load unpacked` (button, upper left) and open the `chrome-extensions` folder

Currently, the app is set to only work on the sites listed below.

## (Dev) Installation - Serverside
1. `cd serverside`
2. `pipenv install`
3. `pipenv shell`
3. `FLASK_ENV=development FLASK_APP=backend.py flask run -p 8080 -h 127.0.0.1`

## White-listed sites
* developer.chrome.com
