//import type {TypeReadDto} from "../dtos/TypeReadDto";
import styles from "./PeldanySzuroModalPage.module.scss";

export interface PeldanySzuroModalPageProps {
    typeId: string;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const PeldanySzuroModalPage: React.FC<PeldanySzuroModalPageProps> = ({ isOpen, onClose, title}) => {

    if (!isOpen) return null;

    return (
        <div className={styles.root}>

            {/* Modal kártya - e.stopPropagation() megakadályozza, hogy a belső kattintás bezárja */}
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>

                {/* Fejléc címke és bezáró X gomb */}
                <div className={styles.header}>
                    <h3>{title || 'Modal Cím'}</h3>
                    <button onClick={onClose} className={styles.closeButton}>X</button>
                </div>

                {/* Belső tartalom*/}
                <div className={styles.content}>
                    <form>
                        <label htmlFor="property1">Példány tulajdonság 1:</label><br/>
                        <input type="text" id="property1" name="property1" value="tulajdonság..."/><br/>
                        <label htmlFor="property2">Példány tulajdonság 2:</label><br/>
                        <input type="text" id="property2" name="property2" value="tulajdonság..."/>
                    </form>
                </div>

                {/* Lábléc gombbal */}
                <div className={styles.bottom}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Mégse
                    </button>
                </div>

            </div>
        </div>
    );
}