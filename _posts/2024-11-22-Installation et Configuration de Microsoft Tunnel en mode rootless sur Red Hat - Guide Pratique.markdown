---
layout: post
title:  "Installation et Configuration de Microsoft Tunnel en mode rootless sur Red Hat: Guide Pratique"
banner : "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/tunnel/banner.png?raw=true"
date:   2025-06-23 21:00:00 +0200
tags: Intune
lang: fr
---

# Introduction

Microsoft Tunnel est une solution VPN pour mobiles qui permet de connecter ces derniers aux applications internes de l'entreprise. Ce guide pratique décrit les étapes nécessaires pour installer et configurer Microsoft Tunnel, y compris les prérequis matériels et logiciels.

En mode rootless, le script d’installation de Microsoft Tunnel crée un utilisateur `mstunnel` et applique les ACL nécessaires pour faire fonctionner la solution.

---

# Prérequis Matériels et Logiciels

## Infrastructure

Pour l'infrastructure de production, les serveurs suivants sont requis :

- 2 serveurs derrière un load balancer

Le load balancer doit être configuré avec le binding sur l’adresse IP publique des clients.

> **Remarque :** L’interception SSL n’est pas supportée.

**Spécifications matérielles pour 5000 clients :**

- Processeur : 1 socket - 8 cœurs/socket
- Mémoire : 8,096 MB
- Réseau : Ethernet 1 GB

---

# Installation et Configuration des Prérequis

## Vérification de la Configuration Matérielle

Exécutez les commandes suivantes pour vérifier la configuration matérielle :

```bash
# Vérifier le nombre de processeurs
cat /proc/cpuinfo | less | grep processor

# Vérifier la RAM
free -m

# Vérifier l’espace disque
df -h
```

> **Remarque :** en mode rootless, les conteneurs podman seront stockés dans `/home/mstunnel`

## Configuration du Proxy

Pour configurer le proxy, exécutez les commandes suivantes :

```bash
sudo vi /etc/profile.d/http_proxy.sh
```
Ajoutez les lignes suivantes :

```bash
export http_proxy=[URL]
export https_proxy=[URL]
export no_proxy="127.0.0.1,localhost,contoso.net,192.168.1.0/24"
```

Pour sauvegarder tapez :

```
:w
:qa
```

Exécutez ensuite :

```bash
export http_proxy=[URL]
export https_proxy=[URL]
export no_proxy="127.0.0.1,localhost,contoso.net,192.168.1.0/24"
```

Vérifiez si le port est configuré avec SELinux :

```bash
sudo semanage port -l | grep 8080
```

Si la ligne ci-dessus n'apparaît pas, exécutez :

```bash
sudo semanage port -m -t http_port_t -p tcp 8080
```

Modifiez sudoers :

```bash
sudo visudo
```
Ajoutez à la fin :

```
Defaults env_keep+="http_proxy https_proxy no_proxy"
```

- Si `Default use_pty` est présent, commentez la ligne en ajoutant un `#` au début
- Si `Defaults  requiretty` est présent, modifiez en `Defaults  !requiretty`

Pour sauvegarder :

```
Ctrl+C
:w
:qa!
```

---

## Préparation de l'OS

Exécutez les commandes suivantes pour préparer l'OS :

```bash
sudo chmod +w /etc/sysctl.d/99-sysctl.conf
sudo vi /etc/sysctl.d/99-sysctl.conf
```
Ajoutez les lignes suivantes :

```
net.ipv4.ip_forward = 1
vm.swappiness = 0
vm.overcommit_memory = 1
user.max_user_namespaces = 15076
net.core.somaxconn = 8192
net.netfilter.nf_conntrack_acct = 1
net.netfilter.nf_conntrack_timestamp = 1
net.ipv4.ip_unprivileged_port_start = 443
```

Pour sauvegarder tapez :

```
Ctrl+C
:qa
```

Pour vérifier la configuration, exécutez :

```bash
sudo sysctl -p
```

Certains composants peuvent ne pas être installés par défaut sur votre image, vous pouvez les installer via :

```bash
sudo yum install wget
sudo yum install lsof
```

---

# Procédure d'Installation de l'Application

## Installation de Podman

```bash
sudo yum install podman
```

---

## Création de la Configuration du Serveur Tunnel

1. Depuis le portail Manager, Microsoft Endpoint Manager Portal, allez dans le nœud **Tenant administration > Microsoft Tunnel Gateway**
2. Allez dans **Server Configuration** et cliquez sur **Create new**
3. Entrez le nom `Tunnel Prod Server Configuration` et cliquez sur **Next**
4. Remplissez les informations nécessaires et cliquez sur **Next**
5. Revoyez et cliquez sur **Create**

---

## Création d'un Site Tunnel

1. Depuis le portail Manager, Microsoft Endpoint Manager Portal, allez dans le nœud **Tenant administration > Microsoft Tunnel Gateway**
2. Allez dans **Sites** et cliquez sur **Create**
3. Entrez le nom `Tunnel Prod Site` et cliquez sur **Next**
4. Entrez le FQDN : `tunnelProd.contoso.com`
5. Sélectionnez la configuration du serveur et désactivez la mise à jour automatique, puis cliquez sur **Next**
6. Vérifiez et cliquez sur **Create**

---

# Préparation de la vérification

Téléchargez et exécutez l'utilitaire de vérification :

