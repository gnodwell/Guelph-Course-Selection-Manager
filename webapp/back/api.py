from flask import Flask, jsonify, request
import json

app = Flask(__name__)
    

@app.route('/', methods=['GET'])
def filter():
    args = request.args
    filters = {}
    filters['cCode'] = args.get('cCode')
    filters['name'] = args.get('name')
    filters['semesters'] = args.get('semesters')
    filters['restrictions'] = args.get('restrictions')
    filters['offerings'] = args.get('offerings')
    filters['creditWeight'] = args.get('creditWeight')
    filters['department'] = args.get('department')
    filters['location'] = args.get('location')
    filters['prereqs'] = args.get('prereqs')
    filters['coreqs'] = args.get('coreqs')
    

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
                    #checks if the filter exists and the course doesn't have a value for that filter or if the filter exists but the course dosn't match
                    if (v and not course[k]) or (v and v.lower() not in course[k].lower()):
                        add = False
                        break
                
                #add course if it passed filters
                if add:
                    res.append(course)

    
        return jsonify(res) 


if __name__ == '__main__':
    app.run(host='0.0.0.0')