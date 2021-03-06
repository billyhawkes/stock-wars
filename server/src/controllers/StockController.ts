// Model
import { buyStock, costFromSymbol, sellStock } from "../models/StockModel";
import { changeCash, getCash, getSharesOfSymbol } from "../models/UserModel";

class StockController {
    static async Buy(req: any, res: any) {
        const { symbol, amount, userID } = req.body;

        try {
            // Error Checking
            if (!symbol || !amount)
                return res
                    .status(400)
                    .json({ message: "Please fill all fields" });
            if (symbol.length > 4 || symbol.length < 1)
                return res
                    .status(400)
                    .json({ message: "Symbol must be 1-4 chars" });

            // Get Cost
	console.log("Before cost");
            const costPerShare = await costFromSymbol(symbol);
            const totalPrice = amount * costPerShare;
	console.log("After cost");

            // Error: If you cant afford it
            const cash = await getCash(userID);
            if (cash < totalPrice)
                return res.status(400).json({ message: "Not enough cash" });

            await buyStock(symbol, amount, costPerShare, userID);
            await changeCash(-totalPrice, userID);

            return res.json({
                message: `Bought ${amount} shares of ${symbol}`,
            });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async PriceOfStock(req: any, res: any) {
        const symbol = req.params.q;
        try {
            // Get Cost
            const costPerShare = await costFromSymbol(symbol);
            return res.json(costPerShare);
        } catch {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async Sell(req: any, res: any) {
        const { symbol, amount, userID } = req.body;

        try {
            // Error Checking
            if (!symbol || !amount)
                return res
                    .status(400)
                    .json({ message: "Please fill all fields" });
            if (symbol.length > 4 || symbol.length < 1)
                return res
                    .status(400)
                    .json({ message: "Symbol must be 1-4 chars" });

            // Grab amount of stock with symbol
            const sharesOfSymbol = await getSharesOfSymbol(symbol, userID);

            // Check if stock exists
            if (!sharesOfSymbol || sharesOfSymbol <= 0)
                return res.status(400).json({
                    message: `No stock with symbol: ${symbol}`,
                });

            // Check if you own enough to sell
            if (amount > sharesOfSymbol)
                return res.status(400).json({
                    message: `Not enough ${symbol} shares. You have: ${sharesOfSymbol}`,
                });

            // Sell Stock
            const costPerShare = await costFromSymbol(symbol);
            const totalPrice = costPerShare * amount;
            await sellStock(symbol, amount, costPerShare, userID);
            // Add cash
            await changeCash(totalPrice, userID);

            return res.json({ message: `Sold ${amount} ${symbol} shares` });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default StockController;
