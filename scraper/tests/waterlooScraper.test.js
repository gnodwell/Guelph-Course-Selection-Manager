const { test } = require('@playwright/test');
const assert = require('assert');
const { getCoursesData } = require('../uWaterloo/coursesScraper')

test.use({
    viewport: {
        width: 800,
        height: 600
    },
    colorScheme: 'dark'
});

const expected = {
    "subject": "ACCOUNTING & FINANCIAL MANAGEMENT (AFM)",
    "data": [
        {
            "cCode": "AFM*100",
            "creditWeight": "[0.00]",
            "name": "Introduction to Experiential Learning",
            "description": "The objective of this non-credit course is to expose students to the expectations for experiential learning, helping them develop the skills and relationships needed to allocate their time and maintain balance across their academics, career, health and wellness, and community.",
            "prereqs": "First-year Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*101",
            "creditWeight": "[0.50]",
            "name": "Introduction to Financial Accounting",
            "description": "This course is an introduction to financial accounting. The preparation and use of financial statements is examined. The accounting cycle and assets and liabilities reporting, is discussed.",
            "prereqs": "Not open to students in AFM, Mathematics or CPA, Biotechnology or CPA, CFM, Arts and Business, Environment and Business, Science and Business, or Human Resources Management",
            "coreqs": null,
            "restrictions": "AFM*123 or ARBUS*102, AFM*191, BUS*127W or BUS*227, MSCI*262"
        },
        {
            "cCode": "AFM*102",
            "creditWeight": "[0.50]",
            "name": "Introduction to Managerial Accounting",
            "description": "This course is an introduction to the preparation and use of accounting information for management decision-making and reporting. Cost behaviour, cost accumulation systems, and short- and long-term decision models are discussed.",
            "prereqs": "AFM*101, AFM*191, or BUS*127W or BUS*227,",
            "coreqs": null,
            "restrictions": "AFM*182, AFM*123 or ARBUS*102, BUS*247W, MSCI*262"
        },
        {
            "cCode": "AFM*111",
            "creditWeight": "[0.50]",
            "name": "Professional Pathways and Problem-Solving",
            "description": "This course assists students in developing the knowledge, skills, and values needed to manage their learning, ethical behaviour, and career path as a professional with a responsibility to society. The course also provides an opportunity to develop problem-solving, information literacy, and communication skills.",
            "prereqs": "Level 1A Accounting and Financial Management, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*112",
            "creditWeight": "[0.50]",
            "name": "Analytic Methods for Business 1",
            "description": "This course introduces analytical methods commonly used in business for accounting and finance professionals. The course introduces students to the cross-industry standard process for data mining as an approach to business problem recognition and solving. Students also apply emerging technologies as a means to understand concepts such as variables, data types, subsets, formulas for creating derived variables, and simple models.",
            "prereqs": "Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*113",
            "creditWeight": "[0.50]",
            "name": "Analytic Methods for Business 2",
            "description": "This is the second in a two-course sequence that introduces analytical and statistical methods commonly used in business for accounting and finance professionals.",
            "prereqs": "AFM*112; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AMATH*350, MATH*128, STAT*211"
        },
        {
            "cCode": "AFM*121",
            "creditWeight": "[0.50]",
            "name": "Introduction to Global Financial Markets",
            "description": "This course is the first in a two-course sequence which offers an overview of global capital markets. The course describes the role of finance in the modern global economy, introduces the major classes of financial assets, and presents some basic foundational principles of financial decision-making.",
            "prereqs": "Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*123",
            "creditWeight": "[0.50]",
            "name": "Accounting Information for Managers",
            "description": "This course is designed for non-accountants who will use accounting information for planning, control, and decision-making.",
            "prereqs": "Arts & Business, Environment & Business, Sci & Business, Hon Rec & Leisure Studies, Hon Rec & Business, Hon Biotechnology or Economics, Human Resources Management, or Management Studies stdnts",
            "coreqs": null,
            "restrictions": "AFM*101,102,121, BUS*127W or BUS*227,247, MSCI*262"
        },
        {
            "cCode": "AFM*131",
            "creditWeight": "[0.50]",
            "name": "Introduction to Business in North America",
            "description": "The functional areas of business: finance, personnel administration, production, marketing, and accounting are examined within differing organizational structures. Coverage also includes study of the principles of effective management and the financial system as a source of corporate capital.",
            "prereqs": "Not open to Arts and Business students",
            "coreqs": null,
            "restrictions": "BUS*111W"
        },
        {
            "cCode": "AFM*132",
            "creditWeight": "[0.50]",
            "name": "Introduction to Business Stages",
            "description": "This course introduces key business concepts required to provide a solid foundation for accounting and finance majors. Topics include business life cycle stages, business models, and types of business decisions.",
            "prereqs": "Accounting and Financial Management, Computing and Financial Management, and Mathematics or Chartered Professional Accounting students",
            "coreqs": null,
            "restrictions": "AFM*131, BUS*111W"
        },
        {
            "cCode": "AFM*182",
            "creditWeight": "[0.50]",
            "name": "Foundations for Management Accounting",
            "description": "This course is a foundation to support managerial decision-making and to enable organizational performance management, including topics such as relevant costs and revenues, the role of budgets in performance management, sustainability reporting, and the relationship between measurement needs and business models.",
            "prereqs": "AFM*191; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*102, AFM*123 or ARBUS*102, BUS*247W, MSCI*262"
        },
        {
            "cCode": "AFM*191",
            "creditWeight": "[0.50]",
            "name": "Foundations for Financial Reporting",
            "description": "This course is a foundation for the practice of financial reporting, including topics such as the conceptual framework underlying accounting standards, the purpose of each financial statement, and the relationships among the financial statements.",
            "prereqs": "Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*101, AFM*123 or ARBUS*102, BUS*127W or BUS*227, MSCI*262"
        },
        {
            "cCode": "AFM*200",
            "creditWeight": "[0.00]",
            "name": "Continuation of Experiential Learning",
            "description": "The objective of this non-credit course is to continue to expose students to the expectations for experiential learning, and help them to continue to develop the skills and relationships needed to allocate their time and maintain balance across their academics, career, health and wellness, and community.",
            "prereqs": "AFM*100; second-year Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*202",
            "creditWeight": "[0.50]",
            "name": "Introduction to Public Practice",
            "description": "This course focuses on the knowledge and skills that enhance experiential learning during a first co-op work term. Topic areas include professional ethics, assurance, taxation, and leveraging technology for assurance and taxation competencies.",
            "prereqs": "AFM*101; Level 2A or 3A Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*201"
        },
        {
            "cCode": "AFM*203",
            "creditWeight": "[0.50]",
            "name": "Introduction to Decision Support",
            "description": "This course focuses on the knowledge and skills that enhance experiential learning during a first co-op work term while performing a decision support role within a public or private sector organization. Topic areas include professional ethics, performance analysis, corporate finance, and leveraging technology for performance analysis and corporate finance competencies.",
            "prereqs": "AFM*101; Level 2A or 3A Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*201, AFM*204,"
        },
        {
            "cCode": "AFM*204",
            "creditWeight": "[0.50]",
            "name": "Introduction to Applied Finance",
            "description": "This course focuses on the basic knowledge and skills required for employment in the finance area during the first co-op work term. The course covers topics such as an overview of the financial services industry, the role of treasury management within organizations, professional ethics, and problem-solving skills that are applicable to financial decisions.",
            "prereqs": "AFM*121; Level 2A or 3A; Accounting and Financial Management students",
            "coreqs": "AFM*273",
            "restrictions": "AFM*201, AFM*203,"
        },
        {
            "cCode": "AFM*205",
            "creditWeight": "[0.25]",
            "name": "Introduction to Financial Services",
            "description": "This course is one of a set of courses that focuses on the knowledge and skills that enhance experiential learning during a first or second co-op work term. The course covers topics such as an overview of the financial services industry, professional ethics, and problem-solving skills that are applicable to financial decisions.",
            "prereqs": "AFM*121 or AFM*272 or ACTSC*291; Level at least 2A Accounting and Financial Management, Biotechnology or CPA, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*204"
        },
        {
            "cCode": "AFM*206",
            "creditWeight": "[0.25]",
            "name": "Introduction to Tax",
            "description": "This course is one of a set of courses that focuses on the knowledge and skills that enhance experiential learning during a first co-op work term. Topic areas for this course include tax law, professional ethics, and leveraging technology for taxation competencies.",
            "prereqs": "AFM*191; Level 2A Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": "AFM*205, AFM*207, AFM*208,",
            "restrictions": "AFM*202"
        },
        {
            "cCode": "AFM*207",
            "creditWeight": "[0.25]",
            "name": "Introduction to Performance Analytics",
            "description": "This course is one of a set of courses that focuses on the knowledge and skills that enhance experiential learning during a first or second co-op work term. Topic areas for this course include performance measurement, professional ethics, and leveraging technology for performance analytics.",
            "prereqs": "One of AFM*113, ECON*221, STAT*211, STAT*231, STAT*241, Level at least 2A Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*208",
            "creditWeight": "[0.25]",
            "name": "Introduction to Assurance",
            "description": "This course is one of a set of courses that focuses on the knowledge and skills that enhance experiential learning during a first co-op work term. Topic areas for this course include assurance, professional ethics, and leveraging technology for assurance competencies.",
            "prereqs": "AFM*191; Level at least 2A Accounting and Financial Management, Biotechnology or CPA, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": "AFM*205, AFM*206, AFM*207,",
            "restrictions": "AFM*202"
        },
        {
            "cCode": "AFM*211",
            "creditWeight": "[0.50]",
            "name": "Connections to Business Context",
            "description": "This course focuses on developing the qualities and transferable skills necessary for integration, continuous learning, and professional development. The course integrates an understanding of business, basic functional competencies, leadership, collaboration, and communication skills to address a range of business decisions.",
            "prereqs": "AFM*101, AFM*131, SPCOM*111; Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*212",
            "creditWeight": "[0.50]",
            "name": "Financial Analysis and Planning",
            "description": "This course develops an in-depth understanding of financial statements as a system for analysis and planning as a foundation for upper-year accounting and finance courses.",
            "prereqs": "AFM*101 or AFM*191; Level 2A Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*211"
        },
        {
            "cCode": "AFM*231",
            "creditWeight": "[0.50]",
            "name": "Business Law",
            "description": "Particular attention is given to the law relating to contracts and business organizations. Other areas of study include sources of law, the judicial process, real and personal property, torts, agency, credit, and negotiable instruments.",
            "prereqs": "Not open to Accounting and Financial Management, Mathematics or Chartered Professional Accountancy or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*335, MTHEL*100 or COMM*231, BUS*231W, CIVE*491, GENE*411, ME*401"
        },
        {
            "cCode": "AFM*241",
            "creditWeight": "[0.50]",
            "name": "Impact of Technology on Business",
            "description": "This is an introductory course focusing both on foundational concepts and emerging trends in the impacts and usage of technology in accounting and finance. Potential topics include strategic investment, planning and spending for technology in businesses, and current disruptive technologies impacting global business processes.",
            "prereqs": "AFM*102 or AFM*182; Level at least 2B Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "CS*330, CS*480, or CS*490,"
        },
        {
            "cCode": "AFM*244",
            "creditWeight": "[0.50]",
            "name": "Analytic Methods for Business 3",
            "description": "This course introduces students to the foundations needed for data mining and more advanced upper-year business analytics electives. Topics include regression analysis, classification analysis (e.g., logistic regression, decision trees), and clustering analysis.",
            "prereqs": "One of AFM*113, ECON*221, STAT*211, STAT*231, STAT*241; Level at least 2B Accounting and Financial Management, Biotechnology or CPA, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*415 fall AFM*2017, AFM*2018, AFM*2019,"
        },
        {
            "cCode": "AFM*272",
            "creditWeight": "[0.50]",
            "name": "Global Capital Markets",
            "description": "This course offers an overview of global capital markets and asset valuation. Topics may include an overview of financial markets and instruments, time value of money, valuation of financial assets, and financial risk and portfolio management. Where suitable, topics are treated from a mathematical and quantitative perspective",
            "prereqs": "One of MATH*128,138,148; MATH*136 or MATH*146, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": "STAT*230 or STAT*240,",
            "restrictions": "AFM*273, ACTSC*372, ECON*371"
        },
        {
            "cCode": "AFM*273",
            "creditWeight": "[0.50]",
            "name": "Financial Instruments and Capital Markets",
            "description": "This course is the second in a two-course sequence which offers an overview of global capital markets. The course focuses on valuation of financial instruments and the theories of financial risk and diversification.",
            "prereqs": "AFM*121; AFM*113 or STAT*211; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*272 or ACTSC*291, ECON*371"
        },
        {
            "cCode": "AFM*274",
            "creditWeight": "[0.50]",
            "name": "Introduction to Corporate Finance",
            "description": "This course is the first in a two-course sequence that deals with corporate financial decision-making. Topics may include capital budgeting, cost of capital, security issuance, capital structure, payout policy and dividends, and short-term finance.",
            "prereqs": "AFM*273; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "ACTSC*372, AFM*275 or AFM*372 or ACTSC*391, ECON*371"
        },
        {
            "cCode": "AFM*275",
            "creditWeight": "[0.50]",
            "name": "Corporate Finance",
            "description": "This is the first in a two-course sequence that deals with corporate financial decision making. Topics may include capital budgeting, cost of capital, security issuance, capital structure, payout policy and dividends, and short-term finance. Where suitable, topics are treated from a mathematical and quantitative perspective.",
            "prereqs": "AFM*272 or ACTSC*291; Computing and Financial Management, Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*274, AFM*372, ACTSC*372, ECON*371"
        },
        {
            "cCode": "AFM*276",
            "creditWeight": "[0.50]",
            "name": "Financial Statement Analysis",
            "description": "This course introduces fundamental tools of analysis and valuation to prepare students to research, interpret, and analyze financial statements. The course examines financial reporting from the perspective of the financial statement user with an emphasis on interpretation of financial disclosures for cash flow analysis, risk assessment, forecasting, and decision making.",
            "prereqs": "AFM*191, AFM*272, or AFM*273, Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*492"
        },
        {
            "cCode": "AFM*280",
            "creditWeight": "[0.50]",
            "name": "Introduction to Organizational Behaviour",
            "description": "An introduction to the concepts concerning the behaviour of individuals and groups in organizations. Topics may include motivation, influence, communication, diversity, goal-setting and incentive compensation, culture and ethical systems, and decision-making.",
            "prereqs": "Accounting and Financial Management, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "MSCI*211, PSYCH*238 or PSYCH*338,"
        },
        {
            "cCode": "AFM*291",
            "creditWeight": "[0.50]",
            "name": "Intermediate Financial Accounting 1",
            "description": "A first course in intermediate accounting dealing with the theory and practice of financial statement preparation and reporting. The emphasis will be on asset valuation and the related impact on income measurement.",
            "prereqs": "AFM*101 or AFM*191; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*311",
            "creditWeight": "[0.50]",
            "name": "Connections to Ethical Context",
            "description": "This course focuses on developing the qualities and transferable skills necessary for integration, continuous learning, and professional development. The course is oriented around the ethical and moral issues faced by accounting and finance professionals.",
            "prereqs": "AFM*211",
            "coreqs": null,
            "restrictions": "AFM*431, PHIL*215 or PHIL*202,"
        },
        {
            "cCode": "AFM*321",
            "creditWeight": "[0.50]",
            "name": "Personal Financial Planning",
            "description": "This course covers financial planning for individual investors, with particular emphasis on taxation and other institutional aspects governing decisions such as retirement savings, education savings, and estate planning.",
            "prereqs": "AFM*274 (SFM students only)",
            "coreqs": "One of AFM*273 (Biotech or CPA students only), AFM*274, AFM*275 or AFM*372, or ACTSC*391, ACTSC*372, ECON*371",
            "restrictions": null
        },
        {
            "cCode": "AFM*322",
            "creditWeight": "[0.50]",
            "name": "Derivative Securities",
            "description": "Introduction to valuation and applications of financial derivatives such as options, futures, forwards, and swaps.",
            "prereqs": "AFM*272 or ACTSC*291 or AFM*273",
            "coreqs": null,
            "restrictions": "ACTSC*446, ECON*372, MATBUS*470, STAT*446"
        },
        {
            "cCode": "AFM*323",
            "creditWeight": "[0.50]",
            "name": "Quantitative Foundations for Finance",
            "description": "This course introduces analytical and statistical methods commonly used in finance, with applications to investment management and corporate finance.",
            "prereqs": "AFM*272 or ACTSI*291 or AFM*273",
            "coreqs": null,
            "restrictions": "ECON*321, STAT*373"
        },
        {
            "cCode": "AFM*324",
            "creditWeight": "[0.50]",
            "name": "Wealth Management",
            "description": "In this course students will learn core wealth management concepts that will give them a greater understanding of the wealth management industry. The content will focus on key areas of wealth management including portfolio management, asset allocation, risk management, performance evaluation, manager selection, tax efficient strategies as well as the use of new technologies in the wealth management industry.",
            "prereqs": "AFM*272 or ACTSC*291 or AFM*273; Accounting and Financial Management, Computing and Financial Management, Mathematics or CPA, and Biotechnology or CPA students",
            "coreqs": null,
            "restrictions": "AFM*416 (LEC*002) spring (LEC*2018, spring (LEC*2019,"
        },
        {
            "cCode": "AFM*326",
            "creditWeight": "[0.25]",
            "name": "Student Venture Fund - Analyst",
            "description": "This course provides students hands-on training in early-stage (angel and venture capital) investing with guidance from industry experts and supervision by faculty. This will generally be the first course that students take when they join the Student Venture Fund team. Analysts will attend investor meetings, assist in market research and specific deal due diligence, and prepare investment proposals.",
            "prereqs": "Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391",
            "restrictions": null
        },
        {
            "cCode": "AFM*328",
            "creditWeight": "[0.25]",
            "name": "Investment Management - Junior Analyst",
            "description": "This course provides students hands-on training in equity valuation and enables students to follow one industry sector. As a junior analyst, a student will understand why funds management is broken into different sectors, monitor existing equity holdings in a particular sector, make new equity selections in the sector, prepare equity research reports, and present trading recommendations to an investment team in a student-run investment portfolio.",
            "prereqs": "Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391",
            "restrictions": null
        },
        {
            "cCode": "AFM*329",
            "creditWeight": "[0.25]",
            "name": "Investment Management - Senior Analyst",
            "description": "This course provides students hands-on training in equity valuation and enables students to follow more than one industry sector. As a senior analyst, a student will monitor existing equity holdings in different sectors, make new equity selections in the sectors, prepare equity research reports, and present trading recommendations to an investment team in a student-run investment portfolio.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*333",
            "creditWeight": "[0.50]",
            "name": "International Business",
            "description": "This course examines the opportunities, risks, and challenges faced by businesses in international markets, as well as the preparation required to operate them.",
            "prereqs": "AFM*131 or ARBUS*101 or AFM*132; Level at least 3A",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*334",
            "creditWeight": "[0.50]",
            "name": "International Study Experience",
            "description": "This course focuses on offering students insight into the business operations of multinational firms and learning the perspectives of business executives across multiple industries in the private sector. A significant portion of this course involves a short-term international trip where students will directly learn about various companies and the international business environment by actively participating in discussions with company executives about their businesses and government officials about their respective industries. The course will also expose students to a specific topic in the region such as \"The Impact of Brexit on the Global Financial Community\" or \"The Role of Asia in the Global Financial Landscape\".",
            "prereqs": "Level at least 2B; Accounting and Fin Management, Computing and Fin Management, Math or Chartered Professional Accountancy, and Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*415 taken spring AFM*2017, spring AFM*2018, spring AFM*2019,"
        },
        {
            "cCode": "AFM*335",
            "creditWeight": "[0.50]",
            "name": "Business Law for Financial Managers",
            "description": "This course helps accounting and finance professionals become effective managers and better informed users of legal services. It contributes to developing a solid understanding of the legal and ethical environment in which businesses operate, expands on the legal concepts of business organization and contracts, introduces property and torts law, and integrates legal concepts through the preparation of a legal risk plan.",
            "prereqs": "Accounting and Financial Management or Biotechnology or Chartered Professional Accountancy",
            "coreqs": null,
            "restrictions": "AFM*231 or LS*283, MTHEL*100 or COMM*231, ENVS*201, BUS*231W, ME*401, GENE*411, CIVE*491"
        },
        {
            "cCode": "AFM*341",
            "creditWeight": "[0.50]",
            "name": "Accounting Information Systems",
            "description": "Examines the planning, requirements analysis, acquisition, and evaluation of information systems, with an emphasis on accounting information systems. Introduces information systems assurance concepts, and considers the role of information technology in the improvement of business performance.",
            "prereqs": "Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "CS*432"
        },
        {
            "cCode": "AFM*344",
            "creditWeight": "[0.50]",
            "name": "Analytic Methods in Business 4",
            "description": "This course introduces students to business analytics with a focus on problems that accounting and finance professionals face in the real world.",
            "prereqs": "One of ECON*221, STAT*211, STAT*231, STAT*241, AFM*241 or CS*330; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*345",
            "creditWeight": "[0.50]",
            "name": "Business Applications of Social Media Analytics",
            "description": "This course reinforces the data analytics process, introducing applications that leverage tools such as text analytics and sentiment analysis to analyze content from social networks to address business problems.",
            "prereqs": "AFM*244; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*346",
            "creditWeight": "[0.50]",
            "name": "Applications of Predictive Analytics in Accounting and Finance",
            "description": "This course introduces applications of classification/prediction methods and machine learning used in accounting and finance settings. Samples include bankruptcy prediction, fraud detection, and loan default.",
            "prereqs": "AFM*244; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*347",
            "creditWeight": "[0.50]",
            "name": "Cybersecurity",
            "description": "This course explores emerging issues related to cybersecurity management, governance, and control, which pose significant challenges to organizations in a networked environment. The course focuses on cybersecurity risks and investigates how companies can more effectively protect their digital assets from both internal and external threats.",
            "prereqs": "AFM*341; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*362",
            "creditWeight": "[0.50]",
            "name": "Corporate Taxation",
            "description": "This course examines the foundational concepts in the calculation of different sources of income and their taxation in Canadian corporations.",
            "prereqs": "AFM*321; Level at least 3A Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*363",
            "creditWeight": "[0.50]",
            "name": "Taxation 2 - Integration",
            "description": "This course builds on the foundational concepts established in AFM 362 by exploring the taxation of individuals and corporations in more depth.",
            "prereqs": "AFM*362; Accounting and Financial Management, Computing and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*373",
            "creditWeight": "[0.50]",
            "name": "Cases and Applications in Corporate Finance",
            "description": "This course builds on the theory of financial management using cases to illustrate a variety of corporate financial decisions.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*476 or ACTSC*471"
        },
        {
            "cCode": "AFM*377",
            "creditWeight": "[0.50]",
            "name": "Private Equity and Venture Capital",
            "description": "This course explores the fundamentals of the private equity industry. Topics include raising capital, structuring deals, creating a leveraged buyout model (LBO), and unlocking value through various strategies.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391",
            "coreqs": null,
            "restrictions": "AFM*416 taken spring AFM*2015, spring AFM*2016, or spring AFM*2017,"
        },
        {
            "cCode": "AFM*382",
            "creditWeight": "[0.50]",
            "name": "Cost Management Systems",
            "description": "Consideration of more complex topics in management planning and control. Emphasis is on traditional and contemporary cost accumulation systems and their application in modern day organizations. Cases, simulations, projects, and presentations are the key instructional methods used to understand and integrate the course material. At the end of the course, students will have a solid understanding of how the correct choice of a costing model adds value to the organization.",
            "prereqs": "AFM*102 or AFM*191; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*481"
        },
        {
            "cCode": "AFM*391",
            "creditWeight": "[0.50]",
            "name": "Intermediate Financial Accounting 2",
            "description": "This is an intermediate financial accounting course that deals with problems related to the measurement of liabilities, measurement of income, and the reporting and measuring of corporate equities.",
            "prereqs": "AFM*291; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*401",
            "creditWeight": "[0.50]",
            "name": "Accounting Theory",
            "description": "A review of accounting theory as a background for applying underlying concepts to current accounting problems. Emphasis is on current literature, with a major term paper required.",
            "prereqs": "AFM*391 or AFM*491; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*415",
            "creditWeight": "[0.50]",
            "name": "Special Topics",
            "description": "A course offered from time to time on a significant accounting and financial management issue.",
            "prereqs": null,
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*416",
            "creditWeight": "[0.50]",
            "name": "Special Topics in Finance",
            "description": "A course offered from time to time on a significant finance issue.",
            "prereqs": null,
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*417",
            "creditWeight": "[0.50]",
            "name": "Special Topics in Accounting",
            "description": "A course offered from time to time on a significant accounting issue.",
            "prereqs": null,
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*418",
            "creditWeight": "[0.25]",
            "name": "Special Topics in Finance or Accounting",
            "description": "A course offered from time to time in relation to a significant school-related accounting or finance project or activity.",
            "prereqs": "Accounting & Financial Management, Computing & Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*422",
            "creditWeight": "[0.50]",
            "name": "Management of Financial Institutions",
            "description": "This course focuses on the economics of financial institutions, particularly commercial banks. Issues related to commercial and investment banking and other financial intermediaries as well as financial markets and regulatory entities are examined.",
            "prereqs": "AFM*272 or ACTSC*291 or AFM*273",
            "coreqs": null,
            "restrictions": "ACTSC*445, MATBUS*472"
        },
        {
            "cCode": "AFM*423",
            "creditWeight": "[0.50]",
            "name": "Topics in Financial Econometrics",
            "description": "This course introduces the use of advanced econometric/statistical methods in studying financial market data, and in quantitatively assessing risks associated with financial investments. The methods presented in this course are tailored to address specific issues of interest in finance, such as the quantification of the risk-return tradeoff, the modelling of time-varying stock/bond market volatility and, possibly, also the statistical analysis of financial derivatives such as options.",
            "prereqs": "AFM*323 or STAT*373",
            "coreqs": null,
            "restrictions": "ECON*405 prior to fall ECON*2015,"
        },
        {
            "cCode": "AFM*424",
            "creditWeight": "[0.50]",
            "name": "Equity Investments",
            "description": "This course addresses principles of equity investments, including risk and return relationships, fundamental analysis of equities based on macroeconomic, industry and company-specific factors, financial statement analysis, and technical analysis. Portfolio allocation, performance measurement, and ethical and professional standards in the investment profession are also covered.",
            "prereqs": "One of AFM*272 or ACTSC*291, AFM*273, ACTSC*372, ECON*371",
            "coreqs": null,
            "restrictions": "BUS*473W"
        },
        {
            "cCode": "AFM*425",
            "creditWeight": "[0.50]",
            "name": "Fixed Income Securities",
            "description": "Introduction to various aspects of fixed income investments, including valuation, risk management, portfolio management, interest rate models, interest rate derivatives, and institutional features of bond markets.",
            "prereqs": "AFM*272 or ACTSC*291 or AFM*273",
            "coreqs": null,
            "restrictions": "MATBUS*471"
        },
        {
            "cCode": "AFM*426",
            "creditWeight": "[0.25]",
            "name": "Student Venture Fund-Associate",
            "description": "This course provides students hands-on training in early-stage (angel and venture capital) investing with guidance from industry experts and supervision by faculty. Associates will attend investment meetings, organize due diligence, supervise analysts, make investment recommendations, be involved in deal terms, and manage portfolio holdings.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*427",
            "creditWeight": "[0.50]",
            "name": "Intermediate Portfolio Management",
            "description": "This course focusses on the theory and practice of passive and active portfolio management focusing on both traditional and alternative investment assets. The course traces the process of development of the portfolio objective and investment thesis, asset selection, performance and risk measurement, and monitoring and stakeholder reporting. The course utilizes business analytics practices with a focus on the role of the financial analyst in an increasingly automated world.",
            "prereqs": "AFM*244; AFM*272 or AFM*273; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*428",
            "creditWeight": "[0.25]",
            "name": "Investment Management - Junior Portfolio Manager",
            "description": "This course provides students hands-on training in equity valuation and portfolio management. As a junior portfolio manager, a student will make allocations in two sectors, monitor the performance of the existing equity holdings in these two sectors, mentor two analysts, make equity trading decisions for these two sectors, and present portfolio performance reports to the investment team and the advisory board.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*429",
            "creditWeight": "[0.25]",
            "name": "Investment Management - Senior Portfolio Manager",
            "description": "This course provides students hands-on training in equity valuation and portfolio management. As a senior portfolio manager, a student will make allocations in different industry sectors, monitor the performance of the existing equity holdings in these sectors, mentor analysts, make equity trading decisions for these sectors, and present portfolio performance reports to the investment team and the advisory board.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*433",
            "creditWeight": "[0.50]",
            "name": "Business Strategy",
            "description": "This course focuses on strategic management of the total enterprise. Managers contribute to the organization through their analytical and leadership capabilities as well as their technical expertise. The course provides a framework for developing and implementing strategy that fits the firm's environment, managerial values, and organization.",
            "prereqs": "(AFM*274 or AFM*272 or ACTSC*291) and AFM*291; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "ENBUS*302"
        },
        {
            "cCode": "AFM*434",
            "creditWeight": "[0.50]",
            "name": "Corporate Governance and Risk Management",
            "description": "Corporate governance examines corporate organization, communication with stakeholders, and decision-making. Effective corporate governance promotes sustainable and socially equitable business practices and provides assurance to shareholders of investment integrity. This course examines the interface of corporate governance and risk management.",
            "prereqs": "AFM*433; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*442",
            "creditWeight": "[0.50]",
            "name": "E-business: Enterprise Systems",
            "description": "This course examines the role of integrated company-wide information systems in improving organizational performances. The course will focus on the selection, acquisition, and implementation of these systems, including consideration of business process alignment, change management, and development of business cases to support their acquisition. The role of enterprise systems in inter-organizational systems and e-commerce will also be considered. The course will make use of case studies as well as examine selected current enterprise software.",
            "prereqs": "One of AFM*241, CS*330 or CS*490, Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*443",
            "creditWeight": "[0.50]",
            "name": "E-business: Introduction to Electronic Commerce",
            "description": "This course examines key topics in electronic commerce such as the structure of the Internet, basic e-commerce processes and technologies (website, catalogs, customer attraction, ordering processes, payment processes, and fulfilment processes), control issues (availability, security, integrity, and maintainability), business-to-consumer models, business-to-business models, business-to-employee models, e-business strategies, integration of e-commerce activities into other business operations, performance measurement, legal and regulatory issues, and assurance services.",
            "prereqs": "One of AFM*241, CS*330 or CS*490, Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*444",
            "creditWeight": "[0.50]",
            "name": "Business Analytics Project Management",
            "description": "This course focuses on the development of project management and implementation capabilities required for the success of business analytics initiatives.",
            "prereqs": "AFM*244; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*445",
            "creditWeight": "[0.50]",
            "name": "Information Technology Assurance and Audit Analytics",
            "description": "This course builds on the development of knowledge about, as well as skills in using, data analytics by allowing students, as users and interpreters of model output, to learn through a range of cases that focus on controls for information systems and audit applications.",
            "prereqs": "AFM*244, AFM*351 or AFM*451, Accounting and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*446",
            "creditWeight": "[0.50]",
            "name": "Performance Management and Tax Analytics",
            "description": "This course builds on the development of knowledge about, as well as skills in using, data analytics by allowing students, as users and interpreters of model output, to learn through a range of data analytics cases that focus on performance management and tax applications.",
            "prereqs": "AFM*244, AFM*362, AFM*382 or AFM*481, Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*447",
            "creditWeight": "[0.50]",
            "name": "Governance and Ethical Issues with Data and Emerging Technologies",
            "description": "This course examines a host of governance and ethical issues associated with the rapid growth of data analytics and emerging technologies and the related role of accounting and finance professionals.",
            "prereqs": "AFM*244; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*448",
            "creditWeight": "[0.50]",
            "name": "Data Analytics and Emerging Technologies Consulting Group",
            "description": "This course provides students hands-on training in monitoring emerging technologies and in contributing through big data competitions. If selected, students monitor emerging technologies and generate reports regarding their state of adoption. Students also participate in business analytics competitions which contributes to student learning and knowledge creation.",
            "prereqs": "AFM*345, AFM*346; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*451",
            "creditWeight": "[0.50]",
            "name": "Audit Strategy",
            "description": "An examination of elements of audit strategy and their interrelationships, including financial assertions, types and sources of audit assurance, and evidence-gathering procedures within a framework of professional judgment.",
            "prereqs": "AFM*291, AFM*341; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*351"
        },
        {
            "cCode": "AFM*462",
            "creditWeight": "[0.50]",
            "name": "Specialized Topics in Taxation",
            "description": "This course introduces specialized topics in taxation with emphasis on basic planning for private companies.",
            "prereqs": "AFM*362; Level 4B Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*463",
            "creditWeight": "[0.50]",
            "name": "Introduction to U.S. Taxation",
            "description": "U.S. tax is an important topic for accounting and finance professionals since the U.S. is Canada's largest trading partner and many individuals move from one country to the other. This course covers the fundamentals of U.S. corporate and personal tax. U.S. tax issues relevant to both Canadian and American individuals and corporations will be emphasized. Important articles in the Canada/U.S. Tax Convention will also be covered in the course.",
            "prereqs": "AFM*362, AFM*363,",
            "coreqs": null,
            "restrictions": "AFM*415 taken fall AFM*2016,"
        },
        {
            "cCode": "AFM*470",
            "creditWeight": "[0.50]",
            "name": "Financial Management of High Growth Companies",
            "description": "Designed for students seeking careers within high growth companies or financing/advising them, this course develops the ability to relate to entrepreneurial ventures and provide \"value added\" financial management. This is an experiential based course focused on small group financial consulting projects with high growth companies in Kitchener-Waterloo or Greater Toronto Area. Classes may encompass lecture, case analysis, guest speakers, and discussion of groups' projects. The course includes a substantial class participation requirement leading to the in-depth financial consulting project.",
            "prereqs": "AFM*373 or AFM*476; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": "AFM*417 taken fall AFM*2018, fall AFM*2019,"
        },
        {
            "cCode": "AFM*473",
            "creditWeight": "[0.50]",
            "name": "Advanced Topics in Corporate Finance",
            "description": "Topics include items such as corporate governance, mergers and acquisitions, spin-offs and divestitures, security issuance, and capital budgeting.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391; Accounting and Financial Management, Biotechnology or CPA, Computing and Financial Management, Mathematics or CPA, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*476",
            "creditWeight": "[0.50]",
            "name": "Corporate Financial Decision Making",
            "description": "This is the second course of a two-course sequence that deals with corporate financial decision making. The course builds on the theory of financial management using cases to illustrate a variety of corporate financial decisions. Where suitable, topics are treated from a mathematical and quantitative perspective.",
            "prereqs": "AFM*275 or AFM*372 or ACTSC*391 or ACTSC*372; Comp & Financial Management, Actuarial Science, Math or CPA, Math or Financial Analysis & Risk Mgmt Chartered Financial Analyst, or Mathematical Finance",
            "coreqs": null,
            "restrictions": "AFM*373"
        },
        {
            "cCode": "AFM*477",
            "creditWeight": "[0.50]",
            "name": "Mergers and Acquisitions",
            "description": "This course develops understanding of the strategic acquisition and divestiture process, particularly as it relates to corporations in Canada. The course focuses on integrating key analytical skills in the interpretation of financial statements and valuation methodologies in the context of mergers and acquisitions of existing firms, as well as spin-offs, restructurings, buyouts and divestitures of existing assets. The course concentrates on value creation and institutional, strategic, ethical, governance, and control issues.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*478",
            "creditWeight": "[0.50]",
            "name": "International Financial Management",
            "description": "This course examines various aspects of corporate decision-making in a global firm, such as cross-border investments and financing, international risk management, multinational working capital management, and the impact of the international regulatory environment.",
            "prereqs": "AFM*274 or AFM*275 or AFM*372 or ACTSC*391",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*479",
            "creditWeight": "[0.50]",
            "name": "Cases and Applications in Finance 2",
            "description": "This course builds on the theory of finance and uses cases and applications to further address finance issues and competences, including risk management, equities, derivatives, and other investments.",
            "prereqs": "Level at least 4A Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*480",
            "creditWeight": "[0.50]",
            "name": "Introduction to Organizational Behaviour",
            "description": "This course focuses on understanding and applying concepts concerning the behaviour of individuals and groups in organizations. Topics may include performance management, organizational commitment, collaboration, motivation, communication, decision making, culture, and ethical systems.",
            "prereqs": "Level at least 4A Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": "AFM*280, MSCI*211, PSYCH*238 or PSYCH*338,"
        },
        {
            "cCode": "AFM*482",
            "creditWeight": "[0.50]",
            "name": "Performance Measurement and Organization Control",
            "description": "This course will trace the evolution of the role of performance measurement systems in supporting areas of organization control. Topics will include the role of both financial and non-financial performance measures in: the DuPont method of control, the Harvard model of control, internal control, contemporary approaches to governance, and strategic management systems. After completing this course students will be able to evaluate the nature and suitability of a proposed performance measurement system given its design and purpose.",
            "prereqs": "AFM*433, AFM*382 or AFM*481, Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*483",
            "creditWeight": "[0.50]",
            "name": "Applications of Analytics to Business",
            "description": "This course explores the metrics, quantitative analyses, and technologies used across a range of applications where an investigation of past business performance provides insights that drive business decisions.",
            "prereqs": "One of ECON*221, STAT*211, STAT*230, STAT*231, STAT*240, STAT*241, Accounting and Financial Management, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Biotechnology or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*484",
            "creditWeight": "[0.50]",
            "name": "Advanced Management Control Systems",
            "description": "This course provides an in-depth examination of operations management and related issues in performance evaluation and control for various business sectors (e.g., manufacturing, service, and IT intensive).",
            "prereqs": "AFM*382 or AFM*481, or AFM*482; Accounting and Financial Management, Computing and Financial Management, Mathematics or Chartered Accountancy, Biotechnology or Chartered Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*485",
            "creditWeight": "[0.50]",
            "name": "Approaches to Measuring Value",
            "description": "This course addresses the significant shift in the composition of enterprise value from tangible assets tracked by traditional accounting practices to a range of intangible assets. The course provides a survey of approaches used to identify, measure, report, and create value that consider these intangibles.",
            "prereqs": "AFM*291, AFM*382, or AFM*481, Accounting and Financial Management, Computing and Financial Management, or Mathematics or Chartered Professional Accountancy students",
            "coreqs": null,
            "restrictions": null
        },
        {
            "cCode": "AFM*491",
            "creditWeight": "[0.50]",
            "name": "Advanced Financial Accounting",
            "description": "An advanced accounting course considering specific problems of accounting for the corporate entity, such as business combinations, intercorporate investments, consolidated financial statements, accounting for foreign operations and foreign currency transactions, and segment reporting.",
            "prereqs": "AFM*391; Accounting and Financial Management, Biotechnology or Chartered Professional Accountancy, Computing and Financial Management, Mathematics or Chartered Professional Accountancy, or Sustainability and Financial Management students",
            "coreqs": null,
            "restrictions": null
        }
    ]
}

let res = {}
test('waterloo Courses', async ({ page }) => {
    await page.goto('https://ucalendar.uwaterloo.ca/2223/COURSE/course-AFM.html');
    res = await getCoursesData(page);
    assert.equal(JSON.stringify(res), JSON.stringify(expected), 'Failed: getCoursesData');
});
