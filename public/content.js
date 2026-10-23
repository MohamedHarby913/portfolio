/*
  Portfolio content. Edit this file to change projects, experience,
  credentials, skills and awards. Every project gets its own page at
  project.html?p=<slug>.

  To link a project to GitHub, add it to "repos": [{ "url": "https://github.com/...", "label": "" }].
  Projects without "repos" show no source-code section.
  To add a video, paste any YouTube link into "video".
  Certificate images go in assets/certificates/ using the file names below.
*/
window.PORTFOLIO_DATA = {
  "featured": {
    "slug": "cybee-plus",
    "title": "Cybee+",
    "tagline": "Threat intelligence you can trust, grown from a single AI pipeline into a guarded multi-agent system.",
    "labels": [
      "MULTI-AGENT AI",
      "THREAT INTELLIGENCE",
      "FULL-STACK"
    ],
    "tags": [
      "ai",
      "sec",
      "dev"
    ],
    "art": 2,
    "unit": "Computing Project (Capstone) · Curtin University Dubai",
    "year": "2025–2026",
    "role": "Team lead · Project manager · Merge master · Full-stack engineer",
    "team": "Six-person team, client: CISO of DEF-X Cyber Intelligence",
    "summary": "An AI-powered platform that turns real-world threats into actionable intelligence and practical learning. Built for the CISO of DEF-X Cyber Intelligence.",
    "metrics": [
      {
        "value": "314",
        "label": "Backend tests"
      },
      {
        "value": "59",
        "label": "Frontend tests"
      },
      {
        "value": "858",
        "label": "ATT&CK techniques indexed"
      },
      {
        "value": "235",
        "label": "Live IOCs imported"
      }
    ],
    "pipeline": [
      {
        "step": "01 / INGEST",
        "title": "Make the data usable.",
        "text": "Threats arrive by CSV upload, manual entry or the live abuse.ch ThreatFox feed. Records are normalised, and IPs, domains, URLs and hashes are extracted as indicators of compromise."
      },
      {
        "step": "02 / ANALYSE + VALIDATE",
        "title": "Ground every answer.",
        "text": "The AI layer, first a single LLM and later a team of agents, classifies severity, summarises the threat and maps it to MITRE ATT&CK. Every technique ID it proposes is checked against a locally ingested catalogue of 858 techniques, so invented IDs never reach an analyst."
      },
      {
        "step": "03 / HUMAN REVIEW",
        "title": "Keep analysts in control.",
        "text": "Results below 0.70 confidence are flagged for review. Analysts can override any verdict with a justification, and the raw model output and model name are kept for the audit trail."
      }
    ],
    "sections": [
      {
        "heading": "The brief",
        "body": [
          "Our client, the CISO of DEF-X Cyber Intelligence, wanted one place where analysts could take in raw threat data, understand it quickly, and turn it into training for the next generation of analysts.",
          "Over two terms our six-person team took Cybee+ from requirements, SRS and architecture in the first term to a tested, deployed platform across four Agile sprints in the second."
        ]
      },
      {
        "heading": "What the platform does",
        "points": [
          "Analyst dashboard with severity breakdowns, trends and a live-feed view",
          "IOC Explorer and Threat Search with severity and source filters",
          "Correlation graph that links threats through shared indicators",
          "Geolocated attack map fed by live ThreatFox imports and IP geolocation",
          "Threat analysis view showing the AI summary, ATT&CK techniques and confidence",
          "PDF and CSV reports for sharing findings",
          "Learning Lab: training modules, quizzes and completion certificates built from real threats",
          "Admin user management, role-based access and a public marketing site"
        ]
      },
      {
        "heading": "From one pipeline to a team of agents",
        "body": [
          "Our first version was a single LLM pipeline on Gemini: one call classified, summarised and mapped each threat. It worked, but one prompt was doing too many jobs. To optimise and streamline the analysis, we rebuilt it as a multi-agent system, splitting the work into autonomous agents for IOC extraction, MITRE ATT&CK mapping and output validation, each with its own guardrails and guidelines."
        ],
        "points": [
          "Version 1: a single Gemini pipeline behind the provider-agnostic interface",
          "Version 2: a multi-agent system built with Google ADK",
          "Version 3: a second multi-agent implementation built with CrewAI",
          "Across every version, the same validation layer and human review check the output, so agents never get the final word"
        ]
      },
      {
        "heading": "Built for change",
        "body": [
          "Every model provider implements one interface, so the rest of the system never depends on a specific model. That is what let us move from a single Gemini call to multi-agent versions without rewriting the pipeline, the validation layer or the UI. A deterministic mock behind the same interface keeps the tests fast and repeatable.",
          "Validation never calls a model, so re-checking older analyses after the ATT&CK catalogue updates is free and repeatable."
        ]
      },
      {
        "heading": "Engineering",
        "points": [
          "FastAPI backend organised into routers, services and schemas, with SQLAlchemy 2 and Alembic migrations on PostgreSQL 16",
          "React 19 and TypeScript frontend on Vite, styled with Tailwind and charted with Recharts",
          "Docker Compose for the database, backend and frontend, so a new machine is running in a few commands",
          "Bitbucket Pipelines CI lints with ruff and runs pytest against a real Postgres service on every pull request",
          "Deployed to Render with Supabase as the managed database"
        ]
      },
      {
        "heading": "My role",
        "points": [
          "Led the team through four sprints and served as the main point of contact with the client CISO",
          "Ran the Gitflow release process as merge master: feature branches, two-reviewer pull requests and a green CI gate before every merge",
          "Built the live threat feed, correlation graph, geolocated attack map and admin tooling",
          "Led the final redesign of the frontend, component by component, without breaking the test suite"
        ]
      },
      {
        "heading": "Beyond the code",
        "body": [
          "Cybee+ is also the implementation behind the team's IEEE-format research paper, \"Real World Threat Based Learning for Cybersecurity Education\". We presented the platform to the client and our supervisor, and launched it publicly on LinkedIn."
        ]
      }
    ],
    "stack": [
      "Python 3.12",
      "FastAPI",
      "SQLAlchemy 2",
      "Alembic",
      "PostgreSQL 16",
      "Google ADK",
      "CrewAI",
      "Gemini",
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind",
      "Recharts",
      "Docker",
      "Bitbucket Pipelines",
      "Render",
      "Supabase"
    ],
    "video": ""
  },
  "projects": [
    {
      "slug": "campus-whatsapp-assistant",
      "title": "Campus WhatsApp Assistant",
      "tags": [
        "ai",
        "dev"
      ],
      "labels": [
        "GENERATIVE AI",
        "CHATBOT",
        "1ST PLACE"
      ],
      "art": 10,
      "unit": "Engagex Hackathon on Generative AI in CX · e& enterprise × Infobip · Oct 2025",
      "role": "Team member in an eight-person team",
      "tagline": "Everything a student needs on campus, inside the chat app they already use. First place at the Engagex Hackathon.",
      "summary": "A generative-AI WhatsApp chatbot that brings everything a Curtin University Dubai student needs into one chat: events, sports, news, room bookings, food nearby and lecturer details. Built for the Infobip platform, it won first place at the e& enterprise × Infobip Engagex Hackathon.",
      "metrics": [
        {
          "value": "1st",
          "label": "Place, Engagex Hackathon 2025"
        },
        {
          "value": "8",
          "label": "Team members"
        },
        {
          "value": "5+",
          "label": "Student services in one chat"
        },
        {
          "value": "0",
          "label": "Apps to install"
        }
      ],
      "sections": [
        {
          "heading": "The challenge",
          "body": [
            "e& enterprise and Infobip challenged teams to design and pitch an innovative WhatsApp chatbot for Curtin University Dubai using the Infobip platform, as part of a hackathon on generative AI in customer experience."
          ]
        },
        {
          "heading": "The problem we picked",
          "body": [
            "Student life information is scattered. Finding out when a match starts, where an event is, whether a room is free, what food is nearby or how to reach a lecturer means checking emails, notice boards, websites and group chats. We wanted one place to ask."
          ]
        },
        {
          "heading": "What the assistant does",
          "points": [
            "Campus events and sports events, with times and locations",
            "University news and announcements",
            "Booking university rooms",
            "Food options around the campus",
            "Lecturer information students need, in a single question",
            "Everyday questions answered in natural language with generative AI"
          ]
        },
        {
          "heading": "Why WhatsApp",
          "body": [
            "Students already live in WhatsApp. Putting the assistant there means nothing to download, no new account and no learning curve, and the university reaches students where they already are."
          ]
        },
        {
          "heading": "Security from the start",
          "body": [
            "An assistant that answers questions about staff and makes bookings handles real personal data, so we approached the solution from a security perspective from the first draft. We considered what information it should expose and how bookings and personal data would stay protected, rather than bolting security on after the pitch."
          ]
        },
        {
          "heading": "The result",
          "body": [
            "Our team took first place and the award for pioneering innovation in AI solutions."
          ]
        }
      ],
      "figures": [
        {
          "src": "assets/images/infobip-team.jpg",
          "caption": "The winning team with the trophy at Curtin University Dubai"
        },
        {
          "src": "assets/images/infobip-trophy.jpg",
          "caption": "1st Place, Engagex Hackathon on Generative AI in CX 2025, awarded for pioneering innovation in AI solutions"
        }
      ],
      "stack": [
        "Infobip",
        "WhatsApp",
        "Generative AI",
        "Conversational design",
        "Security by design"
      ]
    },
    {
      "slug": "security-breach-investigation",
      "title": "Security Breach Investigation",
      "tags": [
        "sec"
      ],
      "labels": [
        "BLUE TEAM",
        "DFIR",
        "BTL1"
      ],
      "art": 2,
      "unit": "Blue Team Level 1 (BTL1) certification exam",
      "role": "Solo investigator",
      "summary": "The 24-hour practical exam for my Blue Team Level 1 certification. I traced a simulated multi-stage breach to its phishing entry point, correlated logs, network captures and disk artefacts, rebuilt the full attack timeline and wrote it up as a structured incident report.",
      "sections": [
        {
          "heading": "The scenario",
          "body": [
            "Blue Team Level 1 from Security Blue Team is awarded only after a hands-on exam. A simulated organisation had been breached, and I had 24 hours to work out what happened, how the attacker got in, and what they did once inside.",
            "The exam covers the five domains of the certification: phishing analysis, threat intelligence, digital forensics, SIEM and incident response. The evidence had to be read together: emails, logs, packet captures and disk images."
          ]
        },
        {
          "heading": "How I worked it",
          "points": [
            "Analysed the phishing emails to identify the initial access vector and the attacker's entry point",
            "Searched and pivoted through event logs in Splunk to follow the attacker's activity",
            "Inspected network captures in Wireshark to separate malicious traffic from normal noise",
            "Examined disk artefacts with Autopsy and Windows event logs with DeepBlueCLI",
            "Correlated every source into one timeline of the attack, from first click to final action"
          ]
        },
        {
          "heading": "The deliverable",
          "body": [
            "A structured incident report with the attack timeline, the evidence behind each finding and the indicators an organisation would use to detect and block the same attack again."
          ]
        },
        {
          "heading": "What it shows",
          "body": [
            "Working under time pressure, keeping evidence organised across tools, and writing findings that a non-specialist can act on, which is the day-to-day of a SOC analyst."
          ]
        },
        {
          "heading": "The result",
          "body": [
            "I passed and earned the BTL1 certification in January 2025. You can view and verify the certificate in the Credentials section."
          ]
        }
      ],
      "stack": [
        "Splunk",
        "Wireshark",
        "Autopsy",
        "DeepBlueCLI",
        "Incident reporting"
      ],
      "tagline": "The 24-hour practical incident response exam behind my Blue Team Level 1 certification.",
      "figures": [
        {
          "src": "assets/certificates/btl1.jpg",
          "caption": "Blue Team Level 1 certificate, awarded after the 24-hour practical exam"
        }
      ]
    },
    {
      "slug": "tank-pressure-prediction",
      "title": "Tank Pressure Prediction",
      "tags": [
        "ai"
      ],
      "labels": [
        "MACHINE LEARNING"
      ],
      "art": 1,
      "unit": "COMP3010 Machine Learning · Kaggle competition",
      "role": "Solo",
      "summary": "End-to-end regression on messy sensor data to predict peak pressure. I cleaned it (IQR capping, dedupe, physical-constraint checks), engineered five features such as tank volume and liquid-to-vapour ratio, then compared seven model families.",
      "sections": [
        {
          "heading": "The problem",
          "body": [
            "Predict the peak pressure, in bar, inside a storage tank from sensor and geometry readings. The data was realistic and messy: missing values, duplicates, outliers, inconsistent category labels and readings that broke physical rules."
          ]
        },
        {
          "heading": "Cleaning the data",
          "points": [
            "Filled missing numeric values with the mean and categorical values with the mode, and dropped rows where neither made sense, such as a missing target",
            "Removed duplicate rows",
            "Detected skewed, outlier-heavy features with the IQR and capped them",
            "Enforced physical constraints: no negative dimensions or pressures, sensor positions within range, and vapour height below tank height",
            "Unified the many spellings of the status field"
          ]
        },
        {
          "heading": "Feature engineering",
          "body": [
            "I created five features to help the model see the physics: obstacle volume, tank volume, the temperature difference between vapour and liquid, the liquid-to-vapour ratio and a vapour temperature category. I then removed highly correlated and low-importance features, using random forest importances, to reduce overfitting."
          ]
        },
        {
          "heading": "Choosing the model",
          "points": [
            "Started with linear regression as a baseline, then SGD, a decision tree and an MLP neural network",
            "Moved to random forest, XGBoost and LightGBM as overfitting became the main problem",
            "Tuned hyperparameters with grid search and 5-fold cross-validation",
            "Tried an averaging ensemble, which was worse, then a stacking ensemble with a meta-model over XGBoost and LightGBM, which gave the best result"
          ]
        },
        {
          "heading": "What I learned",
          "body": [
            "Most of the gain came from understanding the data, not from the model. The process of testing simple baselines, diagnosing overfitting and only then adding complexity is the same one I use when evaluating LLM outputs."
          ]
        }
      ],
      "stack": [
        "Python",
        "pandas",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
        "Jupyter"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Tank-Pressure-Prediction",
          "label": ""
        }
      ]
    },
    {
      "slug": "zaytoun-delivery",
      "title": "Zaytoun Delivery Platform",
      "tags": [
        "dev"
      ],
      "labels": [
        "FULL-STACK",
        "REAL-TIME"
      ],
      "art": 3,
      "unit": "Independent project",
      "role": "Solo developer",
      "summary": "A restaurant delivery platform with separate order-taker, driver and manager interfaces, live driver GPS, Google Maps routing and push notifications for every order update. I also prototyped a React Native mobile port.",
      "sections": [
        {
          "heading": "The idea",
          "body": [
            "A restaurant needed one system to take orders, dispatch drivers and keep the manager informed, without phone calls and paper slips. Each person in that chain needs a different screen, and all of them need to see changes the moment they happen."
          ]
        },
        {
          "heading": "Three roles, one live system",
          "points": [
            "Order takers create and track orders",
            "Drivers receive assignments, share their live GPS location and get Google Maps routing to the customer",
            "Managers see every order and driver in real time"
          ]
        },
        {
          "heading": "How it works",
          "points": [
            "Firestore real-time listeners push order changes to every open screen instantly",
            "Firebase Authentication separates the three roles",
            "Firebase Cloud Messaging sends push notifications as an order moves from placed to picked up to delivered",
            "Google Maps API handles routing and the live driver map"
          ]
        },
        {
          "heading": "Going mobile",
          "body": [
            "I prototyped a cross-platform mobile version with React Native, Expo and Supabase, so drivers could use a native app instead of the browser."
          ]
        }
      ],
      "stack": [
        "React 18",
        "Firebase",
        "Firestore",
        "Firebase Auth",
        "FCM",
        "Google Maps API",
        "React Native",
        "Expo",
        "Supabase"
      ]
    },
    {
      "slug": "fittrack-aws",
      "title": "FitTrack on AWS",
      "tags": [
        "sys"
      ],
      "labels": [
        "CLOUD",
        "AWS"
      ],
      "art": 4,
      "unit": "Cloud Computing · with Cepha Philip Benoy",
      "role": "Pair project",
      "summary": "Designed and deployed the infrastructure for a fitness-tracking dashboard: a VPC across two availability zones with public and private subnets, EC2 web servers behind a load balancer with auto scaling, a Lambda email-verification function, RDS, EBS snapshots and CloudWatch alarms, at an estimated $40 a month.",
      "sections": [
        {
          "heading": "The business",
          "body": [
            "FitTrack gives clients and trainers a dashboard for training, calories, hydration, nutrition and progress toward a goal. We chose the cloud so the service could grow without upfront hardware, stay available under heavy traffic and keep data backed up and encrypted."
          ]
        },
        {
          "heading": "The architecture",
          "points": [
            "A VPC across two availability zones, each with a public and a private subnet, plus an internet gateway, a NAT gateway and route tables",
            "Security groups allowing only HTTP and SSH where they were needed",
            "EC2 web servers with termination protection and CloudWatch monitoring",
            "An AWS Lambda function that verifies email addresses, exposed to the web",
            "An extra EBS volume with its own file system, backed up with snapshots",
            "Amazon RDS in its own subnet group and security group, connected to the web tier",
            "An AMI of the web server feeding an Auto Scaling group behind an Elastic Load Balancer"
          ]
        },
        {
          "heading": "Cost",
          "body": [
            "We estimated the running cost at about $40 a month, which made the case for pay-as-you-go over owning servers."
          ]
        }
      ],
      "stack": [
        "Amazon VPC",
        "EC2",
        "Elastic Load Balancing",
        "Auto Scaling",
        "Lambda",
        "RDS",
        "EBS",
        "CloudWatch"
      ],
      "video": "https://youtu.be/Plr71il-3lw"
    },
    {
      "slug": "hybrid-encryption",
      "title": "Hybrid Encryption & Secure Document Processor",
      "tags": [
        "sec"
      ],
      "labels": [
        "CRYPTOGRAPHY"
      ],
      "art": 5,
      "unit": "ISEC2000 Fundamental Concepts of Cryptography",
      "role": "Solo",
      "summary": "A hybrid scheme where AES encrypts the data and RSA protects the key, with RSA key generation (prime testing, modular inverse) written from first principles. A second tool encrypts, decrypts and digitally signs documents and verifies the signatures.",
      "sections": [
        {
          "heading": "Part 1: hybrid encryption from first principles",
          "body": [
            "Symmetric encryption is fast but needs a shared key; public-key encryption solves key sharing but is slow. Hybrid encryption uses both. I encrypted the message with AES in CBC mode, then protected the AES key with RSA that I implemented myself."
          ]
        },
        {
          "heading": "Implementing RSA",
          "points": [
            "Generated primes with my own primality test",
            "Computed the modulus, the totient and the private exponent with the extended Euclidean algorithm",
            "Discovered that RSA can only encrypt values smaller than n, so I split the 16-byte AES key into chunks small enough to encrypt",
            "Researched why real systems avoid this with padding schemes such as OAEP, and used that in Part 2"
          ]
        },
        {
          "heading": "Part 2: a secure document processor",
          "body": [
            "A command-line tool for sending classified reports between internal teams. It generates 2048-bit RSA key pairs, encrypts and decrypts documents with RSA-OAEP and SHA-256, signs documents with RSA-PSS, and verifies signatures so a recipient knows the report is authentic and unchanged."
          ]
        },
        {
          "heading": "What it shows",
          "body": [
            "I understand what cryptographic libraries do under the hood, and why the defaults they ship with matter."
          ]
        }
      ],
      "stack": [
        "Python",
        "AES-CBC",
        "RSA",
        "OAEP",
        "PSS signatures",
        "SHA-256",
        "PyCryptodome",
        "cryptography"
      ]
    },
    {
      "slug": "vulnerable-vs-hardened",
      "title": "Vulnerable vs Hardened Programs",
      "tags": [
        "sec"
      ],
      "labels": [
        "SECURE CODING"
      ],
      "art": 7,
      "unit": "Secure software development",
      "role": "Solo",
      "summary": "Paired vulnerable and fixed versions of a C program and a Python service, each with a test harness that shows the flaw on the vulnerable build and confirms the fix holds. Covers a memory over-read in C and unsafe object deserialisation in Python.",
      "sections": [
        {
          "heading": "The approach",
          "body": [
            "For each flaw I wrote two versions of the same program: one with the vulnerability and one with it fixed. A test script runs against both, proving the problem is real on the first and gone on the second."
          ]
        },
        {
          "heading": "Case 1: buffer over-read in C",
          "body": [
            "A login prompt reads a username into a fixed-size buffer, using an unsafe input function, and then prints more bytes than the buffer holds. That leaks whatever sits next to it in memory, including a stored secret."
          ],
          "points": [
            "Fix: bounded input with fgets",
            "Fix: only ever print as many bytes as the buffer actually holds"
          ]
        },
        {
          "heading": "Case 2: insecure deserialisation in Python",
          "body": [
            "A banking service saved account objects with pickle. Loading a pickle file can run arbitrary code, so anyone who can replace the file can take over the program."
          ],
          "points": [
            "Fix: store data as plain JSON instead of serialised objects",
            "Fix: add a SHA-256 checksum and refuse to load any file that fails the integrity check"
          ]
        },
        {
          "heading": "What it shows",
          "body": [
            "I can spot common vulnerability classes, explain the risk and ship a fix with evidence that it works, which matters both in code review and in a pentest report."
          ]
        }
      ],
      "stack": [
        "C",
        "Python",
        "Secure code review",
        "Make"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Vulnerable-vs-Hardened-Programs",
          "label": ""
        }
      ]
    },
    {
      "slug": "classical-ciphers",
      "title": "Breaking Classical Ciphers",
      "tags": [
        "sec"
      ],
      "labels": [
        "CRYPTANALYSIS"
      ],
      "art": 5,
      "unit": "ISEC2000 Fundamental Concepts of Cryptography",
      "role": "Solo",
      "summary": "Recovered plaintext from an unknown ciphertext using letter-frequency analysis, broke an affine cipher, and implemented DES, each documented with flowcharts and frequency plots.",
      "sections": [
        {
          "heading": "Frequency analysis",
          "body": [
            "Given an unknown substitution ciphertext, I counted letter frequencies, plotted them against English, built a substitution table and refined it from partial to full decryption."
          ]
        },
        {
          "heading": "The affine cipher",
          "body": [
            "I broke an affine cipher by brute force: every valid multiplier coprime with 26, combined with every shift, using a modular inverse to decrypt each candidate."
          ]
        },
        {
          "heading": "DES",
          "body": [
            "I implemented the Data Encryption Standard: the initial and final permutations, the expansion, S-box and permutation steps, and the 16-round key schedule, and built a command-line tool that encrypts a text file and decrypts it back."
          ]
        },
        {
          "heading": "Documentation",
          "body": [
            "Every algorithm is documented with a flowchart, and the frequency analysis includes the distribution chart I used to guide the attack."
          ]
        }
      ],
      "stack": [
        "Python",
        "Matplotlib",
        "Frequency analysis",
        "Affine cipher",
        "DES"
      ]
    },
    {
      "slug": "scheduling-simulator",
      "title": "Multiprocessor Scheduling Simulator",
      "tags": [
        "sys"
      ],
      "labels": [
        "SYSTEMS",
        "CONCURRENCY"
      ],
      "art": 7,
      "unit": "COMP2006 Operating Systems",
      "role": "Solo",
      "summary": "A multithreaded C simulation where a producer thread feeds a bounded ready queue and several CPU threads consume tasks, synchronised with mutexes and condition variables. It logs turnaround and waiting times and runs with no memory leaks.",
      "sections": [
        {
          "heading": "What it simulates",
          "body": [
            "A multiprocessor system scheduling 50 tasks with different burst times. You choose the number of CPU threads and the capacity of the ready queue when you run it, for example ./smss TaskFile.txt 3 5."
          ]
        },
        {
          "heading": "Solving the critical section",
          "points": [
            "One task thread produces work into a shared, bounded ready queue",
            "Several CPU threads consume tasks and simulate their execution",
            "A mutex protects the queue, its size and the shared log file",
            "Condition variables make CPU threads wait when the queue is empty and the task thread wait when it is full",
            "Together these give mutual exclusion, progress and bounded waiting"
          ]
        },
        {
          "heading": "Verification",
          "points": [
            "Every task's service time matches its burst time",
            "All 50 tasks complete, with average waiting and turnaround times written to the log",
            "The parent waits for every thread, then destroys the mutexes and condition variables and frees all memory, with no leaks reported by Valgrind"
          ]
        }
      ],
      "stack": [
        "C",
        "POSIX threads",
        "Mutexes",
        "Condition variables",
        "Valgrind",
        "Make"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Process-Synchronization",
          "label": ""
        }
      ]
    },
    {
      "slug": "process-controller",
      "title": "Process Controller over Pipes",
      "tags": [
        "sys"
      ],
      "labels": [
        "SYSTEMS",
        "IPC"
      ],
      "art": 7,
      "unit": "Unix Systems Programming",
      "role": "Solo",
      "summary": "A controller program that forks worker processes and talks to them over dynamically allocated pipes, streaming input line by line and collecting results, with error handling on every system call.",
      "sections": [
        {
          "heading": "How it works",
          "body": [
            "The controller reads an input file, counts its lines and allocates one output pipe per line. For each line it forks a child process, redirects the child's input and output to pipes with dup2, and replaces the child with a separate reverser program using execl. The controller then collects each result in order."
          ]
        },
        {
          "heading": "Robustness",
          "points": [
            "Every system call, from pipe and fork to memory allocation, is checked, with clear error messages",
            "Unused pipe ends are closed in both parent and child so nothing blocks",
            "Memory is sized dynamically from the input"
          ]
        },
        {
          "heading": "Why it matters",
          "body": [
            "Pipes, fork and exec are how Unix tools work. Understanding them helps me read process trees, spot suspicious parent-child relationships and reason about how attackers chain commands."
          ]
        }
      ],
      "stack": [
        "C",
        "fork",
        "execl",
        "pipe",
        "dup2",
        "Make"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Reverser-Program",
          "label": ""
        }
      ]
    },
    {
      "slug": "shop-navigation",
      "title": "Shop Finding & Navigation System",
      "tags": [
        "dev"
      ],
      "labels": [
        "ALGORITHMS"
      ],
      "art": 6,
      "unit": "Data Structures & Algorithms · with Diluksh Fernando",
      "role": "Pair project",
      "summary": "A mall navigation system on custom-built data structures: a graph for routes between shops, a hash table for lookups, and hand-written linked list, stack and queue implementations, with an interactive menu and a test suite.",
      "sections": [
        {
          "heading": "The system",
          "body": [
            "Shoppers can find shops by number or category, and get a route from one shop to another. Staff can add, update and remove shops and the walkways between them."
          ]
        },
        {
          "heading": "Everything built from scratch",
          "points": [
            "A graph of shops and walkways, built on a hand-written linked list",
            "A hash table with automatic resizing as the load factor grows or shrinks",
            "A stack and a queue used by the search algorithms"
          ]
        },
        {
          "heading": "Finding the route",
          "body": [
            "The system runs both depth-first and breadth-first search, counts the edges in each path and reports the shorter one, or both when they are the same length."
          ]
        },
        {
          "heading": "Testing",
          "body": [
            "A dedicated test class exercises every function of the navigation system, alongside the interactive menu."
          ]
        }
      ],
      "stack": [
        "Java",
        "Graphs",
        "Hash tables",
        "BFS",
        "DFS",
        "Linked lists"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/ShopFindingAndNavigationSystem",
          "label": ""
        }
      ]
    },
    {
      "slug": "who-covid-data",
      "title": "WHO COVID-19 Data Tool",
      "tags": [
        "dev"
      ],
      "labels": [
        "JAVA",
        "OOP"
      ],
      "art": 7,
      "unit": "COMP1007 Programming Design & Implementation",
      "role": "Solo",
      "tagline": "Two Java programs that collect COVID-19 figures by country, then sort and analyse them.",
      "summary": "A pair of Java programs for World Health Organisation data. The first collects COVID-19 cases and deaths by country with strict input validation and saves them to CSV. The second reads the file back and ranks countries by cases, deaths and death rate, overall or by continent.",
      "sections": [
        {
          "heading": "The brief",
          "body": [
            "Build a tool the World Health Organisation could use to record COVID-19 figures for each country and then make sense of them. I designed it as two programs sharing one Nation class, and wrote pseudocode for every method before writing any Java."
          ]
        },
        {
          "heading": "Program 1: data entry",
          "body": [
            "The user chooses how many countries to enter, then types each country's name, code, cases, deaths and continent. The data is printed back for review and saved to a CSV file."
          ],
          "points": [
            "Country name and code can't be empty",
            "Case and death counts can't be negative",
            "Deaths can never exceed cases",
            "The continent must be one of EU, AF, AS, NA, SA, AU or OT",
            "Bad input such as letters in a number field is caught, so the program fails gracefully instead of crashing"
          ]
        },
        {
          "heading": "Program 2: analysis",
          "body": [
            "The second program asks for the CSV file and checks it exists, counts its lines to size the array, and loads every row into Nation objects. The user then picks an overall analysis or a single continent."
          ],
          "points": [
            "Ranks countries by total cases, total deaths and percentage of deaths",
            "Reports the country with the highest death rate",
            "Sorts with insertion sort on a copy, so the original data is never changed",
            "Lets the user run another analysis or exit"
          ]
        },
        {
          "heading": "Object-oriented design",
          "body": [
            "The Nation class holds one country's data, with default, copy and parameterised constructors, getters and setters, a toString, an equals method and a percentageOfDeaths calculation. Both programs reuse it, so the data rules live in one place."
          ]
        }
      ],
      "localVideo": "assets/videos/who-covid-demo.mp4",
      "videoPoster": "assets/videos/who-covid-demo.jpg",
      "stack": [
        "Java",
        "OOP",
        "CSV file I/O",
        "Insertion sort",
        "Exception handling",
        "Pseudocode"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/WHO-COVID-19-Data-Tool",
          "label": ""
        }
      ]
    },
    {
      "slug": "oscars-database",
      "title": "Oscars Relational Database",
      "tags": [
        "dev",
        "ai"
      ],
      "labels": [
        "DATABASE"
      ],
      "art": 8,
      "unit": "Database Systems",
      "role": "Solo",
      "summary": "Designed a normalised database for the 2015–2018 Academy Awards, from ER diagram and relational schema to real data, ten analytical queries, stored procedures, triggers and views, plus a Python client.",
      "sections": [
        {
          "heading": "Design",
          "body": [
            "Six entities, actors, directors, movies, Oscars ceremonies, award categories and hosts, plus relationship tables for acting, directing, hosting and nominations. I documented the ER diagram, relational schema, data dictionary and the cardinality of every relationship, including three-way many-to-many nominations."
          ]
        },
        {
          "heading": "Data and queries",
          "body": [
            "I populated it with real data for the 2015–2018 ceremonies across six major categories, then wrote analytical queries using joins, aggregation and subqueries."
          ]
        },
        {
          "heading": "Advanced SQL",
          "points": [
            "Three stored procedures, including nominee lookups by year and nomination counts per actor",
            "Two views for winners and ceremony hosts",
            "Three triggers that validate the won flag on every nomination"
          ]
        },
        {
          "heading": "Python client",
          "body": [
            "A Python program connects to MySQL and runs the queries, showing how the database would sit behind an application."
          ]
        }
      ],
      "stack": [
        "MySQL",
        "SQL",
        "Stored procedures",
        "Triggers",
        "Python",
        "mysql-connector"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/OscarsDatabase",
          "label": ""
        }
      ]
    },
    {
      "slug": "geometry-engine",
      "title": "Tested Geometry Engine",
      "tags": [
        "dev"
      ],
      "labels": [
        "TESTING"
      ],
      "art": 7,
      "unit": "Introduction to Software Engineering",
      "role": "Solo",
      "summary": "A modular Java program designed for high cohesion and low coupling, reviewed against a code checklist, refactored, then covered with black-box and white-box test suites under Git version control.",
      "sections": [
        {
          "heading": "The program",
          "body": [
            "Enter a number of sides and it names the regular polygon and can show its picture. Enter a side length and it calculates the perimeter and area, then compares the area with a child's hand."
          ]
        },
        {
          "heading": "Designed for quality",
          "points": [
            "Every module does one job, with no global variables and at most two parameters",
            "Modules are reused rather than duplicated",
            "A 14-point review checklist covered data types, string comparison, rounding, coupling and cohesion"
          ]
        },
        {
          "heading": "Testing",
          "points": [
            "Black-box test designs using equivalence partitioning and boundary values",
            "White-box test designs covering the paths through each module",
            "48 assertions in the test code",
            "All work tracked in Git, with the log included in the report"
          ]
        }
      ],
      "stack": [
        "Java",
        "Black-box testing",
        "White-box testing",
        "Git"
      ]
    },
    {
      "slug": "terminal-traffic-game",
      "title": "Terminal Traffic Game",
      "tags": [
        "sys"
      ],
      "labels": [
        "GAME",
        "C89"
      ],
      "art": 7,
      "unit": "Unix & C Programming",
      "role": "Solo",
      "summary": "A turn-based terminal game in strict C89 that loads maps from files, renders in the terminal and supports undo through a linked list of game states, with manual memory management throughout.",
      "sections": [
        {
          "heading": "The game",
          "body": [
            "Guide the player across a map to the goal with W, A, S and D while a car drives along the road. Get hit and you lose; reach the goal and you win."
          ]
        },
        {
          "heading": "How it is built",
          "points": [
            "Maps load from text files, so new levels need no code changes",
            "The map is a dynamically allocated 2D array, freed cleanly on exit",
            "Each move pushes the game state onto a linked list, so pressing U undoes moves one at a time",
            "Raw terminal input so the game reacts to single key presses",
            "Compiled with -Wall -pedantic -ansi to keep it strict C89"
          ]
        }
      ],
      "stack": [
        "C89",
        "Linked lists",
        "Dynamic memory",
        "File I/O",
        "Terminal control",
        "Make"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Crossy-Road-Game-",
          "label": ""
        }
      ]
    },
    {
      "slug": "network-build",
      "title": "Network Build",
      "tags": [
        "sys"
      ],
      "labels": [
        "NETWORKING",
        "GROUP PROJECT"
      ],
      "art": 9,
      "unit": "CMPE2000 · Group project with Hammad, Bhone and Keshanka",
      "role": "RIP routing, third-floor design, IP addressing and subnetting",
      "tagline": "From three basic topologies to a secure, segmented network for a three-floor university building.",
      "summary": "A three-part networking project in Cisco Packet Tracer: star, bus and ring topologies, dynamic routing with RIP across three routers, and a full LAN for a three-floor university building with 10 VLANs, VLSM subnetting, DHCP, ACLs and a firewall-protected server room.",
      "sections": [
        {
          "heading": "Project 1: three topologies",
          "body": [
            "We started by building star, bus and ring topologies with four PCs each, addressing every host and proving connectivity with ping. A simple start, but it set up the habits the later builds relied on: plan the addressing first, then verify everything."
          ]
        },
        {
          "heading": "Project 2: dynamic routing with RIP",
          "body": [
            "I configured RIP across three Cisco 1941 routers connecting three LANs of two PCs each. The routers needed HWIC-2T modules to add serial ports, and the serial links needed clock rates set on the DCE side."
          ],
          "points": [
            "Addressed six PCs across 192.168.10.0, 192.168.20.0 and 192.168.30.0",
            "Linked the routers over serial networks 10.0.0.0 and 11.0.0.0",
            "Advertised each router's LAN and serial networks so the routers learned every route automatically"
          ]
        },
        {
          "heading": "Project 3: a network for a university building",
          "body": [
            "The main task was to design and configure the LAN for a three-floor university building with four departments: Finance, Admissions, Business and Computer Science. It had to support up to 180 users at once, with strong security, high reliability and room to grow."
          ],
          "points": [
            "Hierarchical design: a Cisco 2911 main router and core switch in the control room, a 3650 multilayer switch on each floor and an access switch in every room",
            "Wireless access points in classrooms and offices, plus separate guest access points in Finance and Admissions so visitors stay off the staff network",
            "A firewall in front of the server room so only IT technicians can reach the server",
            "The internet simulated by an ISP router with a loopback address, since Packet Tracer can't connect out",
            "Router hardening before anything else: login banner, console and privileged-mode passwords, and password encryption"
          ]
        },
        {
          "heading": "Segmentation and addressing",
          "body": [
            "Every room got its own VLAN, and each subnet was sized to its real head count using VLSM, all carved from a single 192.168.1.0/24 block."
          ],
          "points": [
            "/26 for the two classrooms, with 52 and 54 hosts",
            "/28 for offices, the library and the IT room, with 10 to 13 hosts each",
            "/29 for the guest network and /30 for the server",
            "DHCP pools on the router for every VLAN, and inter-VLAN routing so departments can talk only through the router",
            "Access control lists to restrict traffic between segments"
          ]
        },
        {
          "heading": "What we'd improve",
          "body": [
            "The design has one router, which makes it a single point of failure, so the next step is a backup router. We'd also finish the PAT configuration so every device reaches the simulated internet, and add a backup or cloud-hosted server alongside the on-site one."
          ]
        }
      ],
      "figures": [
        {
          "src": "assets/images/network-build-full.png",
          "caption": "Project 3: the full three-floor design, with VLANs per room and a multilayer switch per floor"
        },
        {
          "src": "assets/images/network-build-rip.png",
          "caption": "Project 2: RIP across three routers over serial links"
        }
      ],
      "stack": [
        "Cisco Packet Tracer",
        "Cisco IOS",
        "RIP",
        "VLANs",
        "VLSM subnetting",
        "DHCP",
        "Inter-VLAN routing",
        "ACLs",
        "Wireless access points"
      ],
      "repos": [
        {
          "url": "https://github.com/MohamedHarby913/Network-Build",
          "label": ""
        }
      ]
    },
    {
      "slug": "redbluesim",
      "title": "RedBlueSim",
      "tags": [
        "sec",
        "dev"
      ],
      "labels": [
        "PURPLE TEAM",
        "PLATFORM"
      ],
      "art": 2,
      "unit": "Curtinnovation Awards 2026",
      "role": "Concept and pitch",
      "summary": "A purple-team training platform concept where attack and defence teams train on the same scenarios. Submitted to the Curtinnovation Awards 2026.",
      "sections": [
        {
          "heading": "The problem",
          "body": [
            "Red teams and blue teams usually train apart. Attackers learn techniques without seeing how they are detected, and defenders practise on alerts without seeing the attack that caused them."
          ]
        },
        {
          "heading": "The idea",
          "body": [
            "RedBlueSim puts both sides in the same scenario. The red side runs a technique, the blue side detects and responds to it, and both review the same timeline afterwards, so each learns from the other."
          ]
        },
        {
          "heading": "Where it came from",
          "body": [
            "It grew from my own path: red team training in my internship and OSCP preparation, and defensive work on Cybee+ and incident investigations."
          ]
        }
      ],
      "stack": [
        "Concept",
        "Purple teaming",
        "MITRE ATT&CK"
      ]
    },
    {
      "slug": "ctf-riddle-game",
      "title": "CTF Riddle Stall Game",
      "tags": [
        "sec",
        "dev"
      ],
      "labels": [
        "CTF",
        "WEB"
      ],
      "art": 5,
      "unit": "Curtin Cyber club event",
      "role": "Solo developer",
      "summary": "A five-stage browser puzzle game for a Curtin Cyber recruitment stall, with salted SHA-256 answer checking so the answers can't be read from the page source.",
      "sections": [
        {
          "heading": "The goal",
          "body": [
            "Draw students to the Curtin Cyber stall with a quick, fun challenge that also introduces how CTFs work."
          ]
        },
        {
          "heading": "The game",
          "body": [
            "Five riddle stages, with clues built around places students know on and around campus. Each correct answer unlocks the next stage."
          ]
        },
        {
          "heading": "Keeping it fair",
          "body": [
            "Because the game runs in the browser, curious players could open the page source looking for answers. So the answers are never stored. The page keeps only salted SHA-256 hashes and compares the hash of each guess, a small lesson in why passwords are stored the same way."
          ]
        }
      ],
      "stack": [
        "HTML",
        "CSS",
        "JavaScript",
        "Web Crypto API",
        "SHA-256"
      ]
    }
  ],
  "experience": [
    {
      "date": "Oct–Nov 2026",
      "title": "Young Professionals Program",
      "organization": "SAP · UAE",
      "description": "Selected for SAP's graduate training program covering end-to-end business processes and generative AI on SAP. Earned SAP Certified Implementation Consultant: End-to-End Business Processes.",
      "details": [],
      "open": true
    },
    {
      "date": "2025–2026",
      "title": "Capstone Team Lead",
      "organization": "Cybee+ · client: DEF-X Cyber Intelligence",
      "description": "Ran sprints, code review and releases for a six-person team, and was the main point of contact with the client CISO.",
      "details": []
    },
    {
      "date": "Oct 2025",
      "title": "1st Place, Engagex Hackathon",
      "organization": "e& enterprise × Infobip · Generative AI in CX",
      "description": "Part of the eight-person team that won first place for a generative-AI WhatsApp chatbot designed for Curtin University Dubai on the Infobip platform.",
      "details": []
    },
    {
      "date": "Jul–Sep 2025",
      "title": "Red Team Intern",
      "organization": "Cyber 50 Defense Academy",
      "description": "",
      "details": [
        "Identified and documented 35+ vulnerabilities across 10+ simulated corporate networks and web applications",
        "Completed all intensive labs on Active Directory, web applications and the OWASP Top 10",
        "Delivered three executive-ready engagement reports that ranked findings by exploitability, impact and risk"
      ],
      "open": true
    },
    {
      "date": "2023–2026",
      "title": "CTF Team Captain & Club Lead",
      "organization": "Curtin Cyber, Curtin University Dubai",
      "description": "Captain of the university CTF team. Ran events and training for students and led the proposal for the club's wiki and blog.",
      "details": []
    },
    {
      "date": "2019–2023",
      "title": "Independent Algorithmic Trader",
      "organization": "Stocks & forex · self-directed",
      "description": "Designed, coded and ran automated trading strategies in MQL4.",
      "details": []
    }
  ],
  "degree": {
    "title": "BSc Cybersecurity",
    "issuer": "Curtin University Dubai",
    "honours": "With Distinction",
    "conferred": "04 September 2026",
    "file": "assets/certificates/bsc-cybersecurity.jpg"
  },
  "certifications": [
    {
      "title": "Blue Team Level 1 (BTL1)",
      "issuer": "Security Blue Team · Jan 2025",
      "file": "assets/certificates/btl1.jpg",
      "verify": "https://securityblue.team/verify"
    },
    {
      "title": "CompTIA Security+ ce",
      "issuer": "CompTIA · Aug 2024",
      "file": "assets/certificates/security-plus.jpg",
      "verify": "https://verify.comptia.org"
    },
    {
      "title": "CyberOps Associate",
      "issuer": "Cisco Networking Academy · Dec 2025",
      "file": "assets/certificates/cisco-cyberops.jpg"
    },
    {
      "title": "Network Security",
      "issuer": "Cisco Networking Academy · Oct 2025",
      "file": "assets/certificates/cisco-network-security.jpg"
    },
    {
      "title": "Google Cybersecurity Certificate",
      "issuer": "Google · Jun 2024",
      "file": "assets/certificates/google-cybersecurity.jpg",
      "verify": "https://coursera.org/verify/professional-cert/T7JYX35Z2PH3"
    },
    {
      "title": "OSCP",
      "issuer": "In progress · OffSec",
      "inProgress": true
    },
    {
      "title": "CCNA: Introduction to Networks",
      "issuer": "Cisco Networking Academy · Aug 2025",
      "file": "assets/certificates/ccna.jpg"
    },
    {
      "title": "Azure Fundamentals (AZ-900)",
      "issuer": "Microsoft · Aug 2024",
      "file": "assets/certificates/az-900.jpg",
      "verify": "https://learn.microsoft.com/en-us/users/mohamedharby-0930/credentials/certification/azure-fundamentals?tab=credentials-tab"
    },
    {
      "title": "Cloud Foundations",
      "issuer": "AWS Academy · Jul 2025",
      "file": "assets/certificates/aws-cloud-foundations.jpg",
      "verify": "https://www.credly.com/go/DmCG7ij8"
    },
    {
      "title": "System Administration I & II",
      "issuer": "Red Hat · RH124 & RH134 · 2026",
      "file": [
        "assets/certificates/red-hat-sysadmin-1.jpg",
        "assets/certificates/red-hat-sysadmin-2.jpg"
      ],
      "verify": "https://www.credly.com/badges/c83d807b-e5d2-4c02-8cda-0e58c61f5c14",
      "verify2": "https://www.credly.com/badges/984b7a77-4ba7-4b15-9bb9-ca99c4b04cb9"
    },
    {
      "title": "Implementation Consultant: End-to-End Business Processes",
      "issuer": "SAP · Oct 2026",
      "file": "assets/certificates/sap-e2e.jpg",
      "verify": "https://www.credly.com/badges/608a21e0-e548-4094-a854-f8373b1ce274"
    }
  ],
  "skills": [
    {
      "title": "AI engineering",
      "items": [
        "Multi-agent systems",
        "CrewAI",
        "LangChain",
        "Google ADK",
        "Gemini API",
        "LLM guardrails",
        "Output validation",
        "Human-in-the-loop",
        "Prompt & context engineering",
        "scikit-learn",
        "XGBoost",
        "LightGBM"
      ]
    },
    {
      "title": "Defensive security",
      "items": [
        "Splunk",
        "Log analysis",
        "Alert triage",
        "Threat hunting",
        "Incident response",
        "MITRE ATT&CK",
        "IOC extraction",
        "Wireshark",
        "Autopsy",
        "DeepBlueCLI",
        "Cryptography"
      ]
    },
    {
      "title": "Offensive security",
      "items": [
        "Network pentesting",
        "Web app testing",
        "OWASP Top 10",
        "Active Directory",
        "Privilege escalation",
        "Nmap",
        "Burp Suite",
        "Metasploit",
        "Kali Linux",
        "Report writing"
      ]
    },
    {
      "title": "Software & cloud",
      "items": [
        "Python",
        "TypeScript",
        "React",
        "FastAPI",
        "PostgreSQL",
        "MySQL",
        "Firebase",
        "Java",
        "C",
        "MQL4",
        "Docker",
        "CI/CD",
        "AWS",
        "Azure",
        "Git",
        "Agile / Scrum"
      ]
    }
  ],
  "highlight": {
    "label": "1ST PLACE · OCT 2025",
    "title": "Engagex Hackathon on Generative AI in CX",
    "organizers": "e& enterprise × Infobip, with Curtin University Dubai",
    "description": "The challenge was to design and pitch a WhatsApp chatbot for Curtin University Dubai on the Infobip platform. Our eight-person team's generative-AI solution took first place and the award for pioneering innovation in AI solutions.",
    "images": [
      {
        "src": "assets/images/infobip-team.jpg",
        "alt": "The winning team holding the trophy at Curtin University Dubai"
      },
      {
        "src": "assets/images/infobip-trophy.jpg",
        "alt": "Glass trophy reading Engagex Hackathon on Generative AI in CX 2025, 1st Place, awarded for pioneering innovation in AI solutions"
      }
    ],
    "project": "campus-whatsapp-assistant"
  },
  "awards": [
    {
      "label": "CTF · CAPTAIN",
      "title": "Curtin Cyber CTF Team",
      "description": "Led the university team in capture-the-flag competitions."
    },
    {
      "label": "INNOVATION · 2026",
      "title": "Curtinnovation Awards",
      "description": "Entered two projects: RedBlueSim, a purple-team training platform, and FixHub, a repair marketplace."
    },
    {
      "label": "CAPSTONE · 2026",
      "title": "Cybee+ launch",
      "description": "Presented the platform to the client CISO and supervisor, and launched it publicly on LinkedIn."
    }
  ]
};
