# API

#### List of API requests
```sh
- POST https://131.104.49.104/api
- GET https://131.104.49.104/api/getDepartments
- POST https://131.104.49.104/api/getCourseInfo
- POST https://131.104.49.104/api/createCourseGraph
- POST https://131.104.49.104/api/createMajorGraph
- POST https://131.104.49.104/api/createSubjectGraph
```

#### Course Search

##### HTTP request

```sh
POST https://131.104.49.104/api
```


##### Request body
- Everything is optional
- Follows the same structure as data.json
- Filters can be single string or lists
```sh
{
    "cCode": <course code>,
    "name": <name>,
    "description": <description>,
    "semesters": <semesters>,
    "lec": <lectures>,
    "restrictions": <restrictions>,
    "offerings": <offerings>,
    "creditWeight": <credit weight>,
    "department": <department>,
    "location": <location>,
    "prereqs": <prereqs>,
    "coreqs": <coreqs>,
    "equates": <equates>
    "level": <course level> (1000, 2000, etc.)
}
```

###### Example 1

```sh
{
    "semesters": ["summer", "fall"]
}
```

Returns all courses available in the summer and fall.

###### Example 2

```sh
{
    "semesters": "summer"
}
```

Returns all courses available in the summer.

##### Response body

```sh
[
    {
        "cCode": "ACCT*1220",
        "coreqs": null,
        "creditWeight": "[0.50]",
        "department": "Department of Management",
        "description": "This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.",
        "equates": null,
        "lec": "LEC: 3",
        "location": "Guelph",
        "name": "Introductory Financial Accounting",
        "offerings": "Also offered through Distance Education format.",
        "prereqs": null,
        "restrictions": "ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
        "semesters": "Fall and Winter"
    },
    ...
]
```
    


#### Getting all departments

##### HTTP request

```sh
GET https://131.104.49.104/api/getDepartments
```

##### Response body
```sh
[
    "Dean's Office, Ontario Agricultural College",
    "Department of Sociology and Anthropology, Department of Political Science",
    "Provost & VP Academic",
    "Department of Food, Agricultural and Resource Economics",
    "School of Hospitality, Food and Tourism Management",
    "Department of Population Medicine",
    ...
]
```

#### Getting data for a specific course

##### HTTP request

```sh
POST https://131.104.49.104/api/getCourseInfo
```
##### Request body
- cCode is mandatory
- uni is mandatory

```sh
{
    "cCode": <course code>,
    "uni": <university> (guelph/waterloo only options)
}
```

##### Response body
- example of ACCT*1220 data
```sh
{
    "cCode": "ACCT*1220",
    "coreqs": null,
    "creditWeight": "[0.50]",
    "department": "Department of Management",
    "description": "This introductory course is designed to develop a foundational understanding of current accounting principles and their implication for published financial reports of business enterprises. It builds the base of knowledge and understanding required to succeed in more advanced study of accounting. The course approaches the subject from the point of view of the user of accounting information rather than that of a person who supplies the information.",
    "equates": null,
    "lec": "LEC: 3",
    "location": "Guelph",
    "name": "Introductory Financial Accounting",
    "offerings": "Also offered through Distance Education format.",
    "prereqs": null,
    "restrictions": "ACCT*2220. This is a Priority Access Course. Enrolment may be restricted to particular programs or specializations. See department for more information.",
    "semesters": "Fall and Winter"
}
```

#### Getting course graph json

##### HTTP request

```sh
POST https://131.104.49.104/api/createCourseGraph
```

##### Request body
- course is mandatory
```sh
{
    "course": <course code>
}
```

##### Response body
- example response of CIS*2750 graph
```sh
{
    "children": [
        {
            "children": [
                {
                    "children": [
                        {
                            "name": "CIS*1300"
                        }
                    ],
                    "name": "CIS*2500"
                },
                {
                    "name": "ENGG*1420"
                },
                {
                    "name": "CIS*1910"
                },
                {
                    "name": "ENGG*1500"
                },
                {
                    "name": "MATH*2000"
                }
            ],
            "name": "CIS*2520"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "name": "CIS*1300"
                        }
                    ],
                    "name": "CIS*2500"
                }
            ],
            "name": "CIS*2430"
        },
        {
            "name": "ENGG*1420"
        }
    ],
    "name": "CIS*2750"
}
```

#### Getting major graph json

##### HTTP request

```sh
POST https://131.104.49.104/api/createMajorGraph
```

##### Request body
- major is mandatory
```sh
{
    "major": <course major code>
}
```

##### Response body
```sh
{
    "links": [...],
    "nodes": [...],
}
```

#### Getting subject graph json

##### HTTP request

```sh
POST https://131.104.49.104/api/createSubjectGraph
```

##### Request body
- subject is mandatory
- uni is mandatory
```sh
{
    "subject": <subject code>
    "uni": <university> (guelph/waterloo only options)
}
```

##### Response body
```sh
{
    "links": [...],
    "nodes": [...],
}
```
