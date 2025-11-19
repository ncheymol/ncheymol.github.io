---
title: "Windows 365 AI-enabled : Découverte et retour d'expérience"
banner: "https://github.com/ncheymol/ncheymol.github.io/blob/main/_sources/intune-monitoring.jpeg?raw=true"
date: 2025-11-20
tags: [Intune, Windows 365, AI, PowerShell, Monitoring]
keywords: w365, Windows 365, AI-enabled, nouveautés, 2025, features
lang: fr
description: >-
  Découvrez Windows 365 AI-enabled : ses fonctionnalités, mon retour d'expérience après 2 semaines d'utilisation et comment l'implémenter.
---

# Introduction

Microsoft vient d'annoncer Windows 365 AI-enabled. Venez découvrir ses fonctionnalités, mon retour d'expérience après 2 semaines d'utilisation et comment l'implémenter.

Cette fonctionnalité est toujours en cours de développement, les interfaces sont sujettes à modification régulière et les fonctionnalités vont s'enrichir jusqu'à la disponibilité générale.

---

## Expérience utilisateur de Windows 365 AI-enabled Cloud PCs

### Windows App

Au lancement de l'application, l'utilisateur voit facilement sa ou ses machines étant AI-enabled.

![Windows App - Machines AI-enabled](_sources/W365-AI-enabled/Image1.jpg)

Dans la lignée des fonctionnalités Windows 365 sorties depuis 4 ans, cette nouvelle fonctionnalité reste disponible et fonctionnelle quel que soit le périphérique que vous utilisez pour vous connecter.

Une fois en session, quelques changements sont à noter : la barre de recherche a changé, que ce soit dans la barre de tâches, le menu démarrer ou Windows Explorer, arborant une nouvelle icône.

![Nouvelle icône de recherche](_sources/W365-AI-enabled/Image2.jpg)

Permettant l'accès à la recherche sémantique d'un seul clic.

L'application Click-To-Do apparaîtra également dans le menu démarrer dans la liste des applications recommandées.

![Click-To-Do dans le menu démarrer](_sources/W365-AI-enabled/Image3.jpg)

Le 3e changement, plus discret, sans lequel l'IA ne fonctionnerait pas, est l'installation des 3 composants.

![Composants IA installés](_sources/W365-AI-enabled/Image4.jpg)

⚠️ **Attention** : « Actions par Clic » ou la recherche sémantique peuvent être à première vue disponibles alors que les composants sont encore en cours d'installation. « Actions par Clic » fournira un message indiquant que tout n'est pas encore prêt. Un peu de patience et revenez dans quelques minutes.

![Message d'installation en cours](_sources/W365-AI-enabled/Image5.jpg)

## Click to Do

Maintenant que tout est prêt, explorons les fonctionnalités qui amélioreront votre quotidien.

Comme beaucoup, j'ai horreur des wizards de bienvenue, mais pour une fois, il est plutôt bien fait et permet de vite s'approprier la solution.

Première étape : lancer Click to Do (nécessaire pour l'instant). Ensuite, à chaque fois que vous en aurez besoin, il vous suffira d'utiliser un des raccourcis (Ctrl+M, Ctrl+Clic ou balayer l'écran depuis la droite).

![Raccourcis Click to Do](_sources/W365-AI-enabled/Image6.jpg)

D'expérience, la première et la dernière option sont les plus efficaces.

La première fonctionnalité consiste à rechercher du texte n'importe où sur votre écran, quelle que soit l'application.

![Recherche de texte à l'écran](_sources/W365-AI-enabled/Image7.jpg)

Vous pouvez ensuite le copier ou l'ouvrir directement avec l'application de votre choix.

![Options d'ouverture](_sources/W365-AI-enabled/Image8.jpg)

J'ai maintenant un fichier texte contenant tout le texte capturé.

![Fichier texte créé](_sources/W365-AI-enabled/Image9.jpg)

(Bon, ok, là c'est inutile, à part peut-être une information dont je parlerais dans un prochain article ;)

Microsoft a annoncé d'autres fonctionnalités comme l'édition d'images depuis Explorer ou l'intégration à Copilot pour M365, mais je n'ai pas encore eu l'occasion de tester.

Pour les chanceux présents à San Francisco, allez participer au lab **Windows 365 AI Lab: Improved Windows Search & Click to Do in action**.

## Recherche sémantique

Aujourd'hui, la fonctionnalité IA qui apporte une valeur claire, c'est l'amélioration substantielle de la recherche.

Je recherche un document important, je tape mon mot-clé et en moins d'une seconde j'ai retrouvé le fichier.

Il s'agit d'une image qui n'a aucune métadonnée, envoyée via WhatsApp et enregistrée en local moins d'une minute avant la recherche.

![Résultat de recherche sémantique](_sources/W365-AI-enabled/Image10.jpg)

Instantanément après avoir pris la capture d'écran ci-dessus, le résultat de la recherche s'est mis à jour.

![Mise à jour du résultat](_sources/W365-AI-enabled/Image11.jpg)

Bien entendu, cette fonctionnalité ne fonctionne qu'avec les fichiers locaux, donc à date, tout ce qui est dans OneDrive ou SharePoint et non téléchargé sur le CPC.

## Mise en place et exploitation de Windows 365 AI-enabled

Pour mettre en place la solution, rien de plus simple (une fois les prérequis réunis).

Rendez-vous sur **Intune > Devices > Windows 365 > Settings**.

Créer une stratégie de configuration.

![Création de stratégie](_sources/W365-AI-enabled/Image12.jpg)

Lui donner un nom, activer la fonctionnalité.

![Configuration de la stratégie](_sources/W365-AI-enabled/Image13.jpg)

Puis assigner et créer la stratégie.

### Configurer le CPC sur le canal Insider Beta ou Release Preview

![Configuration du canal](_sources/W365-AI-enabled/Image14.jpg)

Et patienter… plusieurs mises à jour et redémarrages seront nécessaires.

### Suivi de l'activation

Se rendre dans **Reports > Cloud PC Overview**.

![Cloud PC Overview](_sources/W365-AI-enabled/Image15.jpg)

Puis ouvrir le rapport **AI-enabled Cloud PC**.

Vous y verrez tous les CPCs pour lesquels une stratégie AI-enabled est appliquée.

![Rapport AI-enabled Cloud PC](_sources/W365-AI-enabled/Image16.jpg)

Si votre besoin est d'assister un utilisateur, cette information est également disponible directement sur son objet ordinateur.

![Information sur l'ordinateur](_sources/W365-AI-enabled/Image17.jpg)

**Tips** : Durant cette preview, les CPC s'affichaient comme AI-enabled assez rapidement, mais les composants IA peinaient à descendre. Après plus de 24h, mon CPC était bloqué par une autre preview (Oups), j'ai donc fait une restauration. Cette action a réinitialisé une synchronisation avec les services Microsoft, activant la fonctionnalité IA 😊

## Informations complémentaires

Le service n'est disponible que dans certaines régions Azure, mais n'est pas dépendant de la région au moment du provisioning, juste au moment de l'activation. Donc une migration sans aucune perte de données est possible, simple et rapide.
