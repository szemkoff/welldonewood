# Setting Up Welldonewood Site on Netlify with CMS

This document guides you through deploying your Welldonewood website to Netlify and setting up the Netlify CMS.

## Deployment Steps

### 1. Push Your Code to GitHub

First, make sure your code is in a GitHub repository:

```bash
# In the welldonewood-site directory
git add .
git commit -m "Initial website setup with Netlify CMS"
git push
```

### 2. Deploy to Netlify

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub account
4. Select your welldonewood-site repository
5. Configure the deployment with these settings:
   - **Build command**: `cd website && npm run build`
   - **Publish directory**: `website/build`
6. Click "Deploy site"

### 3. Set Up Netlify Identity

1. On your site dashboard, go to **Site settings** → **Identity**
2. Click "Enable Identity"
3. Under **Registration preferences**, select "Invite only"
4. Under **External providers**, you can enable login via GitHub, Google, etc. (optional)
5. Scroll down to **Services** → **Git Gateway** and enable it

### 4. Enable Git Gateway

1. Still in the Identity settings, find "Git Gateway"
2. Click "Enable Git Gateway"
3. This allows Netlify CMS to make changes to your GitHub repository

### 5. Invite Yourself as a User

1. Go to the **Identity** tab in the site dashboard
2. Click "Invite users"
3. Enter your email address and click "Send"
4. Check your email and accept the invitation

### 6. Access Your CMS

1. Go to your deployed site at `https://your-site-name.netlify.app/admin/`
2. Log in with your credentials
3. You should now have access to the Netlify CMS!

## Using the CMS

### Managing Products

1. Click on "Products" in the sidebar
2. You can add new products or edit existing ones
3. Each product has fields for title, description, price, images, etc.
4. Changes will be committed directly to your GitHub repository

### Managing Blog Posts

1. Click on "Blog" in the sidebar
2. Create new blog posts about woodworking tips, project showcases, etc.
3. Changes are saved as pull requests if you have the editorial workflow enabled

### Managing Testimonials

1. Click on "Testimonials" in the sidebar
2. Add customer testimonials with ratings, customer images, etc.

### Managing Homepage and Company Info

1. Click on "Settings" in the sidebar
2. Edit the homepage content and company information

## Media Management

1. You can upload images directly through the CMS
2. Images will be stored in the `/static/img/` directory in your repository
3. Use the media browser to select images for products, blog posts, etc.

## Customizing Further

If you need to customize the CMS further:
- Edit the `static/admin/config.yml` file to change content models
- Update the Docusaurus configuration in `docusaurus.config.ts`
- Modify the site styles in `src/css/custom.css` 