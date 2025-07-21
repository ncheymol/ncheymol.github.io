---
layout: post
title:  "Learn how to optimize your costs with Windows 365 Frontline Shared"
banner : "https://media.licdn.com/dms/image/v2/D4E12AQEnUCnuhGwyDg/article-cover_image-shrink_720_1280/B4EZedylSDHYAI-/0/1750698972601?e=1758758400&v=beta&t=tr1hsSx5x-4bpk0c-SUCQAP9xgAHZABYgk7goq8_o_Y"
date:   2025-06-23 21:00:00 +0200
categories: W365
---


 Windows 365 Frontline Shared is a new solution that expands Microsoft's DaaS offering. It provides a temporary virtual machine to users, thus optimizing the cost of Windows 365 for those who do not work on it full-time.

This blog post will explain how to set up W365 Frontline Shared within your organization, detailing each step of the process.

Article Français : lien

# User Settings
This setting does not apply to Windows 365 Frontline Shared machines

# Device Preparation group
Create the group to which apps and policies will be deployed
![](2025-07-21-17-09-54.png)

Contenu de l’article
Add Intune Provisioning Client as an owner

# Device Preparation Policy 
In order to install the apps, apply the configs when provisioning the machine, it is necessary to create a device preparation policy.

1.      Go to Devices > Windows > Enrollment

Contenu de l’article
2.      Select Device Preparation Policy

Contenu de l’article
3.      Click Create > Automatic

Contenu de l’article
4.      Click Next

5.      Choose a name

Contenu de l’article
6.      Click Next

7.      Select the group you created earlier

Contenu de l’article
8.      Click Next

9.      Click Add to select the apps and scripts to be applied during provisioning

Contenu de l’article
10.      Click Add  for each

Contenu de l’article
Note: Store applications must be in system context otherwise they are not installed during provisioning
11.      Click Save  > Next

Contenu de l’article
12.      Click Next

13. Check that everything is good

Contenu de l’article
14.      Click Save

/!\ Don 't forget to assign applications and scripts to the group, adding to the Preparation Policy only defines what needs to be followed.

# Create Provisioning Profile
Now all that's left to do is create the machine provisioning policy, go to Intune > Devices > Windows 356 > Provisioning Policies

Contenu de l’article
1.      Cliquer sur Create Policy

2.      Enter a Name

3.      Select Frontline > Shared > Microsoft entered Joined

Contenu de l’article
4.      Select Microsoft Hosted Network and the desired region

Contenu de l’article
5.      Check Single Sign On and then Click Next

6.      Select the image to use

Contenu de l’article
7.      Click Next

8.      Choose the language and configure the  machine name template

/! \ it is not possible to have a – somewhere other than at the end of the prefix

Contenu de l’article
/!\ The name must be exactly 15 characters long

Contenu de l’article
/! \ the prefix must be a maximum of 7 characters

Contenu de l’article
9.      Then select the readiness policy, the time allotted and whether the user can log in in case of failure

Contenu de l’article
10.      Click Next

Contenu de l’article
11.      Click Next

12. Select User Group

Contenu de l’article
13.      Click Select  > Next

14.      Select the  CPC size, assignment name,  and number

Contenu de l’article
15.      Click Select  > Next

Contenu de l’article
16.      Check that everything is correct and then click Create



# Provisioning du Cloud PC
You can now go to All Cloud PCs and see that provisioning is in progress

Contenu de l’article
Provisioning can take a little over an hour, so be patient.

Contenu de l’article
The machine is ready, all that's left to do is connect

# 1st connexion
1.      Go to https://windows.cloud.microsoft

Contenu de l’article
2.      Click on connect

 Below you will find the different connection steps which are the same as for an Enterprise or Frontline Dedicated CPC



Contenu de l’article


Contenu de l’article
The machine is ready to use

/!\ It 's a temporary machine, make users aware of how to store their documents on OneDrive

/!\ Any file created or modified in the profile will be lost

/!\ Any application installed outside of the Device Preparation Policy will no longer be present at the next connection

Note: the modified files in some sections of the disk are maintained, it may be interesting to hide the C to prevent a user from storing personal data that would be accessible by a person who is not authorized to see them

# Reporting
As the number of simultaneous connections is limited to the number of machines provisioned, it is important to be able to track usage and disconnect a user if necessary

Go to Intune > Reports

Contenu de l’article
Select Connected Frontline Cloud

Contenu de l’article
Here we can see that a provisioning profile has reached its limit

You can click on it to find out more

Contenu de l’article
Here we see that the limit has been waited 2 times during a month

To find out who is logged in, click Connect



Contenu de l’article
If you want to disconnect one or more users is simple, select the CPCs, click on Bulk device action > Restart



Contenu de l’article
# Bugs
During my tests I encountered a bug, my machine got stuck during provisioning, adding a machine to the profile unlocked it (failed)

What's strange is that the image change was not taken into account even though it was done before adding a 2nd machine.

Contenu de l’article
Contenu de l’article
Reprovisioning the two machines solved everything
