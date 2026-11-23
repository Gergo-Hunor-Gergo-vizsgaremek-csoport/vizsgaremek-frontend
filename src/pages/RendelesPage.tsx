import {useParams} from "react-router";
import {useState, useEffect, useRef} from "react";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import {RendelesService} from "../services/RendelesService.ts";
import {TypeService} from "../services/TypeService.ts";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import styles from "../pages/RendelesPage.module.scss"
import {NavBar} from "../components/NavBar.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {PeldanyService} from "../services/PeldanyService.ts";
import type {KolcsonzesWriteDto} from "../dtos/KolcsonzesWriteDto.ts";
import type {RendelesWriteDto} from "../dtos/RendelesWriteDto.ts";
import {KolcsonzesService} from "../services/KolcsonzesService.ts";

export function RendelesPage() {
    const services = useContainer();
    const rendelesService = services.get(RendelesService);
    const peldanyService = services.get(PeldanyService);
    const kolcsonzesService = services.get(KolcsonzesService);
    const typeService = services.get(TypeService);
    const {rendelesId} = useParams();

    let selectRef = useRef<HTMLSelectElement>(null);

    const [rendeles,setRendeles] = useState<RendelesReadDto>();
    const [typeName,setTypeName] = useState<string>("");
    const [selectedPeldany,setSelectedPeldany] = useState<PeldanyReadDto>();
    const [peldanys,setPeldanys] = useState<PeldanyReadDto[]>();


    async function Load() {
        console.log("Load Rendeles");
        if (!rendelesId)
        {
            return;
        }
        let resultRendeles:RendelesReadDto = await rendelesService.get(rendelesId);
        console.log(resultRendeles.typeId);
        resultRendeles.completedQuantity = 5;
        setRendeles(resultRendeles);
        let resultType:TypeReadDto = await typeService.get(resultRendeles.typeId);
        setTypeName(resultType.name);

        let resultPeldanys = await peldanyService.getByTypeId(resultType.id,50,0);
        setPeldanys(resultPeldanys);
        console.log(resultPeldanys);
    }

    useEffect(() => {
        Load();
    }, []);



    async function Assign()
    {

    }

    async function CreateKolcsonzes()
    {
        let expirationDate = new Date();
        // 1 hónap múlva jár le
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        let kolcsonzesWriteDto: KolcsonzesWriteDto = {
            peldanyId: selectedPeldany.id,
            userId: rendeles.userId,
            date: new Date().toJSON(),
            expirationDate: expirationDate.toJSON(),
        }
        await kolcsonzesService.post(kolcsonzesWriteDto);

        let rendelesWriteDto: RendelesWriteDto = {
            typeId: rendeles.typeId,
            userId: rendeles.userId,
            date: rendeles.date,
            quantity: rendeles.quantity,
            completedQuantity: rendeles.completedQuantity+1
        }
        await rendelesService.put(rendeles.id, rendelesWriteDto);
        //await Load();
    }

    if (!rendeles)
    {
        return null;
    }

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
                        <div className={styles.infoPanel}>
                            <h2 className={styles.panelTitle}>Rendelés adatai</h2>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Termék típusa</span>
                                <div className={styles.infoValue}>{typeName}</div>
                            </div>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Rendelés dátuma</span>
                                <div className={styles.infoValue}>{(rendeles?.date)?new Date(rendeles.date).toLocaleDateString("hu"):"ismeretlen"}</div>
                            </div>

                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Felhasználó azonosító (USERID)</span>
                                <div className={styles.uuidBox}>{rendeles.userId}</div>
                            </div>

                            <div className={styles.progressSection}>
                                <div className={styles.progressHeader}>
                                    <span className={styles.textMuted}>Teljesítési állapot</span>
                                    <strong>{rendeles.completedQuantity} / {rendeles.quantity} példány</strong>
                                </div>
                                <div className={styles.progressTrack} style={{width:(100*rendeles.completedQuantity/rendeles.quantity)+'%'}} >
                                    <div className={styles.progressFill} />
                                </div>
                            </div>
                        </div>

                            <div className={styles.tablePanel}>
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


                            <div className={styles.assignPanel}>
                                <h2 className={styles.panelTitle}>Új példány hozzárendelése</h2>
                                <div className={styles.assignDiv}>
                                    <select className={styles.selectInput} defaultValue="">
                                        <option value="">Válassz szabad példányt a raktárból...</option>
                                        {peldanys?.map(x=>
                                            <option data-peldany={x}>{x.serialNumber}</option>
                                        )}
                                    </select>
                                    <button className={styles.btnAssign}>Hozzárendelés</button>
                                </div>
                                <p className={styles.helperNote}>
                                    A rendeléshez tartozó összes példány (2/2) már ki lett osztva. Újabb tétel hozzáadásához előbb válassz le egy meglévőt.
                                </p>
                            </div>
                    </div>
            </div>
        </>
        );
}