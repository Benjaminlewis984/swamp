# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP <br>
Server URL: ec2-3-132-216-71.us-east-2.compute.amazonaws.com <br>
Server IP: 3.132.216.71
2. SSH username: teach
3. SSH password or key: teach <br>
    3a. Use the command `ssh -i credentials/teachkey teach@<ip_address>` . The path given assumes that you are in the home directory of the project folder. Adjust accordingly. <br>
    3b. If there is a warning stating that the permissions are too open use the command `chmod 600 credentials/teachkey` . This is necessary if you are downloading the file for the first time.
    <br> If a ssh key is used please upload the key to the credentials folder.

4. Database URL or IP and port used.
Database IP: 35.247.83.230
Database Port: 3306
5. Database username: teach
6. Database password: teach
7. Database name: Database
  Instructions: 
    Navigate to /csc648-fa20-team04/credentails/mysql_keys
    Use the following command: mysql -uroot -p -h 35.247.83.230 --ssl-ca=server-ca.pem --ssl-cert=client-cert.pem --ssl-key=client-key.pem
    When prompted, enter "teach" as the password

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
