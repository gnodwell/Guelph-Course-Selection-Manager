import json

def readJSON(file="scraper/data.json"):
    """open file and load json data into 'data'

    Args:
        file ([String]): name of file to read in and parse JSON
    """
    with open(file, "r") as f:
        data = json.load(f)

    return data

def getMajorCode(major):
    return major[major.find('(')+1:-1]

def main():
    data = readJSON()

    majorDict = {}
    for major in data:
        #map major's course code to courses supplied in major
        majorDict[getMajorCode(major['major'])] = major['title']

if __name__ == '__main__':
    main()