# Backend setup for SISTRAD site

The site uses a **simple backend** so the contact form sends real submissions to you. No server to run—everything works with free external services.

---

## 1. Contact form (Formspree) – recommended

Form submissions are sent to **Formspree**. You get an email for each submission and can see them in a dashboard.

### Steps

1. Go to **https://formspree.io** and sign up (free).
2. Click **New form**, name it (e.g. “SISTRAD Contact”), and create it.
3. Copy your **form ID** (looks like `xyzabcde` or `mwkdopqr`).
4. In your project, open **`index.html`** and find the contact form (around line 471).
5. Replace **both** placeholders with your form ID:
   - `data-formspree-id="YOUR_FORMSPREE_ID"` → `data-formspree-id="xyzabcde"`
   - `action="https://formspree.io/f/YOUR_FORMSPREE_ID"` → `action="https://formspree.io/f/xyzabcde"`
6. Save and deploy. Submissions will go to the email you used for Formspree (you can change it in Formspree settings).

**Formspree free tier:** 50 submissions per month. Paid plans for more and extra features (e.g. file uploads, redirects).

---

## 2. Alternative: Netlify Forms (if you host on Netlify)

If you deploy this folder to **Netlify** (e.g. via Netlify Drop or Git), you can use Netlify Forms instead of Formspree.

1. In **`index.html`**, change the form to:
   - Remove the `data-formspree-id` and `action` attributes.
   - Add: `method="POST"` and `data-netlify="true"`.
   - Add a hidden input right after `<form ...>`:
     ```html
     <input type="hidden" name="form-name" value="contact" />
     ```
2. Name the form by adding `name="contact"` to the `<form>` tag.
3. Deploy on Netlify. Submissions appear under **Site dashboard → Forms**.

You can keep Formspree as well and switch the form to Netlify only if you prefer.

---

## 3. What the “backend” does today

| Feature            | How it works |
|--------------------|--------------|
| Contact form       | Formspree receives the POST, sends you an email, and (optionally) shows submissions in their dashboard. |
| Newsletter checkbox| Sent in the same form payload; you see it in the Formspree email/dashboard and can use it for manual or automated lists. |
| No database        | You don’t need a database; Formspree (or Netlify) stores submissions for you. |
| No server code    | The site stays static; Formspree/Netlify handle the backend. |

---

## 4. If you want a “full” backend later

- **Blog / News:** Use a headless CMS (e.g. Strapi, Decap CMS) or WordPress, and pull content via API or build step.
- **Database + API:** Add a small backend (e.g. Node/Express, Python/FastAPI) and host it on Railway, Render, or similar; point the form or other features to that API.
- **Auth / admin:** Use a CMS with login or a small admin app (e.g. Next.js or Laravel) that talks to your API or database.

For now, Formspree (or Netlify Forms) is enough to receive contact form submissions and get the site live with a working “backend” for the form.
