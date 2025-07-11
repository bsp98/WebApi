import React from 'react'
import './paginacion.css'

export const Paginacion = ({ currentPage, totalPages = 10, onPageChange }) => {
  const visiblePages = 5; // Máximo de botones visibles
  const half = Math.floor(visiblePages / 2); // Cuántos a la izquierda/derecha

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visiblePages - 1);

  // Ajustar si estamos muy cerca del final
  if (end - start + 1 < visiblePages) {
    start = Math.max(1, end - visiblePages + 1);
  }

  // Generar los números de página visibles
  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {/* Botón para ir a la primera página */}
      {currentPage > 1 && (
        <button className='button_paginado' onClick={() => onPageChange(currentPage - 1)}>{'«'}</button>
      )}

      {/* Botones de número */}
      {pageNumbers.map((page) => (
        <button 
          key={page}
          onClick={() => onPageChange(page)}
          className={`button_paginado ${currentPage === page ? 'pageActive' : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Botón para ir a la siguiente página */}
      {currentPage < totalPages && (
        <button className='button_paginado' onClick={() => onPageChange(currentPage + 1)}>{'»'}</button>
      )}
    </div>
  );
};

/*        <div className="pagination">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={currentPage === i + 1 ? 'pageActive' : ''}
                >
                    {i + 1}
                </button>
            ))}
        </div>*/