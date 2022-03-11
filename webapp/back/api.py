from flask import Flask, jsonify, request
import json

app = Flask(__name__)

    

@app.route('/', methods=['GET'])
def filter():
    args = request.args
    filters = {}
    filters['creditWeight'] = args.get('creditWeight')
    filters['semesters'] = args.get('semesters')


    with open('data.json', 'r') as f:
        res = []
        data = json.load(f)

        #loop through department
        for department in data:
            #loop through courses in department
            for course in department['title']:
                add = True
                #loop through filters
                for k, v in filters.items():
                    
                    #if course does not match the filter value, don't add course
                    if v != None and v not in (course[k]):
                        add = False
                        break
                
                #add course if it passed filters
                if add:
                    res.append(course)

    
        return jsonify(res) 


if __name__ == '__main__':
    app.run(host='0.0.0.0')