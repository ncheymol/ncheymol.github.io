---
layout: post
title: "How to deploy ConfigMgr client using Intune and Autopilot"
date:   2020-08-19 21:00:00 +0200
tags: [Autopilot, Intune, ConfigMgr]
lang: en
description: >-
  Step-by-step guide to deploying the ConfigMgr client using Intune and Autopilot, including common issues and solutions for modern device management.
---

I've wanted to write an article for a long time but didn't have enough. I tried a few time but never finished them, now it's time and hope it will be helpful.

## Common Issues When Deploying the ConfigMgr Client with Intune and Autopilot

If you have tried to deploy the ConfigMgr client using Intune you might have encountered some or all of the following issues:

1. **Deploying as a Line of Business app (MSI) can break the Autopilot process when deploying Win32 applications as well**
2. **Deploying the MSI doesn't ensure that the client will be available at the end of the process**
3. **CMG authentication**
   - Using AAD Authentication for the CMG, the client cannot be installed during the computer step
   - Using a certificate, computer needs to have its target name before requesting the certificate
4. **Once installed, the ConfigMgr client keeps all workloads on premise which can block the autopilot process**

---

## Solution Overview

The solution is "simple", well after some trials, errors and new problems I might have found the solution.

### 1. Packaging as Win32 App

> Deploying as a Line of Business app (MSI) can break the Autopilot process when deploying Win32 applications as well

Packaging it as a win32 app solves that problem but now you have an installation that is executing in background out of the Intune process. The MSI doesn't really install the client but rather a process that will handle the installation.

To handle that new problem, you can install the client using `ccmsetup.exe` and the `/noservice` argument. Unfortunately at the first issue it will fail when the MSI will try again.

Let's stay with the MSI packaged as a Win32 application with a PowerShell script which will look like that:

```powershell
Start-Process msiexec -Wait -ArgumentList '/i ccmsetup.msi /q CCMSETUPCMD="CCMHOSTNAME=CMG.CLOUDAPP.NET/CCM_Proxy_MutualAuth/<id> SMSSiteCode=P01 SMSMP=mp.ad.local AADTENANTID=11111111-1111-1111-1111-111111111111 AADCLIENTAPPID=22222222-2222-2222-2222-222222222222 AADRESOURCEURI=https://ConfigMgr /nocrlcheck"'
timeout 10
Wait-Process -Name ccmsetup
```

---

### 2. Ensuring Client Availability

> Deploying the MSI doesn't ensure that the client will be available at the end of the process

With the previous solution you are now certain that ccmsetup ended, you can make sure the client is installed thanks to the detection method based on the CcmExec service executable:

- **Path**: `C:\Windows\CCM\`
- **File or Folder**: `CcmExec.exe`
- **Detection Method**: String (Version)
- **Operator**: Greater than or Equal to
- **Value**: `5.0.8968.1000`

That would work but it's always nice to report the exit code, to do so you have to parse the log to extract it. I've written a few lines that I added at the end of the installation script.

```powershell
#Get the log content
$log = get-content "C:\Windows\ccmsetup\Logs\ccmsetup.log" | select-string $string

#Filter the log to get only exit entries
$string = "CcmSetup is exiting with return code "

#Select last entry
$exitlog = $1.Item(($1.Count)-1)

#split to extract the exit code
$split = (($exitlog -split "]").Item(0)).split(" ")
$ccmsetup_exitcode = $split.item(($split.Count)-1)

exit $ccmsetup_exitcode
```

---

### 3. CMG Authentication

The issue with having a certificate with the right computername is easy to manage, create a dynamic group based on the computername and assign the certificate enrolment profile to that group.

To make sure the computer has the correct certificate or an AAD token, the ConfigMgr client needs to be installed with a logged-on user. The easiest way is to target the ConfigMgr client to the users.

Unfortunately, doing so works only if the users do not have multiple types of PC on your tenant (BYOD, Cloud Managed, Co-managed legacy with OSD+GPO and Autopilot co-managed)

During the computer phase the ESP is running under the account `defaultuser0` with the process `WWAHost`. I've added a quick script as a requirement to check that the process isn't running with that account:

```powershell
$result = ((Get-Process -Name WWAHost -IncludeUserName -ErrorAction SilentlyContinue).UserName | select-string defaultuser0) -ne $null
write-output $result
```

The output should be a Boolean not equals to Yes.

---

### 4. Workloads Remain On-Premises

> Once installed, the ConfigMgr client keeps all workloads on prem which can block the autopilot process

That issue was a hassle at first, but now that I use a PowerShell to install the client I just need to modify the right parameter on the computer. And also I found an article on byteben.com that describes which key/value and what data corresponds to what (link at the end).

I want all my workloads to be on Intune during the process so I stop the C

have to modify `CoManagementFlags` under `HKLM\Software\Microsoft\CCM`

I now add the following to my script:

```powershell
#region stopccmexec
# Stop CcmExec to prevent conflict between Intune and SCCM Deployments
if ($ccmsetup_exitcode -eq "0")
    {
    stop-Service -Name CcmExec
    $args = @(
    -command
    'Do {timeout 60} While ((Get-Process -Name WWAHost).Responding -eq $true) Start-Service -Name CcmExec ; timeout 60 ; reg add  HKLM\SOFTWARE\Microsoft\CCM /v CoManagementFlags /t REG_QWORD /f /d 255')
    # Restart CCMExec Once the ESP has ended
    Start-Process -FilePath powershell.exe -ArgumentList $args
    }
