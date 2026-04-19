# Jobs R Us — API Documentation

Base URL: `http://localhost:3000/api`

---

## Students

### GET /api/students

Search students by major, course, and/or graduation year. Returns all students if no query params provided.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| major | string | Filter by exact major |
| course | string | Filter by course keyword (partial match) |
| gradYr | number | Filter by graduation year |

**Example:** `GET /api/students?major=Computer Science&gradYr=2026`

**Response:** `200`
```json
[
  {
    "Stu_id": 1,
    "Stu_Name": "John Doe",
    "Stu_Age": 22,
    "Stu_JobExp": "Internship at Google",
    "Stu_GPA": 3.5,
    "Stu_Major": "Computer Science",
    "Stu_Courses": "Data Structures, Algorithms",
    "Stu_GradYr": 2026,
    "Stu_PhnNumb": "555-1234",
    "Stu_Email": "john@example.com",
    "Uni_id": 1
  }
]
```

---

### POST /api/students

Create a new student.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Stu_Name | string | yes | Full name |
| Stu_Age | number | no | Age (16–100) |
| Stu_JobExp | string | no | Job experience description |
| Stu_GPA | number | no | GPA (0.0–4.0) |
| Stu_Major | string | no | Major |
| Stu_Courses | string | no | Comma-separated courses |
| Stu_GradYr | number | no | Graduation year |
| Stu_PhnNumb | string | no | Phone number |
| Stu_Email | string | yes | Email (must be unique) |
| Uni_id | number | yes | University ID (must exist) |

**Response:** `201`
```json
{ "Stu_id": 1 }
```

---

### GET /api/students/[id]

Get a single student by ID.

**Response:** `200` — student object | `404` — not found

---

### DELETE /api/students/[id]

Delete a student profile.

**Response:** `200` — `{ "success": true }` | `404` — not found

---

### GET /api/students/filter-gpa

Filter students by GPA range.

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| min | number | 0 | Minimum GPA |
| max | number | 4.0 | Maximum GPA |

**Example:** `GET /api/students/filter-gpa?min=3.0&max=4.0`

**Response:** `200` — array of student objects

---

## Companies

### GET /api/companies

Get all companies, optionally filtered by requirement keyword.

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| keyword | string | Search within Cmp_Requirement (partial match) |

**Example:** `GET /api/companies?keyword=JavaScript`

**Response:** `200`
```json
[
  {
    "Cmp_id": 1,
    "Cmp_Name": "TechCorp",
    "Cmp_Requirement": "JavaScript, React experience",
    "Cmp_PhnNumb": "555-5678",
    "Cmp_Email": "hr@techcorp.com"
  }
]
```

---

### POST /api/companies

Create a new company.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Cmp_Name | string | yes | Company name |
| Cmp_Requirement | string | no | Requirements description |
| Cmp_PhnNumb | string | no | Phone number |
| Cmp_Email | string | no | Email (must be unique) |

**Response:** `201`
```json
{ "Cmp_id": 1 }
```

---

### GET /api/companies/[id]

Get a single company by ID.

**Response:** `200` — company object | `404` — not found

---

### DELETE /api/companies/[id]

Delete a company.

**Response:** `200` — `{ "success": true }` | `404` — not found

---

## Universities

### POST /api/universities

Create a new university.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Uni_Name | string | yes | University name |
| Uni_PhnNumb | string | no | Phone number |
| Uni_Email | string | no | Email (must be unique) |

**Response:** `201`
```json
{ "Uni_id": 1 }
```

---

### GET /api/universities/[id]

Get a single university by ID.

**Response:** `200` — university object | `404` — not found

---

## Applications

### POST /api/applications

Create an application (student applies to company).

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Stu_id | number | yes | Student ID |
| Cmp_id | number | yes | Company ID |

**Response:** `201`
```json
{ "App_id": 1 }
```

A student can only apply to a company once (unique constraint).

---

### PATCH /api/applications/[id]

Update an application's status.

**Request Body:**

| Field | Type | Required | Allowed Values |
|-------|------|----------|----------------|
| App_Status | string | yes | `applied`, `reviewing`, `accepted`, `rejected` |

**Response:** `200` — `{ "success": true }` | `404` — not found

---

### DELETE /api/applications/[id]

Delete an application.

**Response:** `200` — `{ "success": true }` | `404` — not found

---

## Analytics

### GET /api/analytics/students-with-university

Returns all students joined with their university information.

**Response:** `200`
```json
[
  {
    "Stu_id": 1,
    "Stu_Name": "John Doe",
    "Stu_GPA": 3.5,
    "Stu_Major": "Computer Science",
    "Uni_Name": "State University",
    "Uni_Email": "info@stateuni.edu",
    "Uni_PhnNumb": "555-0000"
  }
]
```

---

### GET /api/analytics/student-applications/[id]

Returns all applications for a given student, joined with company details.

**Response:** `200`
```json
[
  {
    "App_id": 1,
    "App_Date": "2026-04-14 12:00:00",
    "App_Status": "applied",
    "Cmp_id": 1,
    "Cmp_Name": "TechCorp",
    "Cmp_Email": "hr@techcorp.com",
    "Cmp_Requirement": "JavaScript, React experience"
  }
]
```

---

### GET /api/analytics/avg-gpa-by-university

Average GPA grouped by university.

**Response:** `200`
```json
[
  { "Uni_Name": "State University", "Avg_GPA": 3.45, "Student_Count": 12 }
]
```

---

### GET /api/analytics/avg-gpa-by-major

Average GPA grouped by major.

**Response:** `200`
```json
[
  { "Stu_Major": "Computer Science", "Avg_GPA": 3.62, "Student_Count": 8 }
]
```

---

### GET /api/analytics/applications-per-company

Application count per company.

**Response:** `200`
```json
[
  { "Cmp_Name": "TechCorp", "Application_Count": 15 }
]
```

---

### GET /api/analytics/recommendations/[id]

Returns recommended companies for a student based on their major matching company requirements.

**Response:** `200` — array of company objects whose `Cmp_Requirement` matches the student's `Stu_Major`

---

## Error Responses

All endpoints return errors in this format:

```json
{ "error": "Description of the error" }
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request (missing or invalid data) |
| 404 | Resource not found |
| 500 | Internal server error |
