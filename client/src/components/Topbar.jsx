import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter, faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons'

// Recebe a função de clique
export default function Topbar({ onMenuClick }) { 
  return (
<header className="topbar bg-light">
  
  {/* 🔹 Primeira barra (Busca e Perfil) */}
  <div className="top-bar d-flex align-items-center gap-2 p-3 border-bottom">
    <div className="search input-group flex-grow-1 me-3">
      <span className="input-group-text">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input className="form-control text-start" placeholder="Pesquisar produtos" />
    </div>

    <div className="profile d-flex align-items-center">
      <div className="avatar rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3">U</div>
      <div className="d-none d-sm-block">
        <div className="small">Nome do Usuario</div>
        <div className="small text-muted">usuario@email.com</div>
      </div>
    </div>
  </div>


  {/* 🔹 Segunda barra (Título e Ações) */}
  <div className="bottom-bar d-flex align-items-center justify-content-between gap-3 flex-wrap p-3">
    <div className="d-flex align-items-center gap-2">
      {/* Botão Hamburguer: Visível apenas em telas pequenas (d-lg-none) */}
      <button className="btn btn-outline-secondary d-lg-none" onClick={onMenuClick}>☰</button>
      <div className="project-title fs-2">Produtos</div>
    </div>

    <div className="d-flex align-items-center gap-2 flex-wrap">
      <button className="btn btn-outline-secondary fs-7">
        <FontAwesomeIcon icon={faFilter} /> Filtros
      </button>
      <button className="btn btn-outline-secondary fs-7 d-none d-sm-inline-block">
        <FontAwesomeIcon icon={faFileExport} /> Exportar
      </button> {/* Ocultado em telas XS */}
      <button className="btn text-white fs-7">
        <FontAwesomeIcon icon={faPlus} /> Criar Produto
      </button>
    </div>
  </div>

</header>
  )
}