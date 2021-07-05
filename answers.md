1. What is the purpose of using _sessions_?

We use sessions as a way to store data (persistant) for a specfic user/user instance. This allows for us, the devs to create secure environments/resources that the user can access via logins without, having to resend those credentials manually with every request.


2. What does bcrypt do to help us store passwords in a secure manner. it uses hashing to generate a far more secure way to store and then check encrypted data (passwords, usernames)





3. What does bcrypt do to slow down attackers? It uses salts and is adaptive allowing the count to become larger and more complex over time, aiding in brute force resistance.






4. What are the three parts of the JSON Web Token?

the header
the payload
the signature
