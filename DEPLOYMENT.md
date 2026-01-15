# Deployment Guide for Radio Consultant Website

This guide explains how to deploy your website to **Vercel** and make the contact form fully functional.

## Prerequisite
- A generic [GitHub](https://github.com/) account (recommended) or a Vercel account.

## Step 1: Push Code to GitHub (Recommended)
1. Initialize a git repository in your project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on GitHub.
3. Push your code to GitHub.

## Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Other** (since it's plain HTML/CSS).
5. Output Directory: Leave default (root).
6. Click **Deploy**.

## Step 3: Activate the Contact Form
Since this is a static website (HTML/CSS), we need a backend service to email you the form submissions. We will use **Formspree** (it has a free tier).

1. Go to [Formspree.io](https://formspree.io/) and create an account.
2. Click **+ New Form**.
3. Name it "Radio Website Contact" and enter the email address where you want to receive leads.
4. You will get an "Endpoint" URL that looks like: `https://formspree.io/f/xyzaqwer`.
5. **Copy this URL.**

## Step 4: Connect Form to Website
You have two options:

### Option A: Edit Code (Permanent)
1. Open `contact.html` in your code editor.
2. Find the `<form>` tag (around line 53).
3. Add `action="YOUR_FORMSPREE_URL"` to the tag.
   ```html
   <!-- Example -->
   <form id="contactForm" action="https://formspree.io/f/xyzaqwer" method="POST">
   ```
4. Commit and push the changes. Vercel will auto-update.

### Option B: Quick Fix (If you just want it to work now)
Paste your Formspree URL into the `action` attribute of the form in `contact.html`.

## Step 5: Clean URLs & vercel.json
I have included a `vercel.json` file which automatically:
- Removes `.html` extensions (e.g., `yoursite.com/contact` works instead of `yoursite.com/contact.html`).
- Adds security headers.
- Caches your CSS/Images for faster loading.

You do not need to do anything extra; Vercel will read this file automatically.

## Important for Google Ads
- Ensure your **Privacy Policy** (`privacy.html`) link is visible on every page.
- Ensure your physical address and phone number on the Contact page are real and verifiable.
