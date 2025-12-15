# GitHub Deployment Guide

## Quick Start: Push to GitHub in 5 Minutes

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `IS117_portfolio` (or your choice)
3. Description: "IS117 Final Project - Professional Web Portfolio System"
4. **Leave it empty** - don't initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Connect Local Repo to GitHub

Copy the commands from GitHub's "...or push an existing repository" section:

```bash
cd /home/anabhayan/IS117_portfolio

# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/IS117_portfolio.git

# Push code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/docs`
5. Click "Save"

### Step 4: Wait for Deployment

- GitHub will deploy your site automatically
- Takes 2-3 minutes typically
- You'll see a green checkmark when ready
- Your site will be live at: `https://YOUR_USERNAME.github.io/IS117_portfolio/`

---

## Troubleshooting

### Issue: 404 Error on GitHub Pages

**Solution:**
- Make sure you selected `/docs` folder, not `/root`
- Wait a few minutes, deployment isn't instant
- Check that `.nojekyll` file exists in docs/ folder
- Verify the Actions tab shows a successful deployment

### Issue: GitHub Actions Not Running

**Solution:**
1. Go to repository "Settings" → "Actions" → "General"
2. Enable "Allow all actions and reusable workflows"
3. Push a new commit to trigger the workflow

### Issue: Push Rejected (Authentication)

**Solution:**
```bash
# If you need to set up authentication:
# Option 1: Use GitHub CLI
gh auth login

# Option 2: Use Personal Access Token
# Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
# Generate token with 'repo' scope
# Use token as password when pushing
```

### Issue: CSS/JS Not Loading

**Solution:**
- All asset paths are relative, so they should work
- Check browser console for 404 errors
- Verify file names match exactly (case-sensitive)

---

## Verify Deployment Checklist

After deployment, test these:

- [ ] Landing page loads: `https://YOUR_USERNAME.github.io/IS117_portfolio/`
- [ ] Portfolio site: `.../portfolio/index.html`
- [ ] Design style site: `.../design_style/index.html`
- [ ] Client site: `.../client_site/index.html`
- [ ] All navigation links work
- [ ] CSS styles applied correctly
- [ ] JavaScript animations working
- [ ] Mobile responsive (test on phone)
- [ ] Forms display (won't submit until Zapier configured)
- [ ] GitHub Actions ran successfully (check Actions tab)

---

## Configure Integrations (After Deployment)

### Calendly Setup

1. Sign up at https://calendly.com (free plan works)
2. Create event type (e.g., "30-Minute Consultation")
3. Copy your Calendly URL
4. Edit `docs/portfolio/index.html`:
   - Find line ~220: `data-url="YOUR_CALENDLY_URL_HERE"`
   - Replace with: `data-url="https://calendly.com/your-username/30min"`
5. Commit and push changes

### Zapier Webhook Setup

1. Sign up at https://zapier.com (free plan works)
2. Create new Zap:
   - Trigger: "Webhooks by Zapier" → "Catch Hook"
   - Copy webhook URL (looks like: `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)
3. Edit JavaScript files:
   - `docs/portfolio/script.js` line 11
   - `docs/client_site/script.js` line 7
   - Replace `YOUR_ZAPIER_WEBHOOK_URL_HERE` with your URL
4. Set up Zap Action:
   - Options: Google Sheets, Email, Slack, etc.
   - Map form fields to spreadsheet columns
5. Test webhook by submitting form on live site
6. Commit and push changes

---

## GitHub Actions Lighthouse CI

The workflow automatically runs on every push to check quality:

**View Results:**
1. Go to repository "Actions" tab
2. Click latest workflow run
3. Click "Lighthouse CI" job
4. See Lighthouse scores for all sites

**Expected Scores:**
- ✅ Accessibility: 100/100
- ✅ SEO: 100/100
- ✅ Performance: 90+
- ✅ Best Practices: 90+

**If Workflow Fails:**
- Check the logs in Actions tab
- Common issues: Missing assets, console errors, performance issues
- Fix locally, then push again

---

## Custom Domain (Optional)

If you want to use a custom domain (e.g., `yourname.com`):

1. Buy domain from Namecheap, Google Domains, etc.
2. In GitHub repo settings → Pages:
   - Enter custom domain
   - Wait for DNS check
3. In your domain registrar, add DNS records:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   ```
4. Wait 24-48 hours for DNS propagation
5. Enable "Enforce HTTPS" in GitHub Pages settings

---

## Updating Your Site

After initial deployment, make changes and push:

```bash
# Make your edits to HTML/CSS/JS files
# Stage changes
git add .

# Commit (pre-commit hooks will run linters)
git commit -m "Update portfolio projects"

# Push to GitHub (triggers CI/CD)
git push

# GitHub Pages auto-deploys in 1-2 minutes
```

---

## Emergency Rollback

If you push broken code:

```bash
# View recent commits
git log --oneline -5

# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard COMMIT_HASH
git push -f origin main
```

---

## Need Help?

**GitHub Documentation:**
- https://docs.github.com/en/pages

**Lighthouse CI:**
- https://github.com/GoogleChrome/lighthouse-ci

**GitHub Actions:**
- https://docs.github.com/en/actions

**Contact Professor/TA** if you encounter issues specific to course requirements.

---

## Next Steps After Deployment

1. ✅ Test all site functionality
2. ✅ Configure Calendly integration
3. ✅ Set up Zapier webhooks
4. ✅ Share link with friends/family for feedback
5. ✅ Add GitHub repo link to your resume/LinkedIn
6. ✅ Test on multiple devices and browsers
7. ✅ Run Lighthouse audits to verify scores
8. ✅ Submit project link to course portal

---

**🎉 Congratulations! Your portfolio is now live on the internet!**
