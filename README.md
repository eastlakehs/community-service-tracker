<h1 align="center">Community Service Tracker</h1>
<p align="center">
<!--  <a href="https://img.shields.io/badge/Minimized-4KB-brightgreen.svg"> EX: How to make custom badges with shields.io API --!>
<!--    <img src="https://img.shields.io/badge/Minimized-4KB-brightgreen.svg" /> --!>
<!--  </a> --!>
<!--  <a href="https://img.shields.io/badge/Minimized-4KB-brightgreen.svg"> --!>
<!--    <img src="https://img.shields.io/badge/React Bundle-4KB-brightgreen.svg" /> --!>
<!--  </a> --!>
</p>


<p align="center">
  Repo for the eastlake community service tracker website
</p>
<p align="center">
  <img src="./Docs/images/wolflogo.png" width="200" height="200" />
</p>


## Best Practicies
### In order to make this repo maintainible, the following rules should be followed: 
Pushing directly to a branch should be blocked <br>
All commits should be done through pull requests <br>
All pull requests should be reviewed by at least one other person <br>
 
## Security

### Using Firebase email-link-auth is the safest choice
<a href = "https://firebase.google.com/docs/auth/web/email-link-auth">Firebase Docs</a> <br>
Users get a emailed a link that allows them to sign in <br>
No passwords are ever stored which prevents unintential misconfigurations <br>
The user emails are automatically verified which prevents impersonation and binds the user to their lwsd email <br>
Only users from lwsd will be able to acess the database,  preventing outside usage/spam <br>

