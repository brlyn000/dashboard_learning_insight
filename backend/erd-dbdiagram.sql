Table users {
  id int [pk, increment]
  display_name varchar
  name varchar
  email varchar [unique]
  password varchar
  phone varchar
  user_role varchar
  user_verification_status boolean
  created_at timestamp [default: `now()`]
  updated_at timestamp
  deleted_at timestamp
  remember_token varchar
  image_path varchar
  city varchar
  city_id int
  custom_city varchar
  unsubscribe_link varchar
  tz varchar
  verified_at timestamp
  ama varchar
  phone_verification_status boolean
  phone_verified_with varchar
  verified_certificate_name varchar
  verified_identity_document varchar
  refresh_token varchar
}

Table developer_journeys {
  id int [pk, increment]
  name varchar
  summary text
  point int
  required_point int
  xp int
  required_xp int
  difficulty varchar
  status varchar
  created_at timestamp [default: `now()`]
  updated_at timestamp
  instructor_id int
  reviewer_id int
}

Table developer_journey_tutorials {
  id int [pk, increment]
  developer_journey_id int
  title varchar
  type varchar
  content text
  position int
  status varchar
  created_at timestamp [default: `now()`]
  updated_at timestamp
  author_id int
}

Table developer_journey_trackings {
  id int [pk, increment]
  journey_id int
  tutorial_id int
  developer_id int
  status varchar
  last_viewed timestamp
  first_opened_at timestamp
  completed_at timestamp
}

Table developer_journey_submissions {
  id int [pk, increment]
  journey_id int
  quiz_id int
  submitter_id int
  app_link varchar
  app_comment text
  status varchar
  reviewer_id int
  rating int
  note text
  created_at timestamp [default: `now()`]
  updated_at timestamp
}

Table developer_journey_completions {
  id int [pk, increment]
  user_id int
  journey_id int
  created_at timestamp [default: `now()`]
  updated_at timestamp
  enrolling_times int
  study_duration int
  avg_submission_rating float
}

Table exam_registrations {
  id int [pk, increment]
  exam_module_id int
  tutorial_id int
  examinees_id int
  status varchar
  created_at timestamp [default: `now()`]
  updated_at timestamp
  deadline_at timestamp
}

Table exam_results {
  id int [pk, increment]
  exam_registration_id int
  total_questions int
  score int
  is_passed boolean
  created_at timestamp [default: `now()`]
  look_report_at timestamp
}

// Relationships
Ref: developer_journeys.instructor_id > users.id
Ref: developer_journeys.reviewer_id > users.id
Ref: developer_journey_tutorials.developer_journey_id > developer_journeys.id
Ref: developer_journey_tutorials.author_id > users.id
Ref: developer_journey_trackings.journey_id > developer_journeys.id
Ref: developer_journey_trackings.tutorial_id > developer_journey_tutorials.id
Ref: developer_journey_trackings.developer_id > users.id
Ref: developer_journey_submissions.journey_id > developer_journeys.id
Ref: developer_journey_submissions.quiz_id > developer_journey_tutorials.id
Ref: developer_journey_submissions.submitter_id > users.id
Ref: developer_journey_submissions.reviewer_id > users.id
Ref: developer_journey_completions.user_id > users.id
Ref: developer_journey_completions.journey_id > developer_journeys.id
Ref: exam_registrations.tutorial_id > developer_journey_tutorials.id
Ref: exam_registrations.examinees_id > users.id
Ref: exam_results.exam_registration_id > exam_registrations.id