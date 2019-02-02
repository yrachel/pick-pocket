import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "pickpocket-0977cb997aac.json"

from google.cloud import vision

def has_pocket(url, threshold):
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = url

    response = client.label_detection(image=image)
    labels = response.label_annotations
    pocketness = [obj.score for obj in labels if obj.description == 'Pocket']
    if pocketness[0] > threshold:
        return  True
    else:
        return False

print(has_pocket('https://cdn.shopify.com/s/files/1/0139/8942/products/womens-casma-two-pocket-scrub-top_navy-4_900x.jpg?v=1549069425', 0.5))
