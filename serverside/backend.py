import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "pickpocket-0977cb997aac.json"
from flask import Flask, render_template, redirect, url_for,request, send_from_directory
from flask import make_response
from google.cloud import vision

app=Flask(__name__, static_url_path='')
client = vision.ImageAnnotatorClient()

@app.route('/index.html')
def send_index():
    return render_template('index.html')
    # page = open('public/index.html', 'r')
    # return page.read()

@app.route('/test.html')
def send_test():
    return render_template('test.html')
    # return send_from_directory('html', 'chrome-extension/test.html')

    # page = open('test.html', 'r')
    # return page.read()

@app.route('/has_pocket', methods=['GET', 'POST'])
def has_pocket():
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    url = request.form['url']
    threshold = float(request.form['threshold'])

    image = vision.types.Image()
    image.source.image_uri = url
    print(url)

    response = client.label_detection(image=image)
    labels = response.label_annotations
    try:
        pocketness = [ e.score for e in response.label_annotations if e.description == "Pocket" ][0]
    except IndexError:
        pocketness = None

    if pocketness is not None and pocketness > threshold:
        print("true! {}".format(pocketness))
        return "true"
    else:
        if pocketness is None:
            print("no pocket found")
        else:
            print("pocket val too low: {}".format(pocketness))
        return "false"

if __name__ == "__main__":
    app.run()

#print(has_pocket('https://cdn.shopify.com/s/files/1/0139/8942/products/womens-casma-two-pocket-scrub-top_navy-4_900x.jpg?v=1549069425', 0.5))
