import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { PiMoney } from "react-icons/pi";
import { readEntry } from "../../../repositories/crud";
import { totalEarningEndpoint } from "../../../repositories/apiEndPoints";
import CountUp from "react-countup";
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from "../../../contexts/userContext";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState({
    value: "EUR",
    label: "EUR",
  });
  const [toCurrency, setToCurrency] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const [showNumbers, setShowNumbers] = useState(false);

  const {user, isLoggedIn} = useContext(userContext); 
  const {adminRefresh, setAdminRefresh} = useContext(adminContext)

  useEffect(() => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((response) => response.json())
      .then((data) => {
        const options = Object.keys(data).map((currencyCode) => ({
          value: currencyCode,
          label: currencyCode,
        }));
        setCurrencyOptions(options);
      });

    readEntry(totalEarningEndpoint)
      .then((res) => res.json())
      .then((data) => {
        if (Object.values(data.resdata) == 0) setAmount(0);
        else setAmount(Object.values(data.resdata));
      });
    setShowNumbers(true);
  }, [adminRefresh, user]);

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, adminRefresh, user]);

  const convertCurrency = async () => {
    if (fromCurrency && toCurrency) {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
      );
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency.value];
      const convertedValue = (amount * exchangeRate).toFixed(2);
      setConvertedAmount(convertedValue);
    }
  };

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
    setShowCurrencyOptions(false);
  };

  const handleToCurrencyChange = (selectedOption) => {
    if (selectedOption.value === "EUR") {
      setToCurrency(selectedOption);
      setShowCurrencyOptions(false);
    } else {
      setToCurrency(selectedOption);
      convertCurrency();
      setShowCurrencyOptions(false);
    }
  };

  const handleChangeButtonClick = () => {
    setShowCurrencyOptions(true);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl px-6">
          <div>
            <div>             
              {showCurrencyOptions ? (
                <Select
                  value={toCurrency}
                  options={currencyOptions}
                  onChange={handleToCurrencyChange}
                />
              ) : (
                <div className="flex flex-row gap-2 text-green-400 font-bold">
                  {showNumbers ? (
                    <CountUp end={amount} duration={3} separator="," />
                  ) : (
                    "0"
                  )}
                  <span>                  
                    <button onClick={handleChangeButtonClick}>
                      {fromCurrency.value}
                    </button>
                  </span>
                </div>
              )}
            </div>
            {toCurrency && (
              <div>
                <h3>
                  {" "}
                  {convertedAmount}{" "}
                  <button onClick={handleChangeButtonClick}>
                    {toCurrency.value}
                  </button>{" "}
                </h3>
              </div>
            )}
          </div>
        </h1>
        <PiMoney className="text-[85px] pr-6 text-green-400" />
      </div>
      <p className="px-6 font-bold text-l">Earning</p>
    </>
  );
};

export default CurrencyConverter;
