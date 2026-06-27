# Supabase Team Dashboard Planning

## Purpose

Supabase should eventually turn Hoop IQ Trainer from a single-device training app into a team training platform.

The goal is not just cloud storage. The goal is:

- Coach-controlled terminology
- Player progress tracking
- Team assignments
- Quiz history
- Motion diagram progress
- Future 2D game scores

## Core Rule

Do not add Supabase code in v0.4.0.

This planning doc exists so the app structure can be designed safely before connecting authentication, database tables, or player data.

## Future User Roles

### Coach

A coach should be able to:

- Create a team
- Invite players
- Edit team-specific terminology
- Assign study packs
- View player progress
- View missed terms
- View quiz scores
- View motion diagram progress
- View future 2D game scores

### Player

A player should be able to:

- Join a team
- Study assigned terms
- Take quizzes
- Review missed terms
- Practice motion diagrams
- Play future 2D training modes
- Track personal progress

### Parent / Viewer

Optional future role.

A parent or viewer may be able to:

- View limited player progress
- See assigned study goals
- See completed practice sessions

## Future Tables

### teams

Stores team records.

Possible fields:

- id
- name
- coach_id
- season
- created_at

### team_members

Connects users to teams.

Possible fields:

- id
- team_id
- user_id
- role
- display_name
- jersey_number
- created_at

### terms

Stores glossary terms.

Possible fields:

- id
- team_id
- term
- category
- definition
- coach_definition
- cue
- common_mistake
- difficulty
- tags
- diagram_type
- diagram_note
- created_at
- updated_at

### motion_diagrams

Stores motion diagram data.

Possible fields:

- id
- term_id
- team_id
- motion_steps
- version
- created_at
- updated_at

### quiz_sessions

Stores each quiz attempt.

Possible fields:

- id
- user_id
- team_id
- quiz_type
- score
- total_questions
- created_at

### quiz_answers

Stores individual quiz answers.

Possible fields:

- id
- quiz_session_id
- term_id
- selected_answer
- correct_answer
- is_correct
- created_at

### player_progress

Stores long-term progress.

Possible fields:

- id
- user_id
- team_id
- term_id
- attempts
- correct_count
- missed_count
- last_seen_at
- mastery_level

### game_sessions

Stores future 2D game attempts.

Possible fields:

- id
- user_id
- team_id
- term_id
- game_mode
- score
- timing_score
- spacing_score
- decision_score
- created_at

### team_invites

Stores invite links or invite codes.

Possible fields:

- id
- team_id
- invite_code
- role
- expires_at
- created_at

## Security Notes

Future Supabase work must protect player data.

Rules:

- Do not commit .env files.
- Do not expose service role keys.
- Frontend may only use public anon keys.
- Use Row Level Security before storing real player data.
- Coaches should only see their own team.
- Players should only see their own progress unless team sharing is allowed.
- Test with dummy data before real team data.

## Recommended Build Order

1. Finish local expanded IQ pack.
2. Add local motionSteps structure.
3. Add local motion diagram UI.
4. Add local quiz improvements.
5. Add local 2D game prototype.
6. Plan Supabase schema in detail.
7. Add Supabase auth.
8. Add team dashboard.
9. Add player progress sync.
10. Add coach assignments.

## v0.4.0 Decision

Supabase remains planning-only in v0.4.0.

The next live feature should be expanded terminology and motion diagram structure, not cloud accounts.
