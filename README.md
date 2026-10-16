# Hoop IQ Trainer

A mobile-friendly, offline basketball IQ trainer for players, coaches, and parents.

Hoop IQ Trainer helps players study coach-assigned basketball terminology through flashcards, quizzes, category training, missed-answer review, progress tracking, local coach tools, and visual half-court diagrams.

## Current Version

v3 production — Defensive IQ Pack and Coach Review (October 16, 2026)

## Current App Status

- Single-file static HTML app
- Works offline after loading
- Mobile-friendly study and quiz experience
- Local progress saved with browser localStorage
- Local coach tools for editing terminology on one device
- Coach-edited and imported categories appear in local study, quiz, Coach Tools, and progress views
- Static SVG half-court diagrams and diagram quiz mode
- Team feedback helper that opens an email draft or copies feedback text
- Optional Google Analytics 4 measurement is **off until visitors opt in**. No Google tag loads for visitors who decline.
- GA4 events (when permitted): page views, study/diagram starts, quiz starts/completions, and feedback initiation. Custom events never contain player names, individual answers, or coach-edited notes.
- Visitors can allow or decline on Home and change their choice under Player / Settings. See [Privacy Notice](privacy.html).
- Future Supabase/auth/team features are planning-only and not live in the app

## Features

- Flashcard study mode
- Mixed quiz mode
- Category quiz mode
- Missed-term review
- Daily 10 workout
- Progress dashboard
- Term library
- Coach Tools for local term and diagram-note edits
- Import/export terminology JSON
- Half-court diagram study
- Name This Action diagram quiz
- Local role mode for Coach, Player, or Guest

## Ownership

&copy; 2026 Anthony Boyd / Worldmedia Publishing & Consulting LLC. All rights reserved.

Hoop IQ Trainer is an educational basketball terminology training tool.

## Development Notes

The app currently remains static, public, and offline-friendly. Supabase, authentication, team accounts, rosters, synced player progress, and coach dashboards are documented as future planning work only.

## Live App

Hoop IQ Trainer is live here:

https://neuralmusicgrp.github.io/Hoop_IQ_Trainer/
