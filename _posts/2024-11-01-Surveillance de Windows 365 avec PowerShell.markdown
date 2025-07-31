---
layout: post
title:  "Surveillance de Windows 365 avec PowerShell"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-monitoring/1.jpg?raw=true"
date:   2024-11-01 21:00:00 +0200
tags: [Windows 365]
keywords: w365, Windows 365, PowerShell, monitoring, surveillance
lang: fr
description: >-
  Tutoriel pour surveiller les connexions et événements d'audit de Windows 365 avec PowerShell et Microsoft Graph. Guide complet pour administrateurs IT.
---


# Introduction
Cet article présente un **outil PowerShell** conçu pour surveiller les connexions sur site et les événements d'audit de Windows 365. Nous expliquerons son utilité, son fonctionnement, et les prérequis nécessaires.

Article in English : [lien](https://ncheymol.github.io/w365/2024/11/01/Windows-365-monitoring-with-PowerShell.html)

---

# Utilité de l'Outil
Cet outil PowerShell permet de :

- **Surveiller les connexions réseau Azure** : Il récupère et affiche les détails des connexions réseau Azure nécessaires lorsque les machines sont hybrides, y compris le statut des vérifications de santé.
- **Surveiller les événements d'audit de provisioning** : Il récupère la fin du provisioning des machines Windows 365 et envoie un email en cas de nouveaux provisionnements de CloudPC.

---

# Section d'Authentification
L'authentification est une étape cruciale pour accéder aux API Microsoft Graph et exécuter des commandes qui nécessitent des autorisations spécifiques. Dans un premier temps, il faut modifier les variables pour qu'elles correspondent à votre contexte.

Ici, l'authentification se fait via une application d'entreprise dans Entra et avec un certificat fourni par la PKI d'entreprise.

```powershell
# Variables
$CertIssuer = "CERTIFICATE_ISSUER" # Placeholder for certificate issuer
$AppId = 'APPLICATION_ID' # Placeholder for application ID
$TenantId = 'TENANT_ID' # Placeholder for tenant ID
$mailaddress = "EMAIL_ADDRESS" # Placeholder for email address
```

Par la suite, le script cherche le certificat correspondant :

```powershell
$Cert = Get-ChildItem Cert:\CurrentUser\My | Where-Object { $_.Issuer.StartsWith("$($CertIssuer)") }
```

Puis se connecte pour obtenir un PRT :

```powershell
Connect-MgGraph -TenantId $TenantId -ClientId $AppId -Certificate $Cert
```

---

# Surveillance des connexions réseau Azure
Cette section du script récupère les informations des connexions réseau Azure pour Windows 365 et affiche les détails des vérifications de santé. Le script suit le déroulé suivant :

1. Une première requête Graph récupère la liste des connecteurs :

    ```powershell
    $uri = "https://graph.microsoft.com/beta/deviceManagement/virtualEndpoint/onPremisesConnections"
    ```

2. Ensuite, pour chaque connecteur, il récupère les détails de son état de santé avec un GET :

    ```powershell
    $uri = "https://graph.microsoft.com/beta/deviceManagement/virtualEndpoint/onPremisesConnections/$($connectorANC.id)?select=healthCheckStatusDetails"
    ```

3. Puis il crée le contenu de l'email en récupérant des sous-objets des réponses avant de l'envoyer si le connecteur n'est pas en bonne santé :

    ```powershell
    $msg = "
        adDomainName: $($connectorANC.adDomainName)
        id: $($connector.id)
        healthCheckStatus: $($connectorANC.healthCheckStatus)
        displayName: $($connectorANC.displayName)
        ...
    "
    ```

Ce code récupère les connexions réseau Azure et affiche des informations telles que le **nom de domaine Active Directory**, l'**ID du connecteur**, le **statut de la vérification de santé** et les **détails de son état de santé**.

---

# Surveillance de la Fin du Provisioning des Machines Windows 365
Cette section du script récupère les événements d'audit récents et envoie un email en cas de nouveaux provisionnements de CloudPC, incluant pour le moment l'ID de la machine et de l'utilisateur.

À terme, il indiquera également d'autres informations importantes comme le profil utilisé, le nom d'utilisateur et pourra même envoyer cette notification à ce dernier ou à son manager.

La première partie requête les logs d'audit depuis 1h correspondant à l'action `UpdateDevicePrimaryUsers` qui est réalisée par Windows 365 à la fin du provisioning :

```powershell
$currentDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
$pastdate = (Get-Date).ToUniversalTime().AddHours(-1).ToString("yyyy-MM-ddTHH:mm:ss.000Z")

$uri = "https://graph.microsoft.com/beta/deviceManagement/auditEvents?`$filter=activityType eq 'UpdateDevicePrimaryUsers ManagedDevice' and activityDateTime gt $pastdate and activityDateTime le $currentdate&`$orderby=activityDateTime desc"
```

Comme pour l'ANC, la variable `$msg` est créée en utilisant les valeurs obtenues.

---

# Prérequis
Avant d'exécuter ce script, assurez-vous d'avoir les prérequis suivants :

- **PowerShell**
- **Modules PowerShell** : Si le module Microsoft.Graph n'est pas installé, le script l'installe.
- **Permissions** : Une application d'entreprise avec les permissions Graph nécessaires et un certificat utilisateur.
- **Outlook** : Outlook doit être installé, lancé et configuré sur votre machine pour que le script puisse envoyer des emails.

---

# Conclusion
Cet outil PowerShell est un moyen efficace de surveiller les environnements Windows 365, en fournissant des alertes en temps réel et des rapports détaillés. En suivant ce guide, vous pouvez configurer et automatiser la surveillance de votre environnement Windows 365.

Le script est disponible sur mon GitHub, vous avez toute la liberté de l'utiliser et de le faire évoluer à votre guise :
[PowerShell/W365/W365-monitoring at master · ncheymol/PowerShell](https://github.com/ncheymol/PowerShell/tree/master/W365/W365-monitoring)

# Articles connexes

- [Découvrez comment optimiser vos coûts avec Windows 365 Frontline Shared](/2025/06/23/D%C3%A9couvrez-comment-optimiser-vos-co%C3%BBts-avec-Windows-365-Frontline-Shared.html)
- [Les meilleures nouveautés Windows 365 du 1er semestre 2025](/2025/08/05/Les%20meilleurs%20nouveaut%C3%A9es%20Windows%20365%20du%201er%20semestre%202025.html)
- [Proactive Monitoring of Intune and Windows 365 avec PowerShell et Microsoft Graph](/2025/07/29/Proactive-Monitoring-of-Intune-and-Windows-365-with-PowerShell-and-Microsoft-Graph.html)