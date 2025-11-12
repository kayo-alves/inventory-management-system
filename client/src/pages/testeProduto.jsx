import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ProductsTable from '../components/ProductsTable'
import ProductCreateModal from '../components/ProductCreateModal'; // Importe o modal
import "./TesteProduto.css";
import { getUserEmailFromToken } from '../utils/auth.js'; // Importe a função utilitária

function TesteProduto() {
  
  // Estado para controlar a Sidebar em mobile
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Estado para controlar o modal de criação de produto
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Estado para armazenar o email do usuário
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = getUserEmailFromToken();
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(s => !s)
  const closeSidebar = () => setSidebarOpen(false)

  // Funções para controlar o modal
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  return (
    <div className="app-root d-flex">
      {/* Overlay para fechar a sidebar em mobile */}
      {sidebarOpen && <div className="sidebar-overlay d-lg-none" onClick={closeSidebar}></div>}

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="content flex-grow-1">
        {/* Passe a função para abrir o modal para o Topbar */}
        <Topbar 
          onMenuClick={toggleSidebar} 
          onCreateProductClick={handleShowCreateModal}
          title="Produtos"
          showActions={true}
          userEmail={userEmail} // Passe o email do usuário para o Topbar
        />
        <main className="p-4">
          <ProductsTable />
        </main>
      </div>

      {/* Renderize o modal */}
      <ProductCreateModal show={showCreateModal} onHide={handleCloseCreateModal} />
    </div>
  )
}
export default TesteProduto;