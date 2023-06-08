const IncomeSchema = require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date, type } = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        type
    })

    try {
        //validations
        if (!title || !category || !description || !date || !type) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getCurrIncome = async (req, res) => {
    try {
        console.log('req.params.id :>> ', req.params.id)
        const curr_income = await IncomeSchema.findOne({ _id: req.params.id })
        console.log('curr_income :>> ', curr_income)
        res.status(200).json(curr_income)
    } catch (error) {
        res.status(500).json('Error calling getCurrIncome API', error.message);
    }
}

exports.updateIncome = async (req, res) => {
    try {
        console.log('req.body (updateIncome):>> ', req.body)
        const income = await IncomeSchema.findByIdAndUpdate(
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
        // const income = await IncomeSchema.findByIdAndUpdate(req.body.new_id);
        // console.log('curr_income :>> ', income)

        console.log('updated_income :>> ', income)
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json({ message: "Error in updateIncoem API", error: error.message });
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}