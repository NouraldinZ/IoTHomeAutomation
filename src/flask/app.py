from flask import Flask
import json

app = Flask(__name__)
@app.route('/smartLight/power',methods=['POST'])
def index():
        # some JSON:
        x =  '{ "name":"John", "age":30, "city":"New York"}'

        # parse x:
        y = json.loads(x)
        return y["age"]

if __name__ == '__main__':
    app.run(debug=True, port=80, host='0.0.0.0')