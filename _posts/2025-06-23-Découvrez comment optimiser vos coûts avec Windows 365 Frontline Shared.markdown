---
layout: post
title:  "Découvrez comment optimiser vos coûts avec Windows 365 Frontline Shared"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/1.jpg?raw=true"
date:   2025-06-23 21:00:00 +0200
tags: W365
lang: fr
description: >-
  Découvrez les avantages, limitations et étapes pour optimiser les coûts avec Windows 365 Frontline Shared. Tutoriel complet pour entreprises et IT pros.
---

Windows 365 Frontline Shared est une nouvelle solution venant étoffer l’offre DaaS de Microsoft. Elle permet de fournir une machine virtuelle temporaire aux utilisateurs et d’optimiser le coût de Windows 365 pour des utilisateurs ne travaillant pas dessus à plein temps.

Dans cet article de blog, nous allons expliquer comment mettre en place W365 Frontline Shared pour votre organisation, en détaillant chaque étape du processus.

[Article in English](https://ncheymol.github.io/w365/2025/06/23/Learn-how-to-optimize-your-costs-with-Windows-365-Frontline-Shared.html)

# User Settings
Ce paramétrage ne s’applique pas aux machines Windows 365 Frontline Shared

# Device Preparation group
Créer le groupe sur lequel les apps et policies seront déployées
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/2.png?raw=true)

Ajouter Intune Provisioning Client en tant que propriétaire

# Device Preparation Policy
Afin d’installer les apps, appliquer les configs lors du provisioning de la machine, il est nécessaire de créer une device preparation policy.

1. Aller dans Devices > Windows > **Enrollment**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/3.png?raw=true)

2. Sélectionner **Device Preparation Policy**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/4.png?raw=true)

3. Cliquer sur **Create > Automatic**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/5.png?raw=true)

4. Cliquer sur **Next**

5. Choisir un nom puis cliquer sur **Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/6.png?raw=true)

6. Cliquer sur **Next**

7. Sélectionner le groupe créé auparavant
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/7.png?raw=true)

8. Cliquer sur **Next**

9. Cliquer sur **Add** pour sélectionner les apps et scripts devant être appliquées durant le provisioning
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/8.png?raw=true)

10. Cliquer sur **Add** pour chaque application à installer
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/9.png?raw=true)
Note : Les applications du Store doivent être en contexte système sinon elles ne seront pas installées lors du provisioning.
11. Cliquer sur **Save > Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/10.png?raw=true)

12. Cliquer sur **Next**

13. Vérifier que tout est bon
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/11.png?raw=true)

14. Cliquer sur **Save**

/ ! \ Ne pas oublier d’assigner les applications et les scripts au groupe, l’ajout dans la preparation policy ne fait que définir ce qui doit être suivi.

# Create Provisioning Profile
Maintenant il ne reste plus qu’à créer la politique de provisionnement des machines, aller dans Intune > Devices > Windows 356 > **Provisioning Policies**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/12.png?raw=true)

1. Cliquer sur **Create Policy**

2. Entrer un nom

3. Sélectionner **Frontline > Shared > Microsoft Entra Joined**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/13.png?raw=true)

4. Sélectionner **Microsoft Hosted Network** ainsi que la région souhaitée
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/14.png?raw=true)

5. Cocher **Single Sign On** puis cliquer sur **Next**

6. Sélectionner l’image à utiliser
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/15.png?raw=true)

7. Cliquer sur **Next**

8. Choisir la langue et configurer le template de nom de machine

/ ! \ Il n’est pas possible d’avoir un – autre part qu’à la fin du préfixe
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/16.png?raw=true)

/ ! \ Le nom doit faire exactement 15 caractères
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/17.png?raw=true)

/ ! \ Le préfixe doit faire maximum 7 caractères
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/18.png?raw=true)

9. Ensuite sélectionner la politique de préparation, le temps alloué et si l’utilisateur peut se connecter en cas d’échec
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/19.png?raw=true)

10. Cliquer sur **Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/20.png?raw=true)

11. Cliquer sur **Next**

12. Sélectionner le groupe d’utilisateurs
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/21.png?raw=true)

13. Cliquer sur **Select > Next**

14. Sélectionner la taille de CPC, le nom de l’assignement ainsi que le nombre
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/22.png?raw=true)

15. Cliquer sur **Select > Next**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/23.png?raw=true)

16. Vérifier que tout est correct puis cliquer **Create**


# Provisioning du Cloud PC
Vous pouvez maintenant aller dans All Cloud PCs et voir que le provisioning est en cours
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/24.png?raw=true)

Le provisioning peut mettre un peu plus d’une heure, patientez.
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/25.png?raw=true)

La machine est prête, il ne reste plus qu’à se connecter

# 1ère connexion
1. Se rendre sur https://windows.cloud.microsoft
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/26.png?raw=true)

2. Cliquer sur **connecter**

Vous retrouverez ci-dessous les différentes étapes de connexion qui sont les mêmes que pour un CPC Enterprise ou Frontline Dedicated
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/27.png?raw=true)

![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/28.png?raw=true)
La machine est **prête** à être utilisée

/ ! \ C’est une machine temporaire, bien sensibiliser les utilisateurs à bien stocker leurs documents sur OneDrive

/ ! \ Tout fichier créé ou modifié dans le profil sera perdu

/ ! \ Toute application installée en dehors de la device preparation policy ne sera plus présente à la connexion suivante

Note : Les fichiers modifiés dans certaines sections du disque sont maintenus, il peut être intéressant de masquer le C pour éviter qu’un utilisateur stocke des données personnelles qui seraient accessibles par une personne non habilitée à les voir

# Reporting
Le nombre de connexions simultanées étant restreint au nombre de machines provisionnées, il est important de pouvoir suivre l’usage et déconnecter un utilisateur au besoin

Aller dans Intune > **Reports**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/29.png?raw=true)

Sélectionner **Connected Frontline Cloud**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/30.png?raw=true)

Ici on peut voir qu’un profil de provisioning a atteint sa **limite**

On peut cliquer dessus pour en savoir plus
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/31.png?raw=true)

Ici on constate que la limite a été atteinte 2 fois au cours d’un mois

Pour savoir qui est connecté, cliquer sur **Connecter**
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/32.png?raw=true)

Si vous souhaitez déconnecter un ou plusieurs utilisateurs, c’est simple, sélectionnez les CPC, cliquez sur **Bulk device action > Restart**


# Bugs
Lors de mes tests j’ai rencontré un bug, ma machine est restée bloquée en cours de provisioning, ajouter une machine au profil l’a débloquée (passage en failed)

Ce qui est étrange c’est que le changement d’image n’a pas été pris en compte alors qu’il a été fait avant d’ajouter une 2ème machine.
![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/33.png?raw=true)

![](https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/w365-Shared/34.png?raw=true)

Le reprovisioning des deux machines a tout résolu

# Articles connexes

- [Les meilleures nouveautés Windows 365 du 1er semestre 2025](/2025/08/05/Les%20meilleurs%20nouveaut%C3%A9es%20Windows%20365%20du%201er%20semestre%202025.html)
- [Surveillance de Windows 365 avec PowerShell](/2024/11/01/Surveillance-de-Windows-365-avec-PowerShell.html)
- [Proactive Monitoring of Intune and Windows 365 avec PowerShell et Microsoft Graph](/2025/07/29/Proactive-Monitoring-of-Intune-and-Windows-365-with-PowerShell-and-Microsoft-Graph.html)
