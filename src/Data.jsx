import { useEffect, useState } from "react";
import fx from "money";
import React from 'react'
import Select from 'react-select'


let symbols = [
    {
        img: "./eu.svg",
        value: "EUR",
        label: "EUR"
    },
    {
        img: "./eeuu.svg",
        value: "USD",
        label: "USD"
    },
    {
        img: "./gbp.svg",
        value: "GBP",
        label: "GBP"
    },
    {
        img: "/ars.svg",
        value: "ARS",
        label: "ARS"
    },
    {
        img: "./chf.svg",
        value: "CHF",
        label: "CHF"
    },
    {
        img: "./cny.svg",
        value: "CNY",
        label: "CNY"
    },



];


const currencyKeys = symbols.map(item => item.value);

const API_SYMBOL = "&symbols=" + currencyKeys.join(',');

const API_KEY = "2df03cd2e1a943d5b89e5b5b42d86dea";
const API_URL = "https://openexchangerates.org/api/latest.json?app_id=";
const API_PATH = API_URL + API_KEY + API_SYMBOL;


const formatOptionLabel = ({ img, label }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={img} alt={label} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <span>{label}</span>
    </div>
);


export const Data = ({exampleCash}) =>{

    const [currencyData, setCurrency] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(symbols[0]);
    const [selectedCurrency2, setSelectedCurrency2] = useState(symbols[1]);
    
    const [selectedCurrencyValue, setSelectedCurrencyValue] = useState("");

    const [amount, setAmount] = useState(exampleCash || 0);



    const selectorOnChange = (e) =>{
        setSelectedCurrency(e);
        
    }
    const selectorOnChange2 = (e) =>{
        setSelectedCurrency2(e);
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try {
    
                
                let response = await fetch(API_PATH);
                let dataJSON = await response.json();
    
            
                if(!response.ok){
                    console.log("error en la solicitud");
                    return;
                }
    
                if (dataJSON && dataJSON.rates) {
                    setCurrency(dataJSON);
    
         
                    fx.rates = dataJSON.rates;
                    fx.base = dataJSON.base;
                } else {
                    console.error("No se encontraron tasas de cambio en la respuesta de la API.");
                }

                const firstCurrencyCode = Object.keys(dataJSON.rates)[0];
                const firstCurrencyObject = symbols.find(item => item.value === firstCurrencyCode);

                setSelectedCurrency(firstCurrencyObject || symbols[0]);
                setSelectedCurrency2(firstCurrencyObject || symbols[1]);
                setSelectedCurrencyValue(dataJSON.rates[firstCurrencyCode]);
                setAmount(exampleCash);

    
                
                
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCurrency && currencyData) {
            setSelectedCurrencyValue(currencyData.rates[selectedCurrency.value]);
        }
    }, [selectedCurrency, currencyData]);

    const conversionOnChange = (amount, from, to) => {
        if (!fx.rates) {
            console.error("Las tasas de cambio aún no se han cargado.");
            return "";
        }
    

        const fromCurrency = from?.value;
        const toCurrency = to?.value;
    
        if (!fromCurrency || !toCurrency) {
            console.error("Monedas inválidas seleccionadas.");
            return "";
        }
    
        try {

            const result = fx(amount).from(fromCurrency).to(toCurrency).toFixed(2);
            return result;
        } catch (error) {
            console.error("Error en la conversión de moneda:", error);
            return "";
        }
    };
      const setMoneyAmount = (e) =>{
        setAmount(e.target.value)
      }

      const swapCurrencies =() =>{
        
        const temp = selectedCurrency;
        setSelectedCurrency(selectedCurrency2);
        setSelectedCurrency2(temp); 
    }

    return(
        
            <div className="DataContainer">
                <div className="DataContainer__div"> 
                    {/*  TITLE AND DESCRIPTION  */}
                    <div className="DataContainer_TopDescription">
                        <h2>CONVERSOR DE DIVISAS</h2>
                        <p>Las tasas de cambio fluctúan continuamente. Asegúrate de verificar la tasa actual
                            en la aplicación antes de realizar cualquier conversión.
                        </p> 
                    </div>

                    {/*  FIRST INPUT  */}
                    
                    <div className="InputContainer">
                        <div className="Leftside">
                            <span>Base</span>
                            
                            <Select options={symbols} onChange={selectorOnChange} value={selectedCurrency}  formatOptionLabel={formatOptionLabel} className="selector"/>
                                       
                        </div>
                        <div className="Rigthside">
                            <input type="text" value={amount} onChange={setMoneyAmount}/>
                        </div>
                    </div>

                    {/*  SWAPPER  */}
                    <button className="swapBtn" onClick={swapCurrencies}>
                        
                        <img src="./swap.png" alt="" />
                        
                    </button>


                    {/*  SENCOND INPUT  */}
                    <div className="InputContainer">
                        <div className="Leftside">
                            <span>Conversión</span>
                            
                            <Select options={symbols} onChange={selectorOnChange2} value={selectedCurrency2} formatOptionLabel={formatOptionLabel} className="selector"/>
                            
                        </div>
                        <div className="Rigthside">
                            <input type="text" value={conversionOnChange(amount, selectedCurrency, selectedCurrency2)} readOnly/>
                        </div>
                    </div>

                </div>

            </div>
            

    );
    
}
