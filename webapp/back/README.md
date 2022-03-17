# API

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
    
