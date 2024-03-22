#! /usr/bin/env node
import inquirer from "inquirer";
async function startatm() {
    let login = await inquirer.prompt([{
            type: "input",
            name: "login",
            message: "Bank ID"
        },
        {
            type: "password",
            name: "password",
            message: "Enter your Pin"
        }
    ]);
    if (login.login == "" || login.password == "") {
        console.log(`\n\n Pin or bank id should no empty`);
        startatm();
    }
    function amount(total) {
        let balance = Math.floor(Math.random() * total) + 1;
        return balance;
    }
    let totalBalance = amount(100000);
    //console.log(totalBalance)
    async function bankAccount() {
        //console.log(`your Balance is ${totalBalance}`)
        let options = await inquirer.prompt([{
                type: "list",
                name: "options",
                message: "select any one of them",
                choices: ["Withdraw Cash", "Balance Inquiry"]
            }]);
        async function withdrawMoney() {
            if (options.options === "Withdraw Cash") {
                let cashWithdraw = await inquirer.prompt([{
                        type: "list",
                        name: "CashWithdraw",
                        message: "Enter amount you want to withdraw",
                        choices: ["1000", "3000", "5000", "10000", "other"]
                    }]);
                if (cashWithdraw.CashWithdraw === "other") {
                    let withdraw = await inquirer.prompt({
                        type: "input",
                        name: "withdrawAmount",
                        message: "Eneter Amount you want to withdraw",
                        validate: function (input) {
                            const amount = parseFloat(input);
                            if (isNaN(amount)) {
                                console.log("Enter a valid amount");
                                return false;
                            }
                            return true;
                        }
                    });
                    if (withdraw.withdrawAmount < 1000) {
                        console.log("Withrawal minimum limit is 1000");
                        await withdrawMoney();
                    }
                    else if (withdraw.withdrawAmount > 50000) {
                        console.log("Withrawal maximum limit is 50000");
                        await withdrawMoney();
                    }
                    else if (withdraw.withdrawAmount > totalBalance) {
                        console.log("Balance is insufficient");
                        await withdrawMoney();
                    }
                    else {
                        async function tranConfirm() {
                            let confirmation = await inquirer.prompt({
                                type: "list",
                                name: "WithdrawConfirmation",
                                message: "Withdraw or Cancel Choose any one",
                                choices: ["Withdraw", "Cancel"]
                            });
                            if (confirmation.WithdrawConfirmation.toLowerCase() === "cancel") {
                                console.log("You transaction is cancel");
                            }
                            else if (confirmation.WithdrawConfirmation.toLowerCase() === "withdraw") {
                                console.log("Your transaction Confirmed");
                                console.log("You have succesfuly withdraw", withdraw.withdrawAmount);
                                totalBalance -= cashWithdraw;
                            }
                        }
                        tranConfirm();
                    }
                }
                else {
                    async function tranConfirm() {
                        let confirmation = await inquirer.prompt({
                            type: "list",
                            name: "WithdrawConfirmation",
                            message: "Withdraw or Cancel Choose any one",
                            choices: ["Withdraw", "Cancel"]
                        });
                        if (confirmation.WithdrawConfirmation.toLowerCase() === "cancel") {
                            console.log("You transaction is cancel");
                        }
                        else if (confirmation.WithdrawConfirmation.toLowerCase() === "withdraw") {
                            console.log("Your transaction Confirmed");
                            console.log("You have succesfuly withdraw", cashWithdraw.CashWithdraw);
                            totalBalance -= cashWithdraw;
                        }
                    }
                    tranConfirm();
                }
            }
            async function balance_inquiry() {
                if (options.options === "Balance Inquiry") {
                    console.log("Your balance is", totalBalance);
                }
            }
            balance_inquiry();
        }
        withdrawMoney();
    }
    bankAccount();
}
startatm();
