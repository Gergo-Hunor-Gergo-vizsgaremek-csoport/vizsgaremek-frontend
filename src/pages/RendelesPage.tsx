import {useParams} from "react-router";
import {useState, useEffect, useRef} from "react";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import {RendelesService} from "../services/RendelesService.ts";
import {TypeService} from "../services/TypeService.ts";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import styles from "../pages/RendelesPage.module.scss"
import {RendelesHozzarendelDialog} from "../components/RendelesHozzarendelDialog.tsx";
import {NavBar} from "../components/NavBar.tsx";

export function RendelesPage() {
    const services = useContainer();
    const rendelesService = services.get(RendelesService);
    const typeService = services.get(TypeService);
    const {rendelesId} = useParams();
    const [rendeles,setRendeles] = useState<RendelesReadDto>();
    let rendelesRef = useRef<RendelesReadDto>(rendeles);
    const [typeName,setTypeName] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function Load() {
        console.log("Load Rendeles");
        if (!rendelesId)
        {
            return;
        }
        let resultRendeles:RendelesReadDto = await rendelesService.get(rendelesId);
        console.log(resultRendeles.typeId);
        setRendeles(resultRendeles);
        let resultType:TypeReadDto = await typeService.get(resultRendeles.typeId);
        setTypeName(resultType.name);
        rendelesRef.current = rendeles;
    }

    useEffect(() => {
        Load();
    }, [isOpen]);

    if (!rendeles)
    {
        return null;
    }

    /*return (
        <>
            <NavBar />
            <div className={styles.root}>
                <p>USERID: {rendeles?.userId}</p>
                <p>Típus: {typeName}</p>
                <p>Rendelés dátuma: {(rendeles?.date)?new Date(rendeles.date).toLocaleDateString("hu"):"ismeretlen"}</p>
                <p>Hozzárendelt: {rendeles?.completedQuantity}/{rendeles?.quantity}</p>

                <button className={styles.hozzaRendelButton} onClick={() => {
                    setIsOpen(true);
                }}>Hozzárendelés</button>
            </div>

            <RendelesHozzarendelDialog isOpen={isOpen} setIsOpen={setIsOpen} rendeles={rendeles}/>
        </>
    )*/

        return (
        <>
            <NavBar/>
            <div className={styles.root}>

                    <header className={styles.pageHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Példányok hozzárendelése</h1>
                            <p className={styles.pageSubtitle}>Fizikai raktári tételek összekapcsolása a felhasználói rendeléssel</p>
                        </div>
                        <div className={styles.statusPill}>Hozzárendelt: {rendeles.completedQuantity} / {rendeles.quantity}</div>
                    </header>

                    <div className={styles.dashboardGrid}>
                        {/* Bal oszlop: Rendelés adatai */}
                        <aside className={styles.panel}>
                            <h2 className={styles.panelTitle}>Rendelés adatai</h2>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Termék típusa</span>
                                <div className={`${styles.infoValue} ${styles.productName}`}>{typeName}</div>
                            </div>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Rendelés dátuma</span>
                                <div className={styles.infoValue}>{(rendeles?.date)?new Date(rendeles.date).toLocaleDateString("hu"):"ismeretlen"}</div>
                            </div>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Felhasználó azonosító (USERID)</span>
                                <div className={styles.uuidBox}>a96fc0e578bb48d1Acbc5bb6006c0d86</div>
                            </div>

                            <div className={styles.progressSection}>
                                <div className={styles.progressHeader}>
                                    <span className={styles.textMuted}>Teljesítési állapot</span>
                                    <strong>{rendeles.completedQuantity} / {rendeles.quantity} példány</strong>
                                </div>
                                <div className={styles.progressTrack}>
                                    <div className={styles.progressFill} />
                                </div>
                            </div>
                        </aside>

                        {/* Jobb oszlop: Példányok listája és hozzárendelés */}
                        <section>
                            {/* Már hozzárendelt tételek */}
                            <div className={styles.panel}>
                                <h2 className={styles.panelTitle}>Kiosztott példányok</h2>

                                <div className={styles.tableWrapper}>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Példány sorozatszám</th>
                                            <th>Raktári pozíció</th>
                                            <th>Kiosztva</th>
                                            <th className={styles.textRight}>Művelet</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><span className={styles.serialCode}>SNOA20260041</span></td>
                                            <td>ASor / 04. polc</td>
                                            <td className={styles.textMuted}>2026. 11. 23.</td>
                                            <td className={styles.textRight}>
                                                <button className={styles.btnRemove}>Leválasztás</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><span className={styles.serialCode}>SNOA20260089</span></td>
                                            <td>ASor / 04. polc</td>
                                            <td className={styles.textMuted}>2026. 11. 23.</td>
                                            <td className={styles.textRight}>
                                                <button className={styles.btnRemove}>Leválasztás</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className={styles.panel}>
                                <h2 className={styles.panelTitle}>Új példány hozzárendelése</h2>
                                <form className={styles.assignForm}>
                                    <select className={styles.selectInput} defaultValue="">
                                        <option value="">Válassz szabad példányt a raktárból...</option>
                                        <option value={104}>SNOA20260104 (ASor / 05. polc)</option>
                                        <option value={112}>SNOA20260112 (BSor / 01. polc)</option>
                                        <option value={119}>SNOA20260119 (BSor / 02. polc)</option>
                                    </select>
                                    <button className={styles.btnAssign}>Hozzárendelés</button>
                                </form>
                                <p className={styles.helperNote}>
                                    A rendeléshez tartozó összes példány (2/2) már ki lett osztva. Újabb tétel hozzáadásához előbb válassz le egy meglévőt.
                                </p>
                            </div>
                        </section>
                    </div>
            </div>
        </>
        );
}