from flask import Flask, jsonify, request
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# import ssl
# context = ssl.SSLContext()
# context.load_cert_chain('/etc/ssl/certs/nginx-selfsigned.crt','/etc/ssl/private/nginx-selfsigned.key')

@app.route('/api', methods=['POST'])
@cross_origin()
def filter():
    filters = request.get_json()

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

                    

                    #if filter comes in as a list, then loop through the list
                    if isinstance(v, list):
                        addFlag2 = False
                        for vItem in v:
                            #special case for if key is for course level
                            if k.lower() == 'level':
                                levelIndex = course['cCode'].find('*')

                                if course['cCode'][levelIndex+1] == vItem:
                                    addFlag2 = True
                                    break

                            #if course does not match the filter value, don't add course
                            #checks if the filter exists and the course doesn't have a value for that filter or if the filter exists but the course dosn't match
                            elif course[k] and vItem and vItem.lower() in course[k].lower():
                                addFlag2 = True
                                break

                        if not addFlag2:
                            add = False
                            break

                    #else, just check filter
                    else:
                        #special case for if key is for course level
                        if k.lower() == 'level':
                            levelIndex = course['cCode'].find('*')

                            if course['cCode'][levelIndex+1] != v:
                                add = False
                                break
                        #if course does not match the filter value, don't add course
                        #checks if the filter exists and the course doesn't have a value for that filter or if the filter exists but the course dosn't match
                        elif (v and not course[k]) or (v and v.lower() not in course[k].lower()):
                            add = False
                            break
                
                #add course if it passed filters
                if add:
                    res.append(course)

    
        return jsonify(res) 

@app.route('/api/getDepartments', methods=['GET'])
@cross_origin()
def getDepartments():

    #open data.json file
    with open('data.json', 'r') as f:
        res = set()
        data = json.load(f)

        #loop through department
        for department in data:
            #loop through courses in department
            for course in department['title']:
                res.add(course['department'])

        res.remove(None)
        return jsonify(list(res))

@app.route('/api/createCourseGraph', methods=['POST'])
@cross_origin()
def createCourseGraph():
    
    department = request.get_json()


if __name__ == '__main__':
    context = ('/etc/ssl/certs/nginx-selfsigned.crt','/etc/ssl/private/nginx-selfsigned.key')
    # app.run(host='131.104.49.104', debug=True, ssl_context=context)
    app.run(host='0.0.0.0', debug=True, ssl_context=context)