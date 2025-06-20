
# Backend Architecture for Telangana Government Services Portal

This document outlines the recommended backend architecture for the government services portal application.

## Database Schema

### Core Tables

#### 1. Users Table
```sql
users (
  id: UUID PRIMARY KEY,
  email: VARCHAR UNIQUE,
  phone: VARCHAR,
  name: VARCHAR,
  preferred_language: ENUM('english', 'telugu', 'hindi'),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 2. User Profiles Table
```sql
user_profiles (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  age_group: VARCHAR,
  employment_status: VARCHAR,
  income_range: VARCHAR,
  category: VARCHAR (general, obc, sc, st),
  region: VARCHAR (urban, rural),
  gender: VARCHAR,
  marital_status: VARCHAR,
  disability_status: BOOLEAN,
  family_size: INTEGER,
  education_level: VARCHAR,
  housing_type: VARCHAR,
  land_ownership: BOOLEAN,
  chronic_illness: BOOLEAN,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 3. Government Schemes Table
```sql
government_schemes (
  id: UUID PRIMARY KEY,
  scheme_name: VARCHAR,
  description: TEXT,
  benefit_amount: DECIMAL,
  benefit_description: TEXT,
  category: VARCHAR,
  eligibility_criteria: JSONB,
  application_process: TEXT,
  required_documents: JSONB,
  official_link: VARCHAR,
  is_active: BOOLEAN DEFAULT true,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 4. Scheme Applications Table
```sql
scheme_applications (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  scheme_id: UUID REFERENCES government_schemes(id),
  status: ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected'),
  application_data: JSONB,
  submitted_at: TIMESTAMP,
  reviewed_at: TIMESTAMP,
  reviewer_notes: TEXT,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 5. Document Templates Table
```sql
document_templates (
  id: UUID PRIMARY KEY,
  template_name: VARCHAR,
  template_type: VARCHAR,
  description: TEXT,
  required_fields: JSONB,
  template_content: TEXT,
  is_active: BOOLEAN DEFAULT true,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 6. Generated Documents Table
```sql
generated_documents (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  template_id: UUID REFERENCES document_templates(id),
  document_data: JSONB,
  file_url: VARCHAR,
  status: ENUM('draft', 'generated', 'downloaded'),
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 7. ENagrik Cards Table
```sql
enagrik_cards (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  card_type: VARCHAR,
  card_number: VARCHAR UNIQUE,
  qr_code: TEXT,
  card_data: JSONB,
  is_active: BOOLEAN DEFAULT true,
  issued_at: TIMESTAMP,
  expires_at: TIMESTAMP,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 8. Meeseva Centers Table
```sql
meeseva_centers (
  id: UUID PRIMARY KEY,
  name: VARCHAR,
  address: TEXT,
  phone: VARCHAR,
  operating_hours: VARCHAR,
  services_offered: JSONB,
  latitude: DECIMAL,
  longitude: DECIMAL,
  is_active: BOOLEAN DEFAULT true,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 9. Chat Sessions Table
```sql
chat_sessions (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  session_data: JSONB,
  language: VARCHAR,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)
```

#### 10. Chat Messages Table
```sql
chat_messages (
  id: UUID PRIMARY KEY,
  session_id: UUID REFERENCES chat_sessions(id),
  message_text: TEXT,
  is_user_message: BOOLEAN,
  message_type: VARCHAR,
  metadata: JSONB,
  created_at: TIMESTAMP
)
```

## RESTful API Endpoints

### Authentication & User Management
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### User Profiles
- `GET /api/profiles/:userId` - Get user profile details
- `PUT /api/profiles/:userId` - Update user profile
- `POST /api/profiles/:userId/questionnaire` - Submit questionnaire data

### Government Schemes
- `GET /api/schemes` - Get all available schemes
- `GET /api/schemes/:id` - Get specific scheme details
- `POST /api/schemes/recommendations` - Get personalized scheme recommendations
- `POST /api/schemes/:id/apply` - Apply for a scheme
- `GET /api/schemes/applications/:userId` - Get user's scheme applications
- `PUT /api/schemes/applications/:applicationId` - Update application status

### Document Generation (TDocs)
- `GET /api/document-templates` - Get all document templates
- `GET /api/document-templates/:id` - Get specific template
- `POST /api/documents/generate` - Generate document from template
- `GET /api/documents/:userId` - Get user's generated documents
- `GET /api/documents/:id/download` - Download generated document

### ENagrik Cards
- `POST /api/enagrik-cards/generate` - Generate new ENagrik card
- `GET /api/enagrik-cards/:userId` - Get user's ENagrik cards
- `GET /api/enagrik-cards/:id/verify` - Verify card authenticity
- `PUT /api/enagrik-cards/:id/status` - Update card status

### Meeseva Centers
- `GET /api/meeseva-centers` - Get all Meeseva centers
- `GET /api/meeseva-centers/nearby?lat=X&lng=Y&radius=Z` - Find nearby centers
- `GET /api/meeseva-centers/:id` - Get specific center details

### Chatbot & AI
- `POST /api/chat/sessions` - Create new chat session
- `POST /api/chat/message` - Send message to chatbot
- `GET /api/chat/sessions/:sessionId/history` - Get chat history
- `POST /api/chat/voice-to-text` - Convert voice to text
- `POST /api/chat/text-to-speech` - Convert text to speech

### Search & Filters
- `GET /api/search/schemes?query=X&filters=Y` - Search schemes
- `GET /api/search/documents?query=X` - Search document templates
- `GET /api/search/centers?location=X` - Search centers by location

### Analytics & Reporting
- `GET /api/analytics/user-activity` - Get user activity analytics
- `GET /api/analytics/scheme-popularity` - Get scheme popularity metrics
- `GET /api/analytics/document-usage` - Get document usage statistics

## Technical Requirements

### Infrastructure
- **Database**: PostgreSQL 14+ (for JSONB support)
- **Cache**: Redis for session management and caching
- **File Storage**: AWS S3 or Google Cloud Storage for documents
- **Search**: Elasticsearch for full-text search capabilities

### External Services
- **SMS/Email**: Integration with notification services
- **Maps API**: Google Maps or OpenStreetMap for location services
- **AI/ML**: Integration with language models for chatbot functionality
- **Payment Gateway**: For applicable government fees

### Security Features
- JWT-based authentication
- Rate limiting on all endpoints
- Input validation and sanitization
- Audit logging for sensitive operations
- Data encryption for PII
- CORS configuration
- API versioning

### Performance Considerations
- Database indexing on frequently queried fields
- Caching strategy for static data
- Pagination for large datasets
- Async processing for document generation
- CDN for static assets

## Data Models

### Scheme Eligibility Criteria (JSONB)
```json
{
  "age": {"min": 18, "max": 60},
  "income": {"max": 200000},
  "category": ["general", "obc", "sc", "st"],
  "region": ["rural", "urban"],
  "employment": ["unemployed", "self-employed"],
  "requirements": [
    "Domicile certificate",
    "Income certificate",
    "Caste certificate"
  ]
}
```

### Document Template Fields (JSONB)
```json
{
  "personal_info": ["name", "age", "address"],
  "family_details": ["father_name", "mother_name"],
  "contact_info": ["phone", "email"],
  "documents": ["aadhar", "pan", "income_certificate"]
}
```

### ENagrik Card Data (JSONB)
```json
{
  "holder_name": "string",
  "holder_photo": "url",
  "emergency_contact": "string",
  "medical_info": "string",
  "government_id": "string",
  "digital_signature": "string"
}
```

## Implementation Notes

1. **Multilingual Support**: All user-facing content should support Telugu, Hindi, and English
2. **Offline Capability**: Consider implementing service workers for basic offline functionality
3. **Progressive Web App**: Implement PWA features for mobile users
4. **Accessibility**: Ensure all APIs support screen readers and assistive technologies
5. **Government Integration**: Design APIs to integrate with existing government systems

## Next Steps

1. Set up development environment with PostgreSQL and Redis
2. Implement authentication and user management APIs
3. Create database migrations for all tables
4. Implement scheme recommendation algorithm
5. Set up file storage and document generation service
6. Integrate chatbot with language processing capabilities
7. Implement real-time features for chat functionality
8. Set up monitoring and logging infrastructure