#endregion stopccmexec
```

---

## Complete Working Script

Now that you have all the pieces, here is the working script:

```powershell
Start-Transcript -Path "C:\Windows\Logs\CcmSetup.msi.ps1.log"
Write-Host (Get-Date)
#region Install
Start-Process msiexec -Wait -ArgumentList '/i ccmsetup.msi /q CCMSETUPCMD="CCMHOSTNAME=CMG.CLOUDAPP.NET/CCM_Proxy_MutualAuth/<id> SMSSiteCode=P01 SMSMP=mp.ad.local AADTENANTID=11111111-1111-1111-1111-111111111111 AADCLIENTAPPID=22222222-2222-2222-2222-222222222222 AADRESOURCEURI=https://ConfigMgr /nocrlcheck"'

Do {timeout 10} While ((Get-Service -Name ccmsetup -ErrorAction SilentlyContinue) -ne $null)
Write-Host (Get-Date)
timeout 10
#endregion install

#region Parselogs
#Filter the log to get only exit entries
$string = "CcmSetup is exiting with return code "

#Get the log content
$log = get-content "C:\Windows\ccmsetup\Logs\ccmsetup.log" | select-string $string

#Select last entry
$exitlog = $log.Item(($log.Count)-1)

#split to extract the exit code
$split = (($exitlog -split "]").Item(0)).split(" ")
$ccmsetup_exitcode = $split.item(($split.Count)-1)
#endregion parselogs

#region stopccmexec
# Stop CcmExec to prevent conflict between Intune and SCCM Deployments
Write-Host (Get-Date)
if (($ccmsetup_exitcode -eq "0") -or ($ccmsetup_exitcode -eq "7"))
    {
    stop-Service -Name CcmExec -Verbose
    #move workloads to Intune
    reg add  HKLM\SOFTWARE\Microsoft\CCM /v CoManagementFlags /t REG_QWORD /f /d 255
    $ErrorActionPreference = "SilentlyContinue"
    $arguments = @(
    "-command"
    'Do {timeout 60} While ((Get-Process -Name WWAHost).Responding -eq $true) Start-Service -Name CcmExec -verbose;  Timeout 240; Invoke-WMIMethod -ComputerName $env:computername -Namespace root\ccm -Class SMS_CLIENT -Name TriggerSchedule "{00000000-0000-0000-0000-000000000021}"; timeout 1200; reg add  HKLM\SOFTWARE\Microsoft\CCM /v CoManagementFlags /t REG_QWORD /f /d 255 >> C:\Windows\Logs\CcmSetup.msi.ps1.log')
    $arguments
    # Restart CCMExec Once the ESP has ended
    $ErrorActionPreference = "Continue"
    Start-Process -FilePath "c:\windows\sysnative\windowspowershell\v1.0\powershell.exe" -ArgumentList $arguments
    }
#endregion stopccmexec

Write-Host $ccmsetup_exitcode
Write-Host (Get-Date)
Stop-Transcript

exit $ccmsetup_exitcode
```

---

Unfortunately I have 2 small issues remaining:

- Workloads take a long time to move back to Intune and the registry key is almost always overwritten.
- The ESP doesn't track my ConfigMgr client installation for some reason.

---

## Useful links

- [Co-management series – Merging the Perimeter (part 7) – Co-management capabilities](https://byteben.com/bb/co-management-series-merging-the-perimeter-part-7-co-management-capabilities/)
- [My PowerShell GitHub](https://github.com/ncheymol/PowerShell)
- [Microsoft Endpoint Manager](https://endpoint.microsoft.com/)

# Related articles

- [Proactive Monitoring of Intune and Windows 365 with PowerShell and Microsoft Graph](/2025/07/29/Proactive-Monitoring-of-Intune-and-Windows-365-with-PowerShell-and-Microsoft-Graph.html)
- [Installation et Configuration de Microsoft Tunnel en mode rootless sur Red Hat: Guide Pratique](/2024/11/22/Installation-et-Configuration-de-Microsoft-Tunnel-en-mode-rootless-sur-Red-Hat-Guide-Pratique.html)