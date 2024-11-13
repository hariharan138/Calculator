import React, { useRef, useState } from 'react'
import cal from "./Cal.module.css"
import Toggle from "./Toggle"

const Calc = () => {
    let [isrange, setisrange] = useState(200)
    let [israte, setisrate] = useState(875)
    let [istenure, setistenure] = useState(1)
    let [minRange, setminRange] = useState(0)
    let [maxRange, setmaxRange] = useState(1000)
    let [minYear, setminYear] = useState(1)
    let [maxYear, setmaxYear] = useState(30)
    let [dummy,setdummy]=useState("years")
    let [ToggleMessage, setToggleMessage]=useState(true)
    let inputst = useRef(true)
    let inputmi = useRef(true)
    let inputend = useRef(true)

    let getinput = (e) => {
        setisrange(e.target.value)
    }
    let getrate = (e) => {
        setisrate(e.target.value)
    }
    let getTenure = (e) => {
        setistenure(e.target.value)
    }

    let loanAmount = isrange * 10000
    let intrestRate = israte / 100
    let finalTenure =istenure * 12   
    if(!ToggleMessage){
     finalTenure = istenure
    }
    else{
        finalTenure =istenure * 12
    }
    let calculateEMI = (P, annualRate, tenureMonths) => {
        let monthlyRate = (annualRate / 12) / 100;
        let EMI = (P * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        return EMI.toFixed(2);
    }

    let finalvalue = Math.floor(calculateEMI(loanAmount, intrestRate, finalTenure));
    let finalIntrestAmount = Math.floor((finalvalue * finalTenure) - loanAmount);

    let checkfn = () => {
        let isCheckedSt = inputst.current.checked;
        if (isCheckedSt) {
            setminRange(0);
            setmaxRange(1000);
            inputst.current.checked = true
            inputmi.current.checked = false
            inputend.current.checked = false
        }
    };

    let checkfn2 = () => {
        let isCheckedMi = inputmi.current.checked;
        if (isCheckedMi) {
            setisrange(3000)
            setminRange(1000);
            setmaxRange(5000);
            inputmi.current.checked = true
            inputst.current.checked = false
            inputend.current.checked = false
        }
    };
    let checkfn3 = () => {
        let isCheckedEnd = inputend.current.checked;
        if (isCheckedEnd) {
            setisrange(15000)
            setminRange(5000);
            setmaxRange(30000);
            inputend.current.checked = true
            inputst.current.checked = false
            inputmi.current.checked = false
        }
    };
    let handleToggleChange =(ChildToggle)=>{
        setToggleMessage(ChildToggle)
        if(ToggleMessage){
            setminYear(12)
            setmaxYear(360)
            setistenure(12)
            setdummy("Months")
        }else{
            setminYear(1)
            setmaxYear(30)
            setistenure(1)
            setdummy("Year")
        }
    }
    
    
    return (
        <>
            
            <section>
                <div className={cal.frang}>
                    <div className={cal.chek}>
                        <div >

                            <input type="radio"
                                ref={inputst}
                                onChange={checkfn}
                            /> <label>0-1 Crore</label>
                        </div>
                        <div>
                            <input type="radio"
                                ref={inputmi}
                                onChange={checkfn2}
                            /> <label>1-5 Crore</label>
                        </div>
                        <div>
                            <input type="radio"
                                ref={inputend}
                                onChange={checkfn3}
                            /> <label>5-30 Crore</label>
                        </div>
                    </div>

                    <h1>Loan Amount <span>INR {loanAmount}</span></h1>
                    <input type="range"
                        value={isrange}
                        min={minRange}
                        max={maxRange}
                        onChange={getinput}
                    />
                    <div className={cal.ran}>
                        <h5>{minRange}</h5>
                        <h5>{maxRange}</h5>
                    </div>
                    <h1>Illustrative Interest Rate p.a.<span>{intrestRate}%</span></h1>
                    <input type="range"
                        value={israte}
                        min="10"
                        max="2000"
                        onChange={getrate}
                    />
                    <div className={cal.ran}>
                        <h5>1%</h5>
                        <h5>20%</h5>
                    </div>
                    <h1><pre className={cal.spann}>Tenure ( Months <Toggle checktoggle={handleToggleChange}/>  Years ) </pre><span>{istenure}</span></h1>
                    <input type="range"
                        value={istenure}
                        min={minYear}
                        max={maxYear}
                        onChange={getTenure}
                    />
                    <div className={cal.ran}>
                        <h5>{minYear} {dummy}</h5>
                        <h5>{maxYear} {dummy}</h5>
                    </div>
                </div>
                <div className={cal.fcal}>
                    <u><h2>Principal Amount</h2></u>
                    <h2>INR {loanAmount}</h2>
                    <u><h2>Interest Amount</h2></u>
                    <h2>INR  {finalIntrestAmount}</h2>
                    <u><h2>Total Amount Payable</h2></u>
                    <h2>INR {loanAmount + finalIntrestAmount}</h2>
                    <h1 className={cal.Emi}> Monthly EMI is INR {finalvalue + 1}</h1>
                </div>
            </section>
        </>
    )
}

export default Calc
