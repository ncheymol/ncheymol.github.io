---
layout: post
title:  "Hibernation pour Azure Virtual Desktop est désormais disponible"
banner : ""
date:   2024-05-31 21:00:00 +0200
tags: AVD
lang: fr
---

# Hibernation pour Azure Virtual Desktop est désormais disponible

Dans un monde où l'agilité et l'efficacité sont primordiales, les solutions de bureau virtuel comme **Azure Virtual Desktop (AVD)** prennent une importance croissante. Récemment, Microsoft a introduit une fonctionnalité très attendue pour AVD : **le support de l'hibernation**. Cette innovation promet de transformer la manière dont les entreprises gèrent et optimisent leurs ressources informatiques.

## Avantages de l'hibernation pour Azure Virtual Desktop

- **Réduction des coûts** : Lorsqu'une machine virtuelle (VM) entre en hibernation, vous ne payez pas pour les coûts de calcul associés à la VM. Vous payez uniquement pour les coûts de stockage et de réseau associés à la VM.
- **Reprise rapide** : Lorsque la machine virtuelle de l'hôte de session démarre, l'utilisateur peut reprendre rapidement là où il s'était arrêté.
- **Flexibilité** : L'hibernation peut être activée pour les VMs déployées dans des pools d'hôtes personnels et peut être choisie comme action de mise à l'échelle pour la déconnexion ou la fermeture de session.

## Méthodes de configuration

### Déploiement
Vous pouvez activer l'hibernation lors du déploiement des VMs pour vos pools d'hôtes personnels en utilisant :

- le portail Azure
- PowerShell
- CLI
- ARM
- SDKs et APIs

### Plans de mise à l'échelle
Pour activer l'hibernation dans votre plan de mise à l'échelle, vous devrez :

1. Créer un plan de mise à l'échelle personnel
2. Définir si vous souhaitez activer ou désactiver le démarrage de la VM à la connexion
3. Choisir d'effectuer l'hibernation après qu'une session utilisateur a été déconnectée ou fermée pendant une période configurable
4. Assigner un plan de mise à l'échelle personnel à un ou plusieurs pools d'hôtes personnels

## Ressources

- [Cost Optimization for General Purpose VMs using Hibernation now Generally Available - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/azure-virtual-desktop/cost-optimization-for-general-purpose-vms-using-hibernation-now/ba-p/4149642)
- [Create and assign an autoscale scaling plan for Azure Virtual Desktop | Microsoft Learn](https://learn.microsoft.com/en-us/azure/virtual-desktop/autoscale-scaling-plan)
- [Hibernation support now available for Azure Virtual Desktop | Azure Virtual Desktop Blog (microsoft.com)](https://techcommunity.microsoft.com/t5/azure-virtual-desktop-blog/hibernation-support-now-available-for-azure-virtual-desktop/ba-p/4149639)

---

N'hésitez pas à me poser d'autres questions si vous avez besoin d'informations supplémentaires.