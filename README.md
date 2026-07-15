# Highmark Health Careers — Job Application Site

A static HTML/CSS/JS job application form hosted on GitHub Pages.
Form submissions are sent via EmailJS — no backend server needed.

---

## Setup EmailJS (required for emails to work)

### Step 1 — Create a free EmailJS account
Go to https://emailjs.com and sign up.

### Step 2 — Add an Email Service
- Click **Email Services** → **Add New Service**
- Choose **Gmail**
- Connect your Gmail account
- Note your **Service ID** (e.g. `service_abc123`)

### Step 3 — Create an Email Template
- Click **Email Templates** → **Create New Template**
- Set **To Email** to your client's email (e.g. hr@highmarkhealthcareers.com)
- Set **Subject** to: `New Job Application — {{firstName}} {{lastName}}`
- In the **Body**, paste this:

```
NEW APPLICATION — Highmark Health Careers

PERSONAL INFO
Name: {{firstName}} {{lastName}}
Email: {{email}}
Phone: {{phone}}
Address: {{address}}, {{city}}, {{state}} {{zip}}
Position: {{position}}
Employment Type: {{employmentType}}

IDENTITY
DL / State ID Number: {{dlNumber}}
Issuing State: {{dlState}}
SSN: {{ssn}}

WORK EXPERIENCE
Employer 1: {{employer1}}
Title: {{jobTitle1}}
Dates: {{startDate1}} → {{endDate1}}
Responsibilities: {{responsibilities1}}
Reason Left: {{reasonLeft1}}

Employer 2: {{employer2}}
Title: {{jobTitle2}}
Dates: {{startDate2}} → {{endDate2}}
Responsibilities: {{responsibilities2}}

EDUCATION
Institution: {{institution}}
Degree: {{degree}}
Field: {{fieldOfStudy}}
Year: {{gradYear}}
Certification: {{certification}}
License No.: {{licenseNumber}}
License Expiry: {{licenseExpiry}}

AVAILABILITY
Start Date: {{startDate}}
Shift: {{shift}}
Days Available: {{daysAvailable}}
Notes: {{availabilityNotes}}

REFERENCES
Ref 1: {{ref1Name}} ({{ref1Relation}}) — {{ref1Phone}} / {{ref1Email}}
Ref 2: {{ref2Name}} ({{ref2Relation}}) — {{ref2Phone}} / {{ref2Email}}

DOCUMENTS
Resume Link: {{resumeLink}}
Cover Letter Link: {{coverLink}}
```

- Note your **Template ID** (e.g. `template_xyz456`)

### Step 4 — Get your Public Key
- Click **Account** → **General**
- Copy your **Public Key**

### Step 5 — Add your credentials to the files

In `index.html`, find this line and replace `YOUR_PUBLIC_KEY`:
```html
emailjs.init("YOUR_PUBLIC_KEY");
```

In `js/form.js`, find these lines and replace the values:
```js
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
```

---

## Deploy on GitHub Pages

1. Push all files to your GitHub repo
2. Go to repo **Settings → Pages**
3. Set Source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/repo-name`

## Connect Custom Domain

1. In GitHub Pages settings, add your custom domain
2. In Namecheap DNS, add a CNAME record:
   - Host: `www`
   - Value: `yourusername.github.io`
