---
layout: post
title:  "Windows 365 monitoring with PowerShell"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-monitoring/1.jpg?raw=true"
date:   2024-11-01 21:00:00 +0200
categories: W365
lang: en
---


## Introduction
This article presents a **PowerShell tool** designed to monitor on-premises connections and audit events for Windows 365. We will explain its utility, functionality, and the necessary prerequisites.

Article en Français : [lien](https://ncheymol.github.io/w365/2024/11/01/Surveillance-de-Windows-365-avec-PowerShell.html)

---

## Utility of the Tool

This PowerShell tool allows you to:

- **Monitor Azure Network Connections**: Retrieves and displays details of Azure network connections necessary when machines are hybrid, including the status of health checks.
- **Monitor Provisioning Audit Events**: Retrieves the end of the provisioning process for Windows 365 machines and sends an email in case of new CloudPC provisions.

---

## Authentication Section

Authentication is a crucial step to access Microsoft Graph APIs and execute commands that require specific permissions. First, you need to modify the variables to match your context.

Here, authentication is done via an enterprise application in Entra and with a certificate provided by the enterprise PKI.

```powershell
# Variables
$CertIssuer = "CERTIFICATE_ISSUER" # Placeholder for certificate issuer
$AppId = 'APPLICATION_ID' # Placeholder for application ID
$TenantId = 'TENANT_ID' # Placeholder for tenant ID
$mailaddress = "EMAIL_ADDRESS" # Placeholder for email address
```

Next, the script searches for the corresponding certificate:

```powershell
$Cert = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Issuer.StartsWith("$($CertIssuer)") }
```

Then it connects to obtain a PRT:

```powershell
Connect-MgGraph -TenantId $TenantId -ClientId $AppId -Certificate $Cert
```

---

## Monitoring Azure Network Connections

This section of the script retrieves information about Azure network connections for Windows 365 and displays the details of health checks. The script follows this sequence:

1. A Graph request retrieves the list of connectors:

    ```powershell
    $uri = "https://graph.microsoft.com/beta/deviceManagement/virtualEndpoint/onPremisesConnections"
    ```

2. For each connector, it retrieves the health status details with a GET request:

    ```powershell
    $uri = "https://graph.microsoft.com/beta/deviceManagement/virtualEndpoint/onPremisesConnections/$($connectorANC.id)?select=healthCheckStatusDetails"
    ```

3. It then creates the email content by retrieving sub-objects from the responses before sending it if the connector is not healthy:

    ```powershell
    $msg = "
        adDomainName: $($connectorANC.adDomainName)
        id: $($connector.id)
        healthCheckStatus: $($connectorANC.healthCheckStatus)
        displayName: $($connectorANC.displayName)
        ...
    "
    ```

This code retrieves Azure network connections and displays information such as the **Active Directory domain name**, **connector ID**, **health check status**, and **health status details**.

---

## Monitoring the End of W365 Machine Provisioning

This section of the script retrieves recent audit events and sends an email in case of new CloudPC provisions, currently including the machine and user IDs.

*In the future, it will also indicate other important information such as the profile used, the username, and may even send this notification to the user or their manager.*

The first part queries the audit logs from the past hour corresponding to the `UpdateDevicePrimaryUsers` action performed by Windows 365 at the end of provisioning:

```powershell
$currentDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$pastdate = (Get-Date).ToUniversalTime().AddHours(-1).ToString("yyyy-MM-ddTHH:mm:ss.000Z")

$uri = "https://graph.microsoft.com/beta/deviceManagement/auditEvents?`$filter=activityType eq 'UpdateDevicePrimaryUsers ManagedDevice' and activityDateTime gt $pastdate and activityDateTime le $currentdate&`$orderby=activityDateTime desc"
```

As with the ANC, the `$msg` variable is created using the obtained values.

---

## Prerequisites

Before running this script, ensure you have the following prerequisites:

- **PowerShell**
- **PowerShell Modules**: If the Microsoft.Graph module is not installed, the script will install it.
- **Permissions**: An enterprise application with the necessary Graph permissions and a user certificate.
- **Outlook**: Outlook must be installed, running, and configured on your machine for the script to send emails.

---

## Conclusion

This PowerShell tool is an effective way to monitor Windows 365 environments, providing real-time alerts and detailed reports. By following this guide, you can configure and automate the monitoring of your Windows 365 environment.

> The script is available on my GitHub, and you are free to use and evolve it as you see fit.  
> [PowerShell/W365/W365-monitoring at master · ncheymol/PowerShell](https://github.com/ncheymol/PowerShell/tree/master/W365/W365-monitoring)

I hope you find this article useful. If you have any questions or suggestions, feel free to share them in the comments!