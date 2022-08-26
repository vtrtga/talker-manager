function validateEmail(email) {
    const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regExp.test(email);
}

const loginValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' }); 
}
    if (!password) {
        return res.status(400).json({
            message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    if (!validateEmail()) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

module.exports = loginValidation;