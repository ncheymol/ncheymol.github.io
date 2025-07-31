---
layout: post
title:  "Learn how to optimize your costs with Windows 365 Frontline Shared"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/1.jpg?raw=true"
date:   2025-06-23 21:00:00 +0200
tags: Windows 365
keywords: w365, Windows 365, Frontline Shared, optimization, costs
lang: en
description: >-
  Learn about the benefits, limitations, and steps to optimize costs with Windows 365 Frontline Shared. Complete tutorial for businesses and IT professionals.
---


 Windows 365 Frontline Shared is a new solution that expands Microsoft's DaaS offering. It provides a temporary virtual machine to users, thus optimizing the cost of Windows 365 for those who do not work on it full-time.

This blog post will explain how to set up Windows 365 Frontline Shared within your organization, detailing each step of the process.

Article Français : lien

# User Settings
This setting does not apply to Windows 365 Frontline Shared machines

# Device Preparation group
Create the group to which apps and policies will be deployed
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/2.png?raw=true)

Add Intune Provisioning Client as an owner

# Device Preparation Policy 
In order to install the apps, apply the configs when provisioning the machine, it is necessary to create a device preparation policy.

1.      Go to Devices > Windows > **Enrollment**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/3.png?raw=true)

2.      Select **Device Preparation Policy**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/4.png?raw=true)

3.      Click **Create > Automatic**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/5.png?raw=true)

4.      Click **Next**

5.      Choose a **name**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/6.png?raw=true)

6.      Click **Next**

7.      Select the **group** you created earlier
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/7.png?raw=true)

8.      Click **Next**

9.      Click **Add** to select the apps and scripts to be applied during provisioning
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/8.png?raw=true)

10.      Click **Add**  for each
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/9.png?raw=true)
Note: Store applications must be in system context otherwise they are not installed during provisioning
11.      Click Save  > **Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/10.png?raw=true)

12.      Click **Next**

13. **Check** that everything is good
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/11.png?raw=true)

14.      Click **Save**

**/!\ ** Don 't forget to assign applications and scripts to the group, adding to the Preparation Policy only defines what needs to be followed.

# Create Provisioning Profile
Now all that's left to do is create the machine provisioning policy, go to Intune > Devices > Windows 356 > **Provisioning Policies**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/12.png?raw=true)

1.      Cliquer sur **Create Policy**

2.      Enter a Name

3.      Select **Frontline > Shared > Microsoft entered Joined**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/13.png?raw=true)

4.      Select **Microsoft Hosted Network** and the **desired region**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/14.png?raw=true)

5.      Check **Single Sign On** and then Click Next

6.      Select the image to use
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/15.png?raw=true)

7.      Click **Next**

8.      Choose the **language** and configure the  **machine name** template

**/! \ ** it is not possible to have a – somewhere other than at the end of the prefix
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/16.png?raw=true)

**/!\ ** The name must be exactly 15 characters long
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/17.png?raw=true)

**/! \ ** the prefix must be a maximum of 7 characters
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/18.png?raw=true)

9.      Then **select** the **readiness policy**, the time allotted and whether the **user can log in in case of failure**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/19.png?raw=true)

10.      Click **Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/20.png?raw=true)

11.      Click **Next**

12. **Select** User Group
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/21.png?raw=true)


13.      Click Select  > **Next**

14.      Select the  CPC **size**, **assignment name**, and **number**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/22.png?raw=true)

15.      Click Select  > **Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/23.png?raw=true)

16.      Check that everything is correct and then click **Create**



# Provisioning du Cloud PC
You can now go to All Cloud PCs and see that provisioning is in progress
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/24.png?raw=true)

Provisioning can take a little over **an hour**, so be patient.
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/25.png?raw=true)

The machine is ready, all that's left to do is **connect**

# 1st connexion
1.      Go to https://windows.cloud.microsoft
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/26
.png?raw=true)

2.      Click on **connect**

 Below you will find the different connection steps which are the same as for an Enterprise or Frontline Dedicated CPC
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/27.png?raw=true)

![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/28.png?raw=true)
The machine is **ready** to use

**/!\ ** It 's a temporary machine, make users aware of how to store their documents on OneDrive

/!\ ** Any file created or modified in the profile will be lost

**/!\ ** Any application installed outside of the Device Preparation Policy will no longer be present at the next connection

Note: the modified files in some sections of the disk are maintained, it may be interesting to hide the C to prevent a user from storing personal data that would be accessible by a person who is not authorized to see them

# Reporting
As the number of simultaneous connections is limited to the number of machines provisioned, it is important to be able to track usage and disconnect a user if necessary

Go to Intune > **Reports**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/29.png?raw=true)

Select **Connected Frontline Cloud**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/30.png?raw=true)

Here we can see that a provisioning profile has reached its **limit**

You can **click** on it to find out more
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/31.png?raw=true)

Here we see that the limit has been waited 2 times during a month

To find out who is logged in, click **Connect**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/32.png?raw=true)

If you want to disconnect one or more users is simple, **select** the CPCs, click on **Bulk device action > Restart**



Contenu de l’article
# Bugs
During my tests I encountered a bug, my machine got stuck during provisioning, adding a machine to the profile unlocked it (failed)

What's strange is that the image change was not taken into account even though it was done before adding a 2nd machine.
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/33.png?raw=true)

![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/34.png?raw=true)

Reprovisioning the two machines solved everything

# Related articles

- [Windows 365 monitoring with PowerShell](/2024/11/01/Windows-365-monitoring-with-PowerShell.html)
- [Proactive Monitoring of Intune and Windows 365 with PowerShell and Microsoft Graph](/2025/07/29/Proactive-Monitoring-of-Intune-and-Windows-365-with-PowerShell-and-Microsoft-Graph.html)
- [Installation et Configuration de Microsoft Tunnel en mode rootless sur Red Hat: Guide Pratique](/2024/11/22/Installation-et-Configuration-de-Microsoft-Tunnel-en-mode-rootless-sur-Red-Hat-Guide-Pratique.html)
