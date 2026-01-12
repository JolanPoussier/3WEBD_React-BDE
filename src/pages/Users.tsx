import { Edit2, Search, ShoppingBag, Trash2, UserPlus } from "lucide-react";
import React, { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "../components/UI/Button";
import { PageHeader } from "../components/UI/Card";
import { Input, Select } from "../components/UI/Input";
import { Modal } from "../components/UI/Modal";
import {
  ActionButton,
  Badge,
  StyledTable,
  TableContainer,
} from "../components/UI/Table";
import rawData from "../data.json";
import { Data, User } from "../types";

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

const UsersPage: React.FC = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>(data.utilisateurs);
  const [searchTerm, setSearchTerm] = useState("");
  const [promoFilter, setPromoFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);

  // Extract unique promos for filter
  const promos = useMemo(
    () => [...new Set(users.map((u) => u.promo))].filter(Boolean).sort(),
    [users]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPromo = promoFilter ? user.promo === promoFilter : true;
      return matchesSearch && matchesPromo;
    });
  }, [users, searchTerm, promoFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setIsEditing(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentUser({
      nomComplet: "",
      email: "",
      promo: "",
      codeAdherent: "",
      points: 0,
      estAdmin: false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentUser.id) {
      setUsers(
        users.map((u) => (u.id === currentUser.id ? (currentUser as User) : u))
      );
    } else {
      const newId = Math.max(...users.map((u) => u.id), 0) + 1;
      setUsers([...users, { ...currentUser, id: newId } as User]);
    }
    setIsModalOpen(false);
  };

  const handleOrder = (id: number) => {
    // Placeholder for order functionality
    alert(`Commande pour l'utilisateur ${id} - Fonctionnalité à venir`);
  };

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
          <h1>Liste des Utilisateurs</h1>
          <p>Gérez les adhérents et leurs informations</p>
        </PageHeader>
        <Button onClick={handleAdd}>
          <UserPlus size={20} />
          Nouveau Membre
        </Button>
      </div>

      <FilterBar>
        <SearchContainer>
          <Search size={20} />
          <Input
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </SearchContainer>
        <Select
          value={promoFilter}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPromoFilter(e.target.value)
          }
          style={{ minWidth: "150px" }}
        >
          <option value="">Toutes les promos</option>
          {promos.map((promo) => (
            <option key={promo} value={promo}>
              {promo}
            </option>
          ))}
        </Select>
      </FilterBar>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Promo</th>
              <th>Code Adhérent</th>
              <th>Points</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.nomComplet}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge>{user.promo}</Badge>
                  </td>
                  <td>{user.codeAdherent}</td>
                  <td
                    style={{ fontWeight: "bold", color: theme.colors.primary }}
                  >
                    {user.points}
                  </td>
                  <td>
                    {user.estAdmin ? (
                      <Badge variant="success">Admin</Badge>
                    ) : (
                      <span style={{ color: theme.colors.textSoft }}>-</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <ActionButton
                        onClick={() => handleEdit(user)}
                        title="Éditer"
                      >
                        <Edit2 size={18} />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleOrder(user.id)}
                        title="Commander"
                        color={theme.colors.info}
                      >
                        <ShoppingBag size={18} />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleDelete(user.id)}
                        title="Supprimer"
                        color={theme.colors.danger}
                      >
                        <Trash2 size={18} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>

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
        title={isEditing ? "Éditer le membre" : "Nouveau membre"}
      >
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nom Complet</Label>
            <Input
              type="text"
              required
              value={currentUser.nomComplet || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentUser({ ...currentUser, nomComplet: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={currentUser.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
          </FormGroup>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FormGroup>
              <Label>Promo</Label>
              <Input
                type="text"
                placeholder="ex: M1"
                value={currentUser.promo || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentUser({ ...currentUser, promo: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Code Adhérent</Label>
              <Input
                type="text"
                value={currentUser.codeAdherent || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentUser({
                    ...currentUser,
                    codeAdherent: e.target.value,
                  })
                }
              />
            </FormGroup>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <FormGroup>
              <Label>Points</Label>
              <Input
                type="number"
                value={currentUser.points || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentUser({
                    ...currentUser,
                    points: parseInt(e.target.value) || 0,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Rôle</Label>
              <Select
                value={currentUser.estAdmin ? "admin" : "member"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCurrentUser({
                    ...currentUser,
                    estAdmin: e.target.value === "admin",
                  })
                }
              >
                <option value="member">Membre</option>
                <option value="admin">Administrateur</option>
              </Select>
            </FormGroup>
          </div>

          <Button type="submit" style={{ marginTop: "1rem" }}>
            {isEditing ? "Enregistrer" : "Créer"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
