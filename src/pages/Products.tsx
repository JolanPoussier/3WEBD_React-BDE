import {
  Edit2,
  Package as PackageIcon,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "../components/UI/Button";
import { Card, PageHeader } from "../components/UI/Card";
import { Input, Select } from "../components/UI/Input";
import { Modal } from "../components/UI/Modal";
import { ActionButton, Badge } from "../components/UI/Table";
import rawData from "../data.json";
import { Data, Product } from "../types";
import "./Products.css"; // Importing CSS for styling

const data = rawData as Data;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSoft};
  }

  input {
    padding-left: 2.75rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>(data.produits);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [isEditing, setIsEditing] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.nom
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? product.actif
          : !product.actif;
      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentProduct({ nom: "", prix: 0, actif: true });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && currentProduct.id) {
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id ? (currentProduct as Product) : p
        )
      );
    } else {
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      setProducts([...products, { ...currentProduct, id: newId } as Product]);
    }
    setIsModalOpen(false);
  };

  // (images removed; products displayed as cards with icons)

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <PageHeader>
          <h1>Liste des Produits</h1>
          <p>Gérez le catalogue des snacks et boissons</p>
        </PageHeader>
        <Button onClick={handleAdd}>
          <Plus size={20} />
          Nouveau Produit
        </Button>
      </div>

      <FilterBar>
        <SearchContainer>
          <Search size={20} />
          <Input
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </SearchContainer>
        <Select
          value={statusFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(e.target.value)
          }
          style={{ minWidth: "150px" }}
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </Select>
      </FilterBar>

      <div className="products-container">
        <h2 style={{ marginBottom: "0.5rem" }}>Produits</h2>
        <div className="products-list">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Card key={product.id} className="product-card">
                <div className="product-icon" aria-hidden>
                  <PackageIcon size={56} />
                </div>
                <h3 style={{ fontSize: "1rem", margin: "0.25rem 0" }}>
                  {product.nom}
                </h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <div className="product-price">
                      {product.prix.toFixed(2)}€
                    </div>
                    <div style={{ marginTop: "0.25rem" }}>
                      <Badge variant={product.actif ? "success" : "danger"}>
                        {product.actif ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <ActionButton
                      onClick={() => handleEdit(product)}
                      title="Éditer"
                    >
                      <Edit2 size={18} />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDelete(product.id)}
                      title="Supprimer"
                      color={theme.colors.danger}
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                color: theme.colors.textSoft,
              }}
            >
              Aucun produit trouvé
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <PaginationContainer>
          <span style={{ color: theme.colors.textSoft, fontSize: "0.875rem" }}>
            Page {currentPage} sur {totalPages}
          </span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              style={{ padding: "0.5rem 1rem" }}
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              style={{ padding: "0.5rem 1rem" }}
            >
              Suivant
            </Button>
          </div>
        </PaginationContainer>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Éditer le produit" : "Nouveau produit"}
      >
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nom du produit</Label>
            <Input
              type="text"
              required
              value={currentProduct.nom || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentProduct({ ...currentProduct, nom: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Prix (€)</Label>
            <Input
              type="number"
              step="0.01"
              required
              value={currentProduct.prix || 0}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentProduct({
                  ...currentProduct,
                  prix: parseFloat(e.target.value),
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Statut</Label>
            <Select
              value={currentProduct.actif ? "active" : "inactive"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCurrentProduct({
                  ...currentProduct,
                  actif: e.target.value === "active",
                })
              }
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </Select>
          </FormGroup>

          <Button type="submit" style={{ marginTop: "1rem" }}>
            {isEditing ? "Enregistrer" : "Créer"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
