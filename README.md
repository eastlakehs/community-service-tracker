# Community Service Tracker


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

