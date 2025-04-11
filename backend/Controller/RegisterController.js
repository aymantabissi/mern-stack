
import Register from "../models/Register.js"
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
      const { name, age,  email, password ,role,country ,gender} = req.body;
  
      // Vérifier si tous les champs sont remplis
      if (!name || !email || !password || !role || !country  || !age || !gender) {
        return res.status(400).json({ success: false, message: "Veuillez remplir tous les champs" });
      }
  
      // Vérifier si l'utilisateur existe déjà
      const userExists = await Register.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "Cet email est déjà utilisé" });
      }
  
      // Hasher le mot de passe avant de l'enregistrer
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Créer un nouvel utilisateur
      const newUser = new Register({ name,role, country,age,gender, email, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ success: true, message: "Utilisateur enregistré avec succès" });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  };
export const getUsers = async (req, res) => {
    try {
      const users = await Register.find();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error.message);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  };
  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Register.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Aucun compte trouvé avec cet email" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Mot de passe incorrect" });
      }
  
      res.status(200).json({ success: true, message: "Connexion réussie", user });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  };
