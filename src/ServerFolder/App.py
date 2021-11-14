from flask import Flask,request,json
from PIL import Image
from pytube import YouTube
import pytube
import base64
import io
import requests

app = Flask(__name__)
@app.route('/api')
def route():
    return{
        "name": ["Ruhan", "Ahmad"]
    }
@app.route('/find', methods=["POST"])
def find():
    request_data = json.loads(request.data)
    link = request_data["query"]
    yt,test = passLink(link)
    if test == True:
        ti = title(yt)
        th = thumbnail(yt)
        query = stream(yt)
        return {
            "results":[{ "title":ti, "thumbnail":th, "query":query}]
        }
    else:
        error = "LINK IS INVALID"
        return{
            "results": [{"error": error}]
        }
    
     
def passLink(link): #pass link to youtube class
    try:
        yt = YouTube(link)
        return yt, True
    except pytube.exceptions.RegexMatchError as e:
        return None,False


def title(yt):
    titleVid = yt.title
    return titleVid

def thumbnail(yt):
    thumbnailImg = yt.thumbnail_url
    im = Image.open(requests.get(thumbnailImg, stream=True).raw)
    #convertion of image
    data = io.BytesIO()
    im.save(data, "JPEG")
    encoded_img = base64.b64encode(data.getvalue())
    return encoded_img.decode('UTF-8')

def stream(yt):
    ys= yt.streams.get_by_resolution("360p").url
    return ys
   
if __name__ == '__main__':
    app.run(debug=True)