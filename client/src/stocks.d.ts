interface Stock {
    stock_id: number;
    symbol: string | undefined;
    amount: number | undefined;
    sum: number;
    cost: string;
    date_time: string;
}

interface User {
    username: string;
    email: string;
    password: string;
}

interface ClientUser {
    id: number | undefined;
    username: string | undefined;
}
