import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const renderPaginationItems = () => {
        const visiblePageCount = 2;

        let visiblePages = pages.filter(
            (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - visiblePageCount && page <= currentPage + visiblePageCount),
        );

        let paginationItems = [];

        visiblePages.forEach((page, index) => {
            if (index > 0 && page - visiblePages[index - 1] > 1) {
                paginationItems.push(
                    <span key={`dots${index}`} className="pagination-dots">
                        ...
                    </span>,
                );
            }
            paginationItems.push(
                <button
                    key={page}
                    className={`pagination-item ${currentPage === page - 1 ? 'active' : ''}`}
                    onClick={() => onPageChange(page - 1)}
                >
                    {page}
                </button>,
            );
        });

        return paginationItems;
    };

    return <div className="pagination">{renderPaginationItems()}</div>;
};

export default Pagination;
