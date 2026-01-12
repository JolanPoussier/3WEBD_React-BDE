export interface Statistics {
  totalVentes: number;
  totalDepense: number;
  benefice: number;
  nombreClients: number;
  nombreCommandes: number;
  nombreProduits: number;
  produitPlusVendu: {
    nom: string;
    quantite: number;
  };
  heureMoyenneCommande: string;
  moyenneEurosParCommande: number;
  meilleurePromo: string;
}

export interface PaymentDistribution {
  type: string;
  pourcentage: number;
  [key: string]: string | number;
}

export interface MonthlySale {
  mois: string;
  montant: number;
  [key: string]: string | number;
}

export interface User {
  id: number;
  nomComplet: string;
  email: string;
  promo: string;
  codeAdherent: string;
  points: number;
  estAdmin: boolean;
}

export interface Product {
  id: number;
  nom: string;
  prix: number;
  actif: boolean;
  image?: string;
}

export interface FidelityCard {
  nombreTampons: number;
  recompense: string;
}

export interface TopClientCommandes {
  nom: string;
  nombreCommandes: number;
}

export interface TopClientProduits {
  nom: string;
  nombreProduits: number;
}

export interface TopClients {
  parCommandes: TopClientCommandes[];
  parProduits: TopClientProduits[];
}

export interface Order {
  id: number;
  client: string;
  produits: string;
  date: string;
  montant: number;
  statut: string;
}

export interface Data {
  statistiques: Statistics;
  repartitionPaiements: PaymentDistribution[];
  ventesParMois: MonthlySale[];
  utilisateurs: User[];
  produits: Product[];
  carteFidelite: FidelityCard;
  topClients: TopClients;
  commandes: Order[];
}
