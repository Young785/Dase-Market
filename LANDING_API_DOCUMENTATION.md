# Landing Page API Documentation

Base URL: `http://your-domain.com/api/v1/landing`

## Table of Contents
- [Contact Form](#contact-form)
- [Newsletter Subscription](#newsletter-subscription)
- [Adverts/Services](#advertsservices)
- [Producers](#producers)
- [Statistics](#statistics)

---

## Contact Form

### Submit Contact Form
Submit a contact form message from the landing page.

**Endpoint:** `POST /api/v1/landing/contact`

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about services",
  "message": "I would like to know more about your production services..."
}
```

**Validation Rules:**
- `name`: required, string, max 255 characters
- `email`: required, valid email, max 255 characters
- `subject`: required, string, max 255 characters
- `message`: required, string, max 5000 characters

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon."
}
```

**Error Response (422):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": ["The email field must be a valid email address."]
  }
}
```

---

## Newsletter Subscription

### Subscribe to Newsletter
Subscribe an email address to the newsletter.

**Endpoint:** `POST /api/v1/landing/newsletter`

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Validation Rules:**
- `email`: required, valid email, max 255 characters, unique

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter!"
}
```

**Error Response (422):**
```json
{
  "success": false,
  "message": "The email has already been taken."
}
```

---

## Adverts/Services

### Get All Adverts
Fetch paginated list of approved adverts/services.

**Endpoint:** `GET /api/v1/landing/adverts`

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "Beats", "Mixing", "Recording")
- `search` (optional): Search in title and description
- `per_page` (optional): Number of results per page (default: 12)
- `page` (optional): Page number

**Example Request:**
```
GET /api/v1/landing/adverts?category=Beats&search=hip hop&per_page=12&page=1
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "Professional Beat Production",
        "description": "High-quality beats for hip-hop...",
        "category": "Beats",
        "price": 199,
        "views": 1245,
        "status": "approved",
        "expired_at": "2024-12-31T23:59:59.000000Z",
        "user": {
          "id": 10,
          "name": "Mike Beats",
          "username": "mikebeats"
        },
        "created_at": "2024-10-01T12:00:00.000000Z"
      }
    ],
    "per_page": 12,
    "total": 50
  }
}
```

### Get Single Advert
Fetch details of a specific advert.

**Endpoint:** `GET /api/v1/landing/adverts/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Professional Beat Production",
    "description": "High-quality beats...",
    "category": "Beats",
    "price": 199,
    "views": 1246,
    "user": {
      "id": 10,
      "name": "Mike Beats",
      "username": "mikebeats",
      "email": "mike@example.com"
    }
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Advert not found"
}
```

---

## Producers

### Get All Producers
Fetch paginated list of verified producers/engineers.

**Endpoint:** `GET /api/v1/landing/producers`

**Query Parameters:**
- `specialty` (optional): Filter by specialty
- `search` (optional): Search in name, bio, and specialty
- `sort_by` (optional): Sort by "rating", "reviews", or "newest" (default: "rating")
- `per_page` (optional): Number of results per page (default: 12)
- `page` (optional): Page number

**Example Request:**
```
GET /api/v1/landing/producers?specialty=Hip-Hop Producer&sort_by=rating&per_page=12
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 5,
        "name": "Mike Beats",
        "email": "mike@example.com",
        "bio": "Professional hip-hop producer...",
        "specialty": "Hip-Hop Producer",
        "location": "Los Angeles, CA",
        "is_verified": true,
        "total_reviews": 156,
        "average_rating": 4.9,
        "completed_projects": 320,
        "production_samples": [
          {
            "id": 1,
            "title": "Beat Sample 1",
            "file_url": "...",
            "status": "approved"
          }
        ]
      }
    ],
    "per_page": 12,
    "total": 45
  }
}
```

### Get Producer Details
Fetch detailed information about a specific producer including reviews.

**Endpoint:** `GET /api/v1/landing/producers/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Mike Beats",
    "bio": "Professional hip-hop producer...",
    "specialty": "Hip-Hop Producer",
    "location": "Los Angeles, CA",
    "total_reviews": 156,
    "average_rating": 4.9,
    "completed_projects": 320,
    "production_samples": [...],
    "project_reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing work!",
        "reviewer": {
          "id": 20,
          "name": "Sarah K."
        },
        "created_at": "2024-10-20T10:00:00.000000Z"
      }
    ]
  }
}
```

### Get Producer Reviews
Fetch paginated reviews for a specific producer.

**Endpoint:** `GET /api/v1/landing/producers/{id}/reviews`

**Query Parameters:**
- `per_page` (optional): Number of results per page (default: 10)
- `page` (optional): Page number

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Excellent work, very professional!",
        "reviewer": {
          "id": 20,
          "name": "Sarah K."
        },
        "created_at": "2024-10-20T10:00:00.000000Z"
      }
    ],
    "per_page": 10,
    "total": 156
  }
}
```

---

## Statistics

### Get Platform Statistics
Fetch overall platform statistics for the landing page.

**Endpoint:** `GET /api/v1/landing/statistics`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total_producers": 10245,
    "total_projects": 50123,
    "total_adverts": 2547,
    "total_reviews": 15678,
    "average_rating": 4.8
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An error occurred. Please try again."
}
```

### 422 Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## Integration Examples

### JavaScript/React with Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-domain.com/api/v1/landing',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Submit contact form
const submitContact = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Get producers
const getProducers = async (params) => {
  try {
    const response = await api.get('/producers', { params });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### cURL Examples

**Submit Contact Form:**
```bash
curl -X POST http://your-domain.com/api/v1/landing/contact \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question",
    "message": "Hello, I have a question..."
  }'
```

**Get Producers:**
```bash
curl -X GET "http://your-domain.com/api/v1/landing/producers?sort_by=rating&per_page=12" \
  -H "Accept: application/json"
```

---

## Notes

- All GET endpoints are public and don't require authentication
- POST endpoints (contact, newsletter) are also public but have rate limiting
- All timestamps are in ISO 8601 format (UTC)
- Pagination follows Laravel's standard format
- Consider implementing rate limiting for production use
- CORS should be configured to allow requests from your landing page domain

---

## Support

For API support or questions, contact: dev@dasemarket.com

