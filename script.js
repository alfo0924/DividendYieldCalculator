document.addEventListener('DOMContentLoaded', () => {
    const stockPriceInput = document.getElementById('stockPrice');
    const cashDividendInput = document.getElementById('cashDividend');
    const stockDividendInput = document.getElementById('stockDividend');
    const sharesOwnedInput = document.getElementById('sharesOwned');
    const calculateBtn = document.getElementById('calculateBtn');

    const cashYieldResultEl = document.getElementById('cashYieldResult');
    const stockYieldResultEl = document.getElementById('stockYieldResult');
    const totalYieldResultEl = document.getElementById('totalYieldResult');
    const exDividendPriceResultEl = document.getElementById('exDividendPriceResult');
    const totalCashDividendResultEl = document.getElementById('totalCashDividendResult');
    const totalStockSharesResultEl = document.getElementById('totalStockSharesResult');
    const resultsContainer = document.getElementById('resultsContainer');

    calculateBtn.addEventListener('click', calculateValues);

    function calculateValues() {
        const stockPrice = parseFloat(stockPriceInput.value) || 0;
        const cashDividend = parseFloat(cashDividendInput.value) || 0;
        const stockDividend = parseFloat(stockDividendInput.value) || 0; // 股票股利(元)，例如1元代表配0.1股
        const sharesOwned = parseFloat(sharesOwnedInput.value) || 0;

        let cashYield = 0;
        let stockYield = 0;
        let totalYield = 0;
        let exDividendPrice = stockPrice; // Default to stockPrice if no dividends
        let totalCashDividend = 0;
        let totalStockShares = 0;

        if (stockPrice > 0) {
            // 現金殖利率計算 [1][2]
            if (cashDividend > 0) {
                cashYield = (cashDividend / stockPrice) * 100;
            }

            // 股票殖利率計算
            // 股票股利1元代表配0.1股 [1]。其價值以現股價估算。
            // 殖利率 = (配股價值 / 投入成本) * 100
            // 配股價值 = (股票股利(元)/10) * 股票現價
            // 股票殖利率 = ((股票股利(元)/10) * 股票現價 / 股票現價) * 100 = (股票股利(元)/10) * 100
            if (stockDividend > 0) {
                stockYield = (stockDividend / 10) * 100;
            }

            totalYield = cashYield + stockYield;

            // 除權息參考價計算 [3]
            // 公式：(股價 - 現金股利) / (1 + (股票股利(元) / 10))
            if (cashDividend >= 0 && stockDividend >= 0) { // Allow calculation even if one is zero
                // Only adjust exDividendPrice if there are any dividends
                if (cashDividend > 0 || stockDividend > 0) {
                    exDividendPrice = (stockPrice - cashDividend) / (1 + (stockDividend / 10));
                }
            }
        }

        if (sharesOwned > 0) {
            if (cashDividend > 0) {
                totalCashDividend = cashDividend * sharesOwned;
            }
            if (stockDividend > 0) {
                totalStockShares = (stockDividend / 10) * sharesOwned;
            }
        }

        cashYieldResultEl.textContent = cashYield.toFixed(2);
        stockYieldResultEl.textContent = stockYield.toFixed(2);
        totalYieldResultEl.textContent = totalYield.toFixed(2);
        exDividendPriceResultEl.textContent = exDividendPrice > 0 ? exDividendPrice.toFixed(2) : (stockPrice > 0 ? stockPrice.toFixed(2) : '0.00');
        totalCashDividendResultEl.textContent = totalCashDividend.toFixed(2);
        totalStockSharesResultEl.textContent = totalStockShares.toFixed(2);

        resultsContainer.style.display = 'block'; // Show results
    }
});
