
export interface PeldanySzuroModalPageProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const PeldanySzuroModalPage: React.FC<PeldanySzuroModalPageProps> = ({ isOpen, onClose, title, children }) => {

    if (!isOpen) return null;

    return (
        // Sötétített háttér (Overlay) - Ha rá-kattintanak, bezárja a modalt
        <div style={overlayStyle} onClick={onClose}>
            {/* Modal kártya - e.stopPropagation() megakadályozza, hogy a belső kattintás bezárja */}
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>

                {/* Fejléc címke és bezáró X gomb */}
                <div style={headerStyle}>
                    <h3>{title || 'Modal Cím'}</h3>
                    <button onClick={onClose} style={closeButtonStyle}>
                        &times;
                    </button>
                </div>

                {/* Belső tartalom (Children) */}
                <div style={bodyStyle}>
                    {children}
                </div>

                {/* Lábjéc akciógombokkal */}
                <div style={footerStyle}>
                    <button onClick={onClose} style={cancelButtonStyle}>
                        Bezárás
                    </button>
                </div>

            </div>
        </div>
    );
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Féláttetsző sötét háttér
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '12px',
};

const bodyStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#333',
};

const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    borderTop: '1px solid #eee',
    paddingTop: '12px',
};

const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
};

const cancelButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    cursor: 'pointer',
};