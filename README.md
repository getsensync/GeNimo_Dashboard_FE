# Genimo Dashboard (FE)
A **Resposive** Dashboard Web App built with **React** using *Material-UI* and *Styled-component*. This App is used to utilize business process in Nimo Highland.

### Stack
- Node JS
- React JS

### Features
1.  Overviewing Sales (Dashboard)
2.  CRUD Customers
3.  CRUD Spots
4.  Read Activity (Logs)
5.  Trigger Reader (bracelet scanner)
6.  User Authentication and Authorization
7.  Account Management 

## Deployed App

### Web Site
- Website is still under development
### CI/CD -- Release
-  Using Netlify Auto Deploy (every new commit)
- Local PC Server at Nimo Highland

## Installation

Note : You should install Node.Js before run this app
```bash
# Clone this project
git clone https://github.com/getsensync/GeNimo_Dashboard_FE

-- Dependencies Installation
# Cd to 'GeNimo_Dashboard_FE' Folder
cd "GeNimo_Dashboard_FE"
# Install Depencies Using Node
npm install

-- Development Mode
# Start Web App Development Mode
npm run dev

-- Build Mode (Not needed, Using CI/CD instead)
# Build Wep App
npm build
```

## Directory sturcture code

````
GeNimo_Dashboard_FE
├─ .editorconfig
├─ .eslintrc.json
├─ .git
├─ .gitattributes
├─ .gitignore
├─ jsconfig.json
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ public
│ ├─ assets
│ ├─ favicon-16x16.png
│ ├─ favicon-32x32.png
│ ├─ favicon.ico
│ └─ manifest.json
└─ src
├─ author
│ └─ authorization.js
├─ components
│ ├─ chart.js
│ ├─ logo.js
│ ├─ scrollbar.js
│ └─ severity-pill.js
├─ contexts
│ └─ auth-context.js
├─ guards
│ └─ auth-guard.js
├─ hocs
│ └─ with-auth-guard.js
├─ hooks
│ ├─ use-auth.js
│ ├─ use-nprogress.js
│ ├─ use-popover.js
│ └─ use-selection.js
├─ pages
│ ├─ 404.js
│ ├─ account.js
│ ├─ auth
│ │ ├─ login.js
│ │ └─ register.js
│ ├─ customers.js
│ ├─ index.js
│ ├─ logs.js
│ ├─ settings.js
│ ├─ spots.js
│ ├─ trigger.js
│ ├─ _app.js
│ └─ _document.js
├─ sections
│ ├─ account
│ │ ├─ account-profile-details.js
│ │ └─ account-profile.js
│ ├─ customer
│ │ ├─ customers-form.js
│ │ ├─ customers-search.js
│ │ └─ customers-table.js
│ ├─ log
│ │ └─ logs-table.js
│ ├─ overview
│ │ ├─ overview-hold-amount.js
│ │ ├─ overview-sales.js
│ │ ├─ overview-total-customers.js
│ │ ├─ overview-total-tickets.js
│ │ └─ overview-traffic.js
│ ├─ settings
│ ├─ spot
│ │ ├─ spots-form.js
│ │ └─ spots-table.js
│ └─ trigger
│ ├─ create-user-form.js
│ └─ top-up-form.js
├─ theme
│ └─ index.js
└─ utils
├─ apply-pagination.js
├─ backend-url.js
├─ chart-options
│ └─ overview-sales.js
├─ create-emotion-cache.js
├─ create-resource-id.js
├─ data.js
├─ function.js
├─ get-initials.js
└─ userAuth.js
````