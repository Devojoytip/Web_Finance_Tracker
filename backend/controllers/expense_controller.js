const ExpenseSchema = require("../models/ExpenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date, type}  = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        type,
        date,
        category,
        description
    })

    try {
        //validations
        if(!title || !category || !description || !date || !type){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(expense)
}

exports.getExpense = async (req, res) =>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}

exports.updateExpense = async (req, res) => {
    try {
        console.log('req.body (updateExpense):>> ', req.body)
        const expense = await ExpenseSchema.findByIdAndUpdate(
            req.body.new_id,
            {
                title: req.body.new_title,
                amount: req.body.new_amount,
                category: req.body.new_category,
                description: req.body.new_description,
                date: req.body.new_date,
                type: req.body.new_type
            }
        );

        console.log('updated_expense :>> ', expense)
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({ message: "Error in updateIncoem API", error: error.message });
    }
}