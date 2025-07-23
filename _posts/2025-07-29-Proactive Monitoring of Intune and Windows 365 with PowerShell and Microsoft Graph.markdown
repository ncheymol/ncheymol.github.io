---
title: "Proactive Monitoring of Intune and Windows 365 with PowerShell and Microsoft Graph"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/intune-monitoring.jpeg?raw=true"
date: 2025-07-29
tags: [Intune, Windows 365, PowerShell, Monitoring, Graph API]
lang: en
excerpt: >-
  Discover how to automate proactive monitoring of your Intune connectors, tunnels, ANC, and Windows 365 provisioning with an advanced PowerShell script using Microsoft Graph and Outlook.
---

# Proactive Monitoring of Intune and Windows 365 with PowerShell and Microsoft Graph

> **Author:** Nicolas CHEYMOL  
> **Version:** 3.0 (06/06/2025)  
> **License:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)  
> [GitHub](https://github.com/ncheymol) | [LinkedIn](https://www.linkedin.com/in/ncheymol/)

---

## 🚀 Introduction

Proactive monitoring of Intune and Windows 365 environments is essential to ensure service availability, security, and performance. To address this need, I have developed an advanced PowerShell script that leverages Microsoft Graph and Outlook to automatically monitor the status of connectors, tunnels, ANC, and provisioning operations. The script alerts you in case of anomalies, helping you maintain a healthy environment.

This solution is open source, released under the CC BY-NC 4.0 license, and can be adapted to your specific requirements. 

---

## 🎯 Script Objectives

- **Monitor** the status of Intune connectors (NDES, Tunnel, HDJ, ANC) and Windows 365 provisioning.
- **Alert** automatically by email (via Outlook) based on cinfigured triggers.
- **Notify** only once per day for each incident and once a month for informational email, and clear the alert as soon as the service is healthy again.
- **Generate logs** for auditing and tracking.
- **Leverage Microsoft Graph** to retrieve real-time information.

---

## 🛠️ Main Features

### 1. Variables and Configuration
The script starts by defining the necessary variables: certificate issuer, Azure app and tenant IDs, notification email address, and analysis time window.

### 2. PowerShell Module Management
An `Ensure-Module` function checks and automatically installs the required modules (Microsoft.Graph).

### 3. Sending Emails via Outlook
The `Send-OutlookMail` function allows sending notifications through Outlook, without relying on an external SMTP server.

### 4. Connecting to Microsoft Graph
The `Connect-EntraID` function uses a certificate for secure authentication to Microsoft Graph.

### 5. Connector Monitoring
For each connector type (NDES, Tunnel, HDJ, ANC), a dedicated function queries Microsoft Graph, analyzes the status, and triggers a notification if needed:

- **NDES**: Checks the status and version of certificate connectors.
- **Tunnel**: Monitors the health, load, version, and configuration of Microsoft Tunnel servers.
- **HDJ**: Controls the status of hybrid domain join connectors.
- **ANC (Azure Network Connection)**: Analyzes the health of on-premises connections for Windows 365.

Each alert is associated with a "tag" file to avoid repeated notifications, and this file is deleted as soon as the service is healthy again.

### 6. Windows 365 Provisioning Monitoring
The `Process-W365Provisioning` function detects new Cloud PC provisionings and sends a notification to the concerned user.

### 7. Logging and Auditing
The script logs each execution and keeps a history of alerts and actions performed.

---

## 🖥️ Example Script Structure

```powershell
# Main variables
$CertIssuer = "CERTIFICATE_ISSUER"
$AppId = 'APPLICATION_ID'
$TenantId = 'TENANT_ID'
$mailaddress = "EMAIL_ADDRESS"
$addhours = -0.5

# Check and import required modules
function Ensure-Module { ... }

# Send email via Outlook
function Send-OutlookMail { ... }

# Connect to Microsoft Graph
function Connect-EntraID { ... }

# Connector and provisioning monitoring
function Process-NDESConnectors { ... }
function Process-Tunnel { ... }
function Process-HDJ { ... }
function Process-ANC { ... }
function Process-W365Provisioning { ... }

# Main execution
# ...
```

---

## 🔄 Execution Flow

1. **Check recent logs** to avoid multiple alerts.
2. **Start Outlook** if needed for sending emails.
3. **Connect to Microsoft Graph** with the required modules.
4. **Call monitoring functions** for each connector type and for W365 provisioning.
5. **Stop transcript/logging**.

---

## 📝 History and Updates

- **v1.0**: Script creation.
- **v1.2**: Added tag management to notify only once per day.
- **v3.0**: Refactored to use variables and improve modularity.

---

## 📄 License

This script is published under the [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) license.

> You may reuse, adapt, and share it as long as you credit me as the author and do not use it for commercial purposes.

---

## ✅ Conclusion

With this script, you can automate the monitoring of your Intune and Windows 365 environments, gain responsiveness and reliability, and reduce the risk of undetected incidents.

Feel free to adapt it to your needs and contribute to its improvement! https://github.com/ncheymol/PowerShell/tree/master/Monitoring

For any questions or suggestions, contact me on [GitHub](https://github.com/ncheymol) or [LinkedIn](https://www.linkedin.com/in/ncheymol/). 