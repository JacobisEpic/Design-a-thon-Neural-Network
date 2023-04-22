from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['fileToUpload']
    if file:
        filename = file.filename
        file.save('/Users/jacobc/Documents/Design-a-thon-Neural-Network/Uploads' + filename)
        return 'File uploaded successfully.'
    else:
        return 'No file selected.'

if __name__ == '__main__':
    app.run()

