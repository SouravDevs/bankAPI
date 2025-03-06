import express from "express";
import usersData from "../usersDB.json" with {type: 'json'};
import { writeFile } from "node:fs/promises";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: usersData})
})

router.post('/login', async (req, res) => {
    
    try {
        const { email, password } = req.headers;
        // Check existing user
    const user = usersData.find((user) => user.email === email)


    if (user) {
        if (user.password === password) {
           return res.json(user)
        }
        else {
           return res.json({ message: "Invalid credentials" })
        }
    }

    else {
       return res.json({ message: "Invalid credentials" })
    }
    } catch (error) {
        return res.json({error: error.message})
    }
})

router.post('/signup', async (req, res) => {
    
     try {
        const { email } = req.headers;
        const { password } = req.headers;
      
 
        console.log(email, password);
 
     const accnum = () => Math.floor(999999999999 + Math.random() * 77777777777);
 
     // Check existing user
     const user = usersData.find((user) => user.email === email)
 
     if (user) {
         return res.json({ message: "User already exists!" })
     }
 
     else {
         usersData.push({
             email,
             password,
             name: null,
             accnum: accnum(),
             balance: 0,
             mpin: null,
             phone: null,
             transdetails: []
 
         })

         const data = {email, password}
 
         try {
             await writeFile("./usersDB.json", JSON.stringify(usersData))
            return res.json(data)
         } catch (error) {
            return res.json({ error: error.message })
         }
     }
    } 
      catch (error) {
        return res.json({error: error.message})
     }

    }
)

router.patch('/transfer', async (req, res) => {
    try {
       const {email, receiveuser, amount} = req.body;

        // Find User
        const user = usersData.find((user) => user.email === email)

        // Check valid Receive Customer
        const receiver = usersData.find((user) => user.email === receiveuser)


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
                   return res.json({ error: error.message })
                }
            }
            else {
                return res.json({ message: "Insufficient Balance or You entered amount less than 100" })
            }

        }
        else {
           return res.json({ message: "Invalid Username" })
        }
    }

    catch (error) {
       return res.json({ error: error.message })
    }
})

router.patch('/update/profile', async (req, res) => {
    try {
        const { email, newname, newphone} = req.body;

        // Find User
        const user = usersData.find((user) => user.email === email)

        // Update name & phone number
        user.name = newname;
        user.phone = newphone;


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
           return res.json({ message: "Profile Updated!" })
        }
        catch (error) {
           return res.json({ error: error.message })
        }
    } catch (error) {
       return res.json({ error: error.message })
    }


})

router.patch('/update/balance', async (req, res) => {
    try {
       const { email, amount } = req.body;

        // Find User
        const user = usersData.find((user) => user.email === email)

        // Update name & phone number
        user.balance += Number(amount);


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
           return res.json({ message: "Balance Updated!" })
        }
        catch (error) {
           return res.json({ error: error.message })
        }
    } catch (error) {
       return res.json({ error: error.message })
    }
})

router.patch('/profile', async (req, res) => {
    try {
        const { email } = req.headers;

        const { balance, mpin, phone, name } = req.headers;

        // Find User
        const user = usersData.find((user) => user.email === email)

        // Add profile details
        user.name = name
        user.balance = Number(balance)
        user.mpin = Number(mpin)
        user.phone = phone

        


        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
           return res.json({ message: "Profile Created!" })
        }
        catch (error) {
           return res.json({ error: error.message })
        }
    } catch (error) {
       return res.json({ error: error.message })
    }


})

router.delete('/delete', async (req, res) => {
    try {
        const email = req.body.email;

        // Find User
        const user = usersData.findIndex((user) => user.email === email)

        // Remove user
        usersData.splice(user, 1)

        try {
            await writeFile("./usersDB.json", JSON.stringify(usersData))
           return res.json({ message: "User Removed!" })
        }
        catch (error) {
           return res.json({ error: error.message })
        }
    }
    catch (error) {
       return res.json({ error: error.message })
    }
})

export default router;