```bash
wget --output-document=mst-readiness https://aka.ms/microsofttunnelready
chmod u+x ./mst-readiness
sudo ./mst-readiness network
```

Analysez le fichier de sortie si des erreurs sont détectées :

```bash
./mst-readiness network > mst.readiness.txt
```

Chargez les tables IP :

```bash
lsmod | grep ip_tables
sudo /sbin/modprobe ip_tables
echo ip_tables > /etc/modules-load.d/mstunnel_ip_tables.conf
```

Configurez TUN :

```bash
sudo /sbin/modprobe tun
lsmod | grep tun
echo tun > /etc/modules-load.d/mstunnel_tun.conf
```

Exécutez l'utilitaire de vérification des utilitaires :

```bash
sudo ./mst-readiness utils
```

> **Aucune réponse ne devrait être retournée, indiquant que la vérification est réussie.**

---

# Installation de Ms-tunnel

Pour installer Ms-tunnel, exécutez les commandes suivantes :

```bash
wget --output-document=mstunnel-setup https://aka.ms/microsofttunneldownload
chmod u+x ./mstunnel-setup
sudo mst_rootless_mode=1 ./mstunnel-setup
```

- Suivez les instructions à l'écran, en appuyant sur Enter jusqu'à la fin de l'accord. Tapez `q`
- Écrire `yes` puis appuyez sur Entrer pour accepter les conditions
- Écrire `no` puis appuyez sur Enter

Copiez le certificat :

```bash
sudo cp ./tunnelprod.pfx /etc/mstunnel/private/site.pfx
```

Relancez le script :

```bash
sudo ./mstunnel-setup
```

- Vérifiez que l'installation est rootless. Tapez `yes` et appuyez sur Enter
- Tapez `yes` puis appuyez sur Enter
- Entrez le mot de passe du certificat et appuyez sur Enter
- Depuis votre poste de travail allez sur [aka.ms/devicelogin](https://aka.ms/devicelogin) et connectez-vous avec un compte administrateur global (lui affecter une licence Intune auparavant)

---

# Configuration de Profil Intune

## iOS

Pour configurer le profil VPN sur iOS, suivez les étapes suivantes :

1. Allez sur Intune et allez dans **Devices > iOS > Configuration Profiles**
2. Cliquez sur **Create > New Policy**, sélectionnez **Template > VPN** et cliquez sur **Create**
3. Entrez le nom et cliquez sur **Next**
4. Sélectionnez **Connection type > Microsoft Tunnel**, remplissez le nom de la connexion
5. Ajoutez toutes les URLs nécessaires pour déclencher le VPN sous **Safari URLs**

Pour autoriser les applications à utiliser le VPN, allez sur chaque assignement d’application et sélectionnez le VPN

## Android

Pour configurer le profil VPN sur Android, suivez les étapes suivantes :

1. Créez le profil VPN pour Android
2. Dans **Connection Type** sélectionnez **Microsoft Tunnel**
3. Dans **connection name** entrez un contoso
4. Dans la rubrique **Per-App VPN** cliquez sur **Add** et sélectionnez les applications qui nécessitent le VPN
5. Sous **Always-on VPN** sélectionnez **Enable**
6. Sous **Custom Settings** les valeurs ci-dessous si vous n’utilisez pas Defender en tant que MTD

| Configuration key | Value type | Configuration value |
|-------------------|------------|--------------------|
| Vpn               | integer    | 1                  |
| Antiphishing      | integer    | 0                  |
| defendertoggle    | integer    | 0                  |

---

# App Configuration Policies

## iOS

Pour configurer une politique de configuration d'application pour activer uniquement le VPN sur Microsoft Defender pour iOS, suivez les étapes suivantes :

1. Créez une politique de configuration d'application.
2. Sélectionnez **Microsoft Defender**.
3. Configurez la politique pour n'activer que le VPN si vous n’utilisez pas Defender en tant que MTD.

| Configuration key                        | Value type | Configuration value |
|------------------------------------------|------------|--------------------|
| TunnelOnly                               | string     | true               |
| WebProtection                            | string     | false              |
| AutoOnboard                              | string     | true               |
| DefenderNetworkProtectionEnable           | string     | false              |

## Android

Pour configurer une politique de configuration d'application pour activer uniquement le VPN sur Microsoft Defender pour Android, suivez les étapes suivantes :

1. Créez une politique de configuration d'application.
2. Sélectionnez **Microsoft Defender**.
3. Configurez la politique pour n'activer que le VPN si vous n’utilisez pas Defender en tant que MTD.

| Configuration key                  | Value type | Configuration value         |
|------------------------------------|------------|----------------------------|
| Microsoft Defender in Personnal    | integer    | 0                          |
| Microsoft Defender                 | integer    | 0                          |
| Enable Network Protection          | integer    | 0                          |
| Low touch onboarding               | integer    | 1                          |
| Anti-Phishing                      | integer    | 0                          |
| VPN                                | integer    | 1                          |
| User UPN                           | string     | {{userprincipalname}}       |

---

# Composants de tunnel

Mstunnel comprend son propre service de monitoring `mstunnel_monitor` qui redémarre les conteneurs en cas de problème.

Le conteneur **Agent** pilote les mises à jour, la surveillance de la configuration et le reporting auprès d’Intune. Le conteneur **Server** réceptionne les connexions des clients.