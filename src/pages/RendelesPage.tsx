import {useParams} from "react-router";
import {useState, useEffect, useRef, type ChangeEvent} from "react";
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

    const [disabled,setDisabled] = useState<boolean>(true);

    const [rendeles,setRendeles] = useState<RendelesReadDto>();
    const [typeName,setTypeName] = useState<string>("");
    const [selectedPeldany,setSelectedPeldany] = useState<PeldanyReadDto>();
    const [peldanys,setPeldanys] = useState<PeldanyReadDto[]>();


    async function Load() {
        if (!rendelesId)
        {
            return;
        }
        let resultRendeles:RendelesReadDto = await rendelesService.get(rendelesId);
        setRendeles(resultRendeles);
        let resultType:TypeReadDto = await typeService.get(resultRendeles.typeId);
        setTypeName(resultType.name);

        let resultPeldanys = await typeService.getPeldanyok(resultType.id,50,0);
        setPeldanys(resultPeldanys);
    }

    useEffect(() => {
        Load();
    }, []);

    async function CreateKolcsonzes()
    {
        if (selectRef.current === null) return;
        if (!rendeles) return;
        if (!selectedPeldany) return;

        let expirationDate = new Date();
        // 1 hónap múlva jár le
        expirationDate.setMonth(expirationDate.getMonth() + 1);

        let kolcsonzesWriteDto: KolcsonzesWriteDto = {
            peldanyId: selectedPeldany.id,
            userId: rendeles.userId,
            date: new Date(),
            expirationDate: expirationDate
        }

        await rendelesService.assignKolcsonzes(rendeles.id,kolcsonzesWriteDto);

        if (selectRef.current)
        {
            selectRef.current.selectedIndex = 0;
            setDisabled(true);
        }


        Load();
    }

    function UpdateSelection(e: React.ChangeEvent<HTMLSelectElement>)
    {

        if (e.currentTarget.selectedIndex === 0)
        {
            setDisabled(true);
            return;
        }

        setDisabled(false);
        let selectedOption:HTMLOptionElement = e.currentTarget.selectedOptions[0];
        setSelectedPeldany(JSON.parse(selectedOption.dataset.peldany as string) as PeldanyReadDto);
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

                        <div className={styles.assignPanel}>
                            <h2 className={styles.panelTitle}>Új példány hozzárendelése</h2>
                            <div className={styles.assignDiv}>
                                <select ref={selectRef} className={styles.selectInput} onChange={e =>UpdateSelection(e)}>
                                    <option>Válassz szabad példányt a raktárból...</option>
                                    {peldanys?.map(x=>
                                            <option data-peldany={JSON.stringify(x)}>{x.serialNumber}</option>
                                    )}
                                </select>
                                <button className={styles.btnAssign} onClick={CreateKolcsonzes} disabled={disabled} /*disabled={!selectRef.current || selectRef.current.selectedIndex === 0}*/>Hozzárendelés</button>
                            </div>
                            {(rendeles.completedQuantity === rendeles.quantity)?
                            <p className={styles.helperNote}>
                                A rendeléshez tartozó összes példány ({rendeles.completedQuantity}/{rendeles.completedQuantity}) már ki lett osztva. Újabb tétel hozzáadásához előbb válassz le egy meglévőt.
                            </p>:<></>
                            }
                        </div>
                    </div>
            </div>
        </>
        );
}