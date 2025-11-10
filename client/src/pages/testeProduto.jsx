import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ProductsTable from '../components/ProductsTable'
import "./TesteProduto.css";

function TesteProduto() {
  // Novo estado para controlar se a Sidebar está aberta (para mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(s => !s)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app-root d-flex">
      {/* O Overlay é mostrado apenas em mobile quando a Sidebar está aberta */}
      {sidebarOpen && <div className="sidebar-overlay d-lg-none" onClick={closeSidebar}></div>}

      {/* Passa o estado e a função de fechamento/abertura para os componentes */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="content flex-grow-1">
        {/* Passa a função de toggle para o Topbar (onde está o botão Hamburguer) */}
        <Topbar onMenuClick={toggleSidebar} />
        <main className="p-4">
          <ProductsTable />
        </main>
      </div>
    </div>
  )
}
export default TesteProduto;