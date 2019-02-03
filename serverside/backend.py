import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "pickpocket-0977cb997aac.json"
from flask import Flask, render_template, redirect, url_for,request, send_from_directory
from flask import make_response
from google.cloud import vision
app=Flask(__name__, static_url_path='')
client = vision.ImageAnnotatorClient()

@app.route('/index.html')
def send_index():
    #return send_from_directory('html', 'chrome-extension/test.html')
    page = open('public/index.html', 'r')
    return page.read()

@app.route('/test.html')
def send_test():
    #return send_from_directory('html', 'chrome-extension/test.html')
    page = open('test.html', 'r')
    return page.read()

# @app.route('/analyze')
# def send_js():
#     page = open('chrome-extension/js/analyze.js', 'r')
#     return page.read()

@app.route('/has_pocket', methods=['GET', 'POST'])
def has_pocket():
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    url = request.form['url']
    threshold = float(request.form['threshold'])

    # image = vision.types.Image()
    # image.source.image_uri = url
    # print(url)
    #
    # response = client.label_detection(image=image)
    image = {
        'image': {
            'source': { 'image_uri': url }
        }
    }
    response = client.annotate_image(image)

    labels = response.label_annotations
    pocketness = [obj.score for obj in labels if obj.description == 'Pocket']
    if len(pocketness)>0 and pocketness[0] > threshold:
        print("true! {}".format(pocketness[0]))
        return "true"
    else:
        if len(pocketness) == 0:
            print("no pocket found")
        else:
            print("pocket val too low: {}".format(pocketness[0]))
        return "false"

if __name__ == "__main__":
    app.run()

#print(has_pocket('https://cdn.shopify.com/s/files/1/0139/8942/products/womens-casma-two-pocket-scrub-top_navy-4_900x.jpg?v=1549069425', 0.5))
