import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { PageHeader } from "../components/UI/Card";
import { Input } from "../components/UI/Input";
import { Badge, StyledTable, TableContainer } from "../components/UI/Table";
import rawData from "../data.json";
import { Data, Order } from "../types";

const data = rawData as Data;

const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

const OrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>(data.commandes || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.client.toLowerCase().includes(searchLower) ||
        order.id.toString().includes(searchLower) ||
        order.statut.toLowerCase().includes(searchLower)
      );
    });
  }, [orders, searchTerm]);

  return (
    <div>
      <PageHeader>
        <h1>Historique des Commandes</h1>
        <p>Suivi des achats effectués sur la plateforme</p>
      </PageHeader>

      <FilterBar>
        <SearchContainer>
          <Search size={20} />
          <Input
            placeholder="Rechercher une commande (ID, Client, Statut)..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </SearchContainer>
      </FilterBar>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Produits</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.client}</td>
                  <td>{order.produits}</td>
                  <td>{order.date}</td>
                  <td>{order.montant}€</td>
                  <td>
                    <Badge>{order.statut}</Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#64748b",
                  }}
                >
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default OrdersPage;
