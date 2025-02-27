import express from "express";
import usersData from "../usersDB.json" with {type: 'json'};
import { writeFile } from "node:fs/promises";

const router = express.Router();


router.get('/login', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    // Check existing user
    const user = usersData.find((user) => user.username === username)


    if (user) {
        if (user.password === password) {
            res.json({ message: user })
        }
        else {
            res.json({ message: "Invalid credentials" })
        }
    }

    else {
        res.json({ message: "Invalid credentials" })
    }
})

router.post('/signup', async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const accnum = () => Math.floor(999999999999 + Math.random() * 77777777777);

    // Check existing user
    const user = usersData.find((user) => user.username === username)

    if (user) {
        return res.json({ message: "User already exists!" })
    }

    else {
        usersData.push({
            username,
            password,
            name: null,
            accnum: accnum(),
            balance: 0,
            mpin: null,
            phone: null,
            transdetails: []

        })

        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
            res.json({ message: "User Created!" })
        } catch (error) {
            res.json({ error: error.message })
        }
    }



})

router.patch('/transfer', async (req, res) => {
    try {
        const username = req.headers.username;
        const receiveuser = req.headers.receiveuser;
        const amount = req.headers.amount;

        // Find User
        const user = usersData.find((user) => user.username === username)

        // Check valid Receive Customer
        const receiver = usersData.find((user) => user.username === receiveuser)


        if (receiver) {
            if (user.balance > (user.balance - amount === 100) && amount > 100) {
                user.balance = user.balance - amount;
                receiver.balance = receiver.balance + Number(amount);

                user.transdetails.push = ({
                    amount: Number(amount)
                });

                console.log(usersData);

                try {
                    await writeFile("./usersDB.json", JSON.stringify(usersData))
                    return res.json({ message: "Money Transferred Successfull" })
                }
                catch (error) {
                    res.json({ error: error.message })
                }
            }
            else {
                return res.json({ message: "Insufficient Balance or You entered amount less than 100" })
            }

        }
        else {
            res.json({ message: "Invalid Username" })
        }
    }

    catch (error) {
        res.json({ error: error.message })
    }
})

router.patch('/update/profile', async (req, res) => {
    try {
        const username = req.headers.username;
        const newname = req.headers.newname;
        const newphone = req.headers.newphone;

        // Find User
        const user = usersData.find((user) => user.username === username)

        // Update name & phone number
        user.name = newname;
        user.phone = newphone;


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
            res.json({ message: "Profile Updated!" })
        }
        catch (error) {
            res.json({ error: error.message })
        }
    } catch (error) {
        res.json({ error: error.message })
    }


})

router.patch('/update/balance', async (req, res) => {
    try {
        const username = req.headers.username;
        const amount = req.headers.amount;

        // Find User
        const user = usersData.find((user) => user.username === username)

        // Update name & phone number
        user.balance += Number(amount);


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
            res.json({ message: "Balance Updated!" })
        }
        catch (error) {
            res.json({ error: error.message })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.patch('/profile', async (req, res) => {
    try {
        const username = req.headers.username;


        const balance = req.headers.balance;
        const mpin = req.headers.mpin;
        const phone = req.headers.phone;
        const name = req.headers.name;



        // Find User
        const user = usersData.find((user) => user.username === username)

        // Add profile details
        user.name = name
        user.balance = Number(balance)
        user.mpin = Number(mpin)
        user.phone = phone


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
            res.json({ message: "Profile Created!" })
        }
        catch (error) {
            res.json({ error: error.message })
        }
    } catch (error) {
        res.json({ error: error.message })
    }


})

router.delete('/delete', async (req, res) => {
    try {
        const username = req.headers.username;

        // Find User
        const user = usersData.findIndex((user) => user.username === username)

        // Remove user
        usersData.splice(user, 1)

        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
            res.json({ message: "User Removed!" })
        }
        catch (error) {
            res.json({ error: error.message })
        }
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

export default router;