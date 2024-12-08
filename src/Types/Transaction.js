import React from "react";

export interface Transaction {
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: Date;
  };