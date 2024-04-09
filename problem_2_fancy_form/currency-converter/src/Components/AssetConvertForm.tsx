// src/CurrencyConverterForm.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Token from "./Token";

interface ICurrency {
  currency: string;
  date: Date;
  price: number;
}
interface IAssetResponse {
  amount: number;
  currency: string;
}

const AssetConvertForm = () => {
  const [currentCurrency, setCurrentCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [targetCurrency, setTargetCurrency] = useState<string>("");
  const [allCurrencies, setAllCurrencies] = useState<ICurrency[]>([]);
  const [sourceCurrencies, setSourceCurrencies] = useState<ICurrency[]>([]);
  const [targetCurrencies, setTargetCurrencies] = useState<ICurrency[]>([]);
  const [targetAsset, setTargetAsset] = useState<IAssetResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/currencies");
        setAllCurrencies(response.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSourceCurrencies(allCurrencies.filter(x => x.currency !== targetCurrency));
    setTargetCurrencies(allCurrencies.filter(x => x.currency !== currentCurrency));
  },[allCurrencies, currentCurrency, targetCurrency])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (!currentCurrency) {
      alert("Please select your current asset currency");
      return;
    }
    if (!targetCurrency) {
      alert("Please select your target asset currency");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/asset/convert", {
        currentCurrency,
        amount,
        targetCurrency,
      });
      setTargetAsset(response.data);
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Convert failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="currentCurrency">Current Currency:</label>
        <select
          id="currentCurrency"
          value={currentCurrency}
          onChange={(e) => setCurrentCurrency(e.target.value)}
        >
          <option value="">Select Currency</option>
          {sourceCurrencies.filter(currency => currency.currency !== targetCurrency).map((currency) => (
            <option key={currency.currency} value={currency.currency}>
              {currency.currency}: {currency.price} USD
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="targetCurrency">Target Currency:</label>
        <select
          id="targetCurrency"
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
        >
          <option value="">Select Currency</option>
          {targetCurrencies.filter(currency => currency.currency !== currentCurrency).map((currency) => (
            <option key={currency.currency} value={currency.currency}>
              {currency.currency}: {currency.price} USD
            </option>
          ))}
        </select>
      </div>
      {targetAsset && (
        <div>
         You have {targetAsset.amount} <Token token={targetAsset.currency} /> {targetAsset.currency}
        </div>
      )}
      <button type="submit">Convert</button>
    </form>
  );
};

export default AssetConvertForm;